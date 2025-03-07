import { Moment } from "moment";
import { NextResponse } from "next/server";
import { useSettingsStore } from "../stores/settings";
import {
    ApiMeasure,
    ApiStationFromInformation,
    ApiStationFromListDepartement,
    ApiTown,
    Coordinates,
    StationRow,
} from "../type";
import { parseCsv } from "./csv.utils";
import HttpError, { errorToString } from "./errors.utils";

export const wrapApiCall = async (f: () => any): Promise<NextResponse> => {
    try {
        return NextResponse.json(await f());
    } catch (error: any) {
        if (error instanceof HttpError)
            return NextResponse.json(error.message, {
                status: error.status,
            });

        if (error.message === "NEXT_HTTP_ERROR_FALLBACK;404")
            return NextResponse.json("Not found", {
                status: 404,
            });

        console.log("Error wrapping API call", error);
        return NextResponse.json(errorToString(error), {
            status: 500,
        });
    }
};

export const fetchExternalApi = async (
    url: string,
    hasJsonResponse: boolean = false
) =>
    fetch(url, {
        headers: url.includes("public-api.meteofrance.fr")
            ? {
                  apiKey: useSettingsStore.getState().settings
                      .meteoFranceApiKey,
              }
            : {},
    }).then(async (response) => {
        if (![200, 201, 202, 204].includes(response.status))
            return response.text().then((error) => {
                throw Error(
                    `Error ${response.status} (${response.statusText}) : ${error}`
                );
            });

        return hasJsonResponse
            ? response.json().then((data) => data)
            : response.text().then((data) => data);
    });

export const getNeighborDepartements = (insee: string): Promise<string[]> =>
    fetchExternalApi(
        `https://tabular-api.data.gouv.fr/api/resources/f764804e-1abf-4dbf-82b5-6af2e17c22de/data/?insee__exact=${insee}`,
        true
    ).then(({ data }: { data: { insee_voisins: string }[] }) =>
        Array.from(
            new Set(
                data[0].insee_voisins
                    .split("|")
                    .map((inseeVoisin) => inseeVoisin.slice(0, 2))
            )
        )
    );

export const getTownsByNameOrPostalCode = (
    nameOrPostalCode: string
): Promise<ApiTown[]> =>
    fetchExternalApi(
        `https://geo.api.gouv.fr/communes?${
            isNaN(Number(nameOrPostalCode)) ? "nom" : "codePostal"
        }=${nameOrPostalCode}&fields=departement,centre,codesPostaux&limit=50`,
        true
    );

export const getCommuneByCoordinates = (
    coordinates: Coordinates
): Promise<Pick<ApiTown, "nom" | "code">[]> =>
    fetchExternalApi(
        `https://geo.api.gouv.fr/communes?lat=${coordinates.lat}&lon=${coordinates.lon}&fields=code`,
        true
    );

export const getStationsByDepartement = (
    codePostal: string
): Promise<ApiStationFromListDepartement[]> =>
    fetchExternalApi(
        `https://public-api.meteofrance.fr/public/DPClim/v1/liste-stations/quotidienne?id-departement=${codePostal}`,
        true
    );

export const getStationDetails = async (
    stationId: string
): Promise<ApiStationFromInformation> =>
    fetchExternalApi(
        `https://public-api.meteofrance.fr/public/DPClim/v1/information-station?${new URLSearchParams(
            {
                "id-station": stationId,
            }
        )}`,
        true
    ).then((data) => data[0]);

const getISODate = (date: Moment) => `${date.format("YYYY-MM-DD")}T00:00:00Z`;
export const placeWeatherDataOrder = (
    stationId: StationRow["id"],
    startDate: Moment,
    endDate: Moment
) =>
    fetchExternalApi(
        `https://public-api.meteofrance.fr/public/DPClim/v1/commande-station/quotidienne?${new URLSearchParams(
            {
                "id-station": stationId,
                "date-deb-periode": getISODate(startDate),
                "date-fin-periode": getISODate(endDate),
            }
        )}`,
        true
    ).then(
        (data: { elaboreProduitAvecDemandeResponse: { return: string } }) =>
            data.elaboreProduitAvecDemandeResponse.return
    );

export const retrieveWeatherDataOrder = (orderId: string) =>
    fetchExternalApi(
        `https://public-api.meteofrance.fr/public/DPClim/v1/commande/fichier?${new URLSearchParams(
            {
                "id-cmde": orderId,
            }
        )}`
    )
        .then(parseCsv)
        .then((data: ApiMeasure[]) => data.filter((measure) => measure.POSTE));

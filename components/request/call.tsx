import { useDataStore } from "@/lib/stores/data";
import { useSettingsStore } from "@/lib/stores/settings";
import { ApiMeasure, ApiStationFromInformation, StationRow } from "@/lib/type";
import {
    getStationDetails,
    placeWeatherDataOrder,
    retrieveWeatherDataOrder,
} from "@/lib/utils/api.utils";
import { updateObjectOfArray } from "@/lib/utils/array.utils";
import { errorToString } from "@/lib/utils/errors.utils";
import { isStationIdValid } from "@/lib/utils/station.utils";
import { toPlural } from "@/lib/utils/string.utils";
import { getDisplayPeriod } from "@/lib/utils/time.utils";
import RocketLaunchIcon from "@mui/icons-material/RocketLaunch";
import moment from "moment";
import { useEffect, useState } from "react";
import CustomButton from "../generic/button";

export default function CallRequest() {
    const { data, setData } = useDataStore();
    const { settings } = useSettingsStore();

    const [stations, setStations] = useState(data.stations ?? []);
    useEffect(
        () =>
            setData({
                ...data,
                stations,
            }),
        [stations]
    );

    const setStation = (station: StationRow) =>
        setStations((stations) => updateObjectOfArray(station, "id", stations));

    const handleApiCall = async () => {
        setStations(
            stations?.map((station) => ({
                ...station,
                infos: [],
                loading: false,
                measures: [],
                status: "ready",
            }))
        );
        let currentNumberOfTrials = 0;
        let currentInfos: string[] = [];
        let currentStation: ApiStationFromInformation | null = null;
        let currentMeasures: ApiMeasure[] | null = null;
        for (let i = 0; i < stations.length; i++) {
            const id = stations[i].id;
            let currentError = false;
            currentNumberOfTrials++;
            currentInfos.push(`Tentative ${currentNumberOfTrials}`);
            try {
                if (!isStationIdValid(id)) {
                    currentNumberOfTrials = 3;
                    throw new Error("Identifiant erroné");
                }
                if (!currentStation) {
                    setStation!({
                        id,
                        loading: true,
                        status: "getting-station-details",
                        infos: currentInfos,
                    });
                    currentStation = await getStationDetails(id);
                }
                if (
                    data.weatherDataRequestPeriod?.from &&
                    data.weatherDataRequestPeriod.to &&
                    !currentMeasures
                ) {
                    setStation!({
                        id,
                        loading: true,
                        status: "placing-order",
                        infos: currentInfos,
                        station: currentStation,
                    });
                    const orderId = await placeWeatherDataOrder(
                        id,
                        moment(data.weatherDataRequestPeriod.from),
                        moment(data.weatherDataRequestPeriod.to)
                    );
                    currentInfos.push(`Commande ${orderId}`);
                    setStation!({
                        id,
                        loading: true,
                        status: "retrieving-order",
                        infos: currentInfos,
                        station: currentStation,
                    });
                    await new Promise((resolve) =>
                        setTimeout(resolve, settings.delayBeforeRetrieveOrder)
                    );
                    currentMeasures = await retrieveWeatherDataOrder(orderId);
                    currentInfos.push(
                        `${currentMeasures.length} dates récupérées`
                    );
                }
            } catch (error: unknown) {
                currentError = true;
                currentInfos.push(errorToString(error));
                if (currentNumberOfTrials < 3) i--;
            }
            setStation!({
                id,
                status: currentError ? "error" : "done",
                infos: currentInfos,
                loading: false,
                station: currentStation ?? undefined,
                measures: currentMeasures ?? [],
            });
            if (!currentError || currentNumberOfTrials === 3) {
                currentNumberOfTrials = 0;
                currentInfos = [];
                currentStation = null;
                currentMeasures = null;
            }
            if (i !== stations.length - 1) {
                setStation!({
                    id: stations[i + 1].id,
                    status: "waiting",
                    infos: currentInfos,
                    loading: true,
                    station: currentStation ?? undefined,
                    measures: currentMeasures ?? [],
                });
                await new Promise((resolve) =>
                    setTimeout(resolve, settings.delayBeforeNextStation)
                );
            }
        }
    };

    const loading = stations.some((station) => station.loading);

    return (
        <CustomButton
            className="info"
            icon={<RocketLaunchIcon />}
            loading={loading}
            disabled={!stations.length}
            onClick={handleApiCall}>
            Lancer la requête pour{" "}
            {toPlural(
                "station",
                stations.filter((station) => isStationIdValid(station.id))
                    .length ?? 0,
                true
            )}{" "}
            {data.weatherDataRequestPeriod?.from &&
                data.weatherDataRequestPeriod.to &&
                `(+ données météo sur la période ${getDisplayPeriod(
                    moment(data.weatherDataRequestPeriod.from),
                    moment(data.weatherDataRequestPeriod.to)
                )})`}
        </CustomButton>
    );
}

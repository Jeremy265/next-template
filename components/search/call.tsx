import { useDataStore } from "@/lib/stores/data";
import { useSettingsStore } from "@/lib/stores/settings";
import {
    ApiStationFromInformation,
    ApiStationFromListDepartement,
    Coordinates,
} from "@/lib/type";
import {
    getCommuneByCoordinates,
    getNeighborDepartementsByStaticArray,
    getStationDetails,
    getStationsByDepartement,
} from "@/lib/utils/api.utils";
import { errorToString } from "@/lib/utils/errors.utils";
import { orderByClosest } from "@/lib/utils/station.utils";
import { toPlural } from "@/lib/utils/string.utils";
import { getDisplayPeriod } from "@/lib/utils/time.utils";
import RocketLaunchIcon from "@mui/icons-material/RocketLaunch";
import moment from "moment";
import { useState } from "react";
import { toast } from "react-toastify";
import CustomButton from "../generic/button";

export default function CallSearch() {
    const { data, setData } = useDataStore();
    const { settings } = useSettingsStore();

    const [loading, setLoading] = useState(false);

    const handleApiCall = async () => {
        setLoading(true);
        const closestStations: ApiStationFromInformation[] = [];
        setData({ ...data, closestStations });
        try {
            const commune = (
                await toast.promise(
                    getCommuneByCoordinates(data.coordinates as Coordinates),
                    {
                        pending:
                            "Récupération du code du département de la commune des coordonnées sélectionnées",
                        success: {
                            render({ data }) {
                                return `Code département de ${
                                    data[0]!.nom
                                } récupéré : ${data[0]!.codeDepartement}`;
                            },
                        },
                        error: {
                            render(toastProps) {
                                return errorToString(toastProps.data);
                            },
                        },
                    }
                )
            )[0]!;

            const neighborDepartements = await toast.promise(
                new Promise<string[]>((resolve, reject) => {
                    try {
                        resolve(
                            getNeighborDepartementsByStaticArray(
                                commune.codeDepartement
                            )
                        );
                    } catch (error: unknown) {
                        reject(error);
                    }
                }),
                {
                    pending: `Récupération des départements voisins au ${commune.codeDepartement}`,
                    success: {
                        render({ data }) {
                            return `Départements voisins récupérés : ${data.join(
                                ", "
                            )}`;
                        },
                    },
                    error: {
                        render(toastProps) {
                            return errorToString(toastProps.data);
                        },
                    },
                }
            );

            const neighborsStations: ApiStationFromListDepartement[] =
                await toast.promise(
                    new Promise(async (resolve, reject) => {
                        let neighborsStations: ApiStationFromListDepartement[] =
                            [];
                        for (const neighborDepartement of neighborDepartements) {
                            try {
                                neighborsStations = neighborsStations.concat(
                                    await getStationsByDepartement(
                                        neighborDepartement
                                    )
                                );
                            } catch (error: unknown) {
                                reject(error);
                            }
                            await new Promise((resolve) =>
                                setTimeout(
                                    resolve,
                                    settings.delayBeforeNextStation
                                )
                            );
                        }
                        resolve(neighborsStations);
                    }),
                    {
                        pending: `Récupération des stations des départements ${neighborDepartements.join(
                            ", "
                        )}`,
                        success: {
                            render({ data }) {
                                return `Stations des départements ${neighborDepartements.join(
                                    ", "
                                )} récupérées : ${data.length} stations`;
                            },
                        },
                        error: {
                            render(toastProps) {
                                return errorToString(toastProps.data);
                            },
                        },
                    }
                );

            const neighborsStationsOrderedByClosest = orderByClosest(
                data.coordinates as Coordinates,
                neighborsStations
            );

            let index = 0;
            while (
                index < neighborsStationsOrderedByClosest.length &&
                closestStations.length < settings.numberOfClosestStations
            ) {
                const neighborStation =
                    neighborsStationsOrderedByClosest[index];

                const closestStationDetails = {
                    ...(await toast.promise(
                        getStationDetails(neighborStation.id),
                        {
                            pending: `Récupération des informations de la station ${
                                neighborStation.id
                            } (${neighborStation.nom}, ${Math.round(
                                neighborStation.distance
                            )} km)`,
                            success: {
                                render() {
                                    return `Informations de la station ${
                                        neighborStation.id
                                    } (${neighborStation.nom}, ${Math.round(
                                        neighborStation.distance
                                    )} km) récupérées`;
                                },
                            },
                            error: {
                                render(toastProps) {
                                    return errorToString(toastProps.data);
                                },
                            },
                        }
                    )),
                    distance: neighborStation.distance,
                };
                if (
                    !data.openStationPeriod?.from ||
                    !data.openStationPeriod.to ||
                    moment(data.openStationPeriod.from).isBetween(
                        moment(closestStationDetails.dateDebut),
                        closestStationDetails.dateFin
                            ? moment(closestStationDetails.dateFin)
                            : moment()
                    ) ||
                    moment(data.openStationPeriod.to).isBetween(
                        moment(closestStationDetails.dateDebut),
                        closestStationDetails.dateFin
                            ? moment(closestStationDetails.dateFin)
                            : moment()
                    )
                ) {
                    closestStations.push(closestStationDetails);
                    setData({
                        ...data,
                        closestStations,
                    });
                }
                if (index !== closestStations.length - 1)
                    await new Promise((resolve) =>
                        setTimeout(resolve, settings.delayBeforeNextStation)
                    );
                index++;
            }
        } catch (error: unknown) {
            console.log(error);
        }
        setLoading(false);
    };

    return (
        <CustomButton
            className="info"
            icon={<RocketLaunchIcon />}
            loading={loading}
            disabled={!data.coordinates}
            onClick={handleApiCall}>
            Trouver les{" "}
            {toPlural("station", settings.numberOfClosestStations, true)} les
            plus proches (30 km){" "}
            {data.openStationPeriod?.from &&
                data.openStationPeriod.to &&
                `ouvertes sur la période ${getDisplayPeriod(
                    moment(data.openStationPeriod.from),
                    moment(data.openStationPeriod.to)
                )}`}
        </CustomButton>
    );
}

import { useDataStore } from "@/lib/stores/data";
import { useSettingsStore } from "@/lib/stores/settings";
import { ApiStationFromListDepartement, Coordinates } from "@/lib/type";
import {
    getCommuneByCoordinates,
    getNeighborDepartements,
    getStationDetails,
    getStationsByDepartement,
} from "@/lib/utils/api.utils";
import { orderByClosest } from "@/lib/utils/station.utils";
import { toPlural } from "@/lib/utils/string.utils";
import { getDisplayPeriod } from "@/lib/utils/time.utils";
import RocketLaunchIcon from "@mui/icons-material/RocketLaunch";
import { Typography } from "@mui/material";
import moment from "moment";
import { useEffect, useState } from "react";
import Aligned from "../generic/aligned";
import CustomButton from "../generic/button";

export default function CallSearch() {
    const { data, setData } = useDataStore();
    const { settings } = useSettingsStore();

    const [loading, setLoading] = useState(false);
    const [callInfos, setCallInfos] = useState<string[]>([]);
    const [closestStations, setClosestStations] = useState(
        data.closestStations ?? []
    );
    useEffect(
        () =>
            setData({
                ...data,
                closestStations,
            }),
        [closestStations]
    );
    const handleApiCall = async () => {
        setClosestStations([]);
        setLoading(true);
        const infos = [];
        try {
            infos.push(
                `Récupération du code postal de la commune des coordonnées sélectionnées`
            );
            setCallInfos(infos);
            const codePostal = (
                await getCommuneByCoordinates(data.coordinates as Coordinates)
            )[0]!.codesPostaux[0];
            infos.push(
                `Récupération des départements voisins au ${codePostal}`
            );
            setCallInfos(infos);
            const neighborDepartements = await getNeighborDepartements(
                codePostal
            );
            infos.push(
                `Récupération des stations des départements ${neighborDepartements.join(
                    ", "
                )}`
            );
            setCallInfos(infos);
            let stations: ApiStationFromListDepartement[] = [];
            for (const neighborDepartement of neighborDepartements) {
                stations = stations.concat(
                    await getStationsByDepartement(neighborDepartement)
                );
                await new Promise((resolve) =>
                    setTimeout(resolve, settings.delayBeforeNextStation)
                );
            }

            const closests = orderByClosest(
                data.coordinates as Coordinates,
                stations
            );
            infos.push(
                `Récupération des informations des ${
                    settings.numberOfClosestStations
                } stations les plus proches${
                    data.openStationPeriod?.from && data.openStationPeriod.to
                        ? ` ouvertes sur la période ${getDisplayPeriod(
                              moment(data.openStationPeriod.from),
                              moment(data.openStationPeriod.to)
                          )}`
                        : ""
                } parmis les ${stations.length} stations trouvées`
            );
            setCallInfos(infos);
            let index = 0;
            while (
                index < closests.length ||
                closestStations.length < settings.numberOfClosestStations
            ) {
                infos.push(
                    `Récupération des informations de la station ${
                        closests[index].id
                    } (${closests[index].nom}, ${Math.round(
                        closests[index].distance
                    )} km)`
                );
                setCallInfos(infos);
                try {
                    const closestStationDetails = {
                        ...(await getStationDetails(closests[index].id)),
                        distance: closests[index].distance,
                    };
                    if (
                        !data.openStationPeriod?.from ||
                        !data.openStationPeriod.to ||
                        moment(data.openStationPeriod.from).isBetween(
                            moment(closestStationDetails.dateDebut),
                            moment(closestStationDetails.dateFin)
                        ) ||
                        moment(data.openStationPeriod.to).isBetween(
                            moment(closestStationDetails.dateDebut),
                            moment(closestStationDetails.dateFin)
                        )
                    )
                        setClosestStations([
                            ...closestStations,
                            closestStationDetails,
                        ]);
                } catch (error: unknown) {
                    infos.push(
                        `${callInfos[callInfos.length + 1]}. Erreur : ${error}`
                    );
                    setCallInfos(infos);
                }
                if (index !== closestStations.length - 1)
                    await new Promise((resolve) =>
                        setTimeout(resolve, settings.delayBeforeNextStation)
                    );
                index++;
            }
            setCallInfos([]);
        } catch (error: unknown) {
            infos.push(`Erreur : ${error}`);
            setCallInfos(infos);
        }
        setLoading(false);
    };

    return (
        <Aligned col>
            <CustomButton
                className="info"
                icon={<RocketLaunchIcon />}
                loading={loading}
                disabled={!data.coordinates}
                onClick={handleApiCall}>
                Trouver les{" "}
                {toPlural("station", settings.numberOfClosestStations, true)}{" "}
                les plus proches{" "}
                {data.openStationPeriod?.from &&
                    data.openStationPeriod.to &&
                    `ouvertes sur la période ${getDisplayPeriod(
                        moment(data.openStationPeriod.from),
                        moment(data.openStationPeriod.to)
                    )}`}
            </CustomButton>
            {loading && (
                <ul>
                    {callInfos.map((l, i) => (
                        <li key={i}>
                            <Typography>{l}</Typography>
                        </li>
                    ))}
                </ul>
            )}
        </Aligned>
    );
}

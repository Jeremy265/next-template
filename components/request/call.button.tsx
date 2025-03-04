import { useSettingsStore } from "@/lib/stores/settings";
import { ApiMeasure, ApiStationFromInformation } from "@/lib/type";
import {
    getStationDetails,
    placeWeatherDataOrder,
    retrieveWeatherDataOrder,
} from "@/lib/utils/api.utils";
import { errorToString } from "@/lib/utils/errors.utils";
import { isStationIdValid } from "@/lib/utils/station.utils";
import { toPlural } from "@/lib/utils/string.utils";
import PanToolIcon from "@mui/icons-material/PanTool";
import RocketLaunchIcon from "@mui/icons-material/RocketLaunch";
import { useContext } from "react";
import CustomButton from "../generic/button";
import { RequestContext } from "./view";

export default function Call() {
    const { state, setStation, resetStations } = useContext(RequestContext);
    const { settings } = useSettingsStore();

    const handleApiCall = async () => {
        resetStations!();
        let currentNumberOfTrials = 0;
        let currentInfos: string[] = [];
        let currentStation: ApiStationFromInformation | null = null;
        let currentMeasures: ApiMeasure[] | null = null;
        for (let i = 0; i < state!.stations.length; i++) {
            const id = state!.stations[i].id;
            if (!isStationIdValid(id)) continue;
            currentNumberOfTrials++;
            currentInfos.push(`Tentative ${currentNumberOfTrials}`);
            try {
                if (!currentStation) {
                    setStation!({
                        id,
                        loading: true,
                        status: "get-station-infos",
                        infos: currentInfos,
                    });
                    currentStation = await getStationDetails(id);
                    setStation!({
                        id,
                        loading: true,
                        status: "get-station-infos",
                        infos: currentInfos,
                        station: currentStation,
                    });
                }

                if (
                    state!.period.from &&
                    state!.period.to &&
                    !currentMeasures
                ) {
                    await new Promise((resolve) =>
                        setTimeout(resolve, settings.delayBeforeRetrieveOrder)
                    );
                    setStation!({
                        id,
                        loading: true,
                        status: "place-order",
                        infos: currentInfos,
                        station: currentStation,
                    });
                    const orderId = await placeWeatherDataOrder(
                        id,
                        state!.period.from,
                        state!.period.to
                    );
                    currentInfos.push(`Commande ${orderId}`);
                    setStation!({
                        id,
                        loading: true,
                        status: "place-order",
                        infos: currentInfos,
                        station: currentStation,
                    });
                    await new Promise((resolve) =>
                        setTimeout(resolve, settings.delayBeforeRetrieveOrder)
                    );
                    setStation!({
                        id,
                        loading: true,
                        status: "retrieve-order",
                        infos: currentInfos,
                        station: currentStation,
                    });
                    currentMeasures = await retrieveWeatherDataOrder(orderId);
                    currentInfos.push(
                        `${currentMeasures.length} dates récupérées`
                    );
                }

                setStation!({
                    id,
                    loading: false,
                    status: "done",
                    infos: currentInfos,
                    station: currentStation,
                    measures: currentMeasures ?? [],
                });
                currentNumberOfTrials = 0;
                currentInfos = [];
                currentStation = null;
                currentMeasures = null;
            } catch (error: unknown) {
                currentInfos.push(errorToString(error));
                setStation!({
                    id,
                    status: "error",
                    infos: currentInfos,
                    loading: false,
                    station: currentStation ?? undefined,
                    measures: currentMeasures ?? [],
                });
                if (currentNumberOfTrials < 3) i--;
                else {
                    currentNumberOfTrials = 0;
                    currentInfos = [];
                }
            }
            if (i !== state!.stations.length - 1)
                await new Promise((resolve) =>
                    setTimeout(resolve, settings.delayBeforeNextStation)
                );
        }
    };
    const loading = false;
    return (
        <CustomButton
            className={loading ? "danger" : "info"}
            icon={loading ? <PanToolIcon /> : <RocketLaunchIcon />}
            disabled={!state!.stations.length}
            onClick={loading ? () => false : handleApiCall}>
            {loading
                ? "Stop"
                : `Lancer la requête pour ${toPlural(
                      "station",
                      state!.stations.filter(
                          (station) => station.status !== "error"
                      ).length ?? 0,
                      true
                  )}`}{" "}
            {state!.period!.from &&
                state!.period!.to &&
                `(+ données météo du ${state!.period!.from.format(
                    "DD/MM/YY"
                )} au ${state!.period!.to.format("DD/MM/YY")})`}
        </CustomButton>
    );
}

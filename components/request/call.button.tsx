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
                    state!.period.from &&
                    state!.period.to &&
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
                        state!.period.from!,
                        state!.period.to!
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
            if (i !== state!.stations.length - 1) {
                setStation!({
                    id: state!.stations[i + 1].id,
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

    const loading = state!.stations.some((station) => station.loading);
    return (
        <CustomButton
            className="info"
            icon={<RocketLaunchIcon />}
            loading={loading}
            disabled={!state!.stations.length}
            onClick={handleApiCall}>
            Lancer la requête pour{" "}
            {toPlural(
                "station",
                state!.stations.filter((station) =>
                    isStationIdValid(station.id)
                ).length ?? 0,
                true
            )}{" "}
            {state!.period!.from &&
                state!.period!.to &&
                `(+ données météo du ${state!.period!.from.format(
                    "DD/MM/YY"
                )} au ${state!.period!.to.format("DD/MM/YY")})`}
        </CustomButton>
    );
}

"use client";

import { useDataStore } from "@/lib/stores/data";
import {
    formatMeasureToExport,
    formatStationToExport,
} from "@/lib/utils/csv.utils";
import { exportToExcel } from "@/lib/utils/excel.utils";
import { isStationIdValid } from "@/lib/utils/station.utils";
import { getDisplayPeriod } from "@/lib/utils/time.utils";
import CastIcon from "@mui/icons-material/Cast";
import DownloadIcon from "@mui/icons-material/Download";
import moment from "moment";
import dynamic from "next/dynamic";
import Aligned from "../generic/aligned";
import CustomButton from "../generic/button";
import Field from "../generic/fields/field";
import PeriodField from "../generic/fields/period.field";
import RequestStationTable from "./stations.table";

const Call = dynamic(() => import("./call"), { ssr: false });

export default function RequestView() {
    const { data, setData } = useDataStore();

    const dates = data.stations?.flatMap(
        (station) =>
            station.measures?.map((measure) =>
                moment(measure.DATE, "YYYYMMDD")
            ) ?? []
    );

    const measuresToExport = data.stations?.flatMap(
        (station) => station.measures?.map(formatMeasureToExport) ?? []
    );

    const stationsToExport = data.stations
        ?.filter((station) => station.station)
        .map((station) => formatStationToExport(station.station!));

    return (
        <Aligned col>
            <Field
                defaultValue={data.inputStations}
                label="Stations"
                helperText="Coller la liste des identifiants séparés par un retour à la ligne, une virgule, un point-virgule ou un tiret. Chaque identifiant doit être composé de 8 chiffres."
                startAdornment={<CastIcon />}
                onChange={(inputStations: string) =>
                    setData({
                        ...data,
                        inputStations,
                        stations: inputStations
                            ?.trim()
                            .split(/[\n,;-]/)
                            .map((id) => ({
                                id: id.trim(),
                                status: !isStationIdValid(id)
                                    ? "error"
                                    : "ready",
                                infos: !isStationIdValid(id)
                                    ? ["Identifiant erroné"]
                                    : [],
                            })),
                    })
                }
            />
            <PeriodField
                label="Période de données météo"
                defaultValue={{
                    from: data.weatherDataRequestPeriod?.from
                        ? moment(data.weatherDataRequestPeriod.from)
                        : undefined,
                    to: data.weatherDataRequestPeriod?.to
                        ? moment(data.weatherDataRequestPeriod.to)
                        : undefined,
                }}
                onFromChange={(from) =>
                    setData({
                        ...data,
                        weatherDataRequestPeriod: {
                            ...data.weatherDataRequestPeriod,
                            from: from,
                        },
                    })
                }
                onToChange={(to) =>
                    setData({
                        ...data,
                        weatherDataRequestPeriod: {
                            ...data.weatherDataRequestPeriod,
                            to: to,
                        },
                    })
                }
            />
            <RequestStationTable />
            <Aligned col centered>
                <Call />
                {Boolean(measuresToExport?.length) && (
                    <CustomButton
                        icon={<DownloadIcon />}
                        className="success"
                        onClick={() =>
                            exportToExcel(
                                `mesures_meteo_${moment
                                    .min(dates!)
                                    .format("DDMMYY")}_au_${moment
                                    .max(dates!)
                                    .format("DDMMYY")}`,
                                measuresToExport!
                            )
                        }>
                        {measuresToExport?.length} données météo (
                        {getDisplayPeriod(
                            moment.min(dates!),
                            moment.max(dates!)
                        )}
                        )
                    </CustomButton>
                )}
                {Boolean(stationsToExport?.length) && (
                    <CustomButton
                        icon={<DownloadIcon />}
                        className="success"
                        onClick={() =>
                            exportToExcel(`stations_meteo`, stationsToExport!)
                        }>
                        {stationsToExport?.length} stations
                    </CustomButton>
                )}
            </Aligned>
        </Aligned>
    );
}

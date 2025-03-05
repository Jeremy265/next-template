"use client";

import { useDataStore } from "@/lib/stores/data";
import {
    formatMeasureToExport,
    formatStationToExport,
} from "@/lib/utils/csv.utils";
import { exportToExcel } from "@/lib/utils/excel.utils";
import { getDisplayPeriod } from "@/lib/utils/time.utils";
import DownloadIcon from "@mui/icons-material/Download";
import moment from "moment";
import Aligned from "../generic/aligned";
import CustomButton from "../generic/button";
import Call from "./call.button";
import PeriodInput from "./period.input";
import StationInput from "./stations.input";
import StationTable from "./stations.table";

export default function RequestView() {
    const { data } = useDataStore();

    const dates = data.stations.flatMap(
        (station) =>
            station.measures?.map((measure) =>
                moment(measure.DATE, "YYYYMMDD")
            ) ?? []
    );

    const measuresToExport = data.stations.flatMap(
        (station) => station.measures?.map(formatMeasureToExport) ?? []
    );

    const stationsToExport = data.stations
        .filter((station) => station.station)
        .map((station) => formatStationToExport(station.station!));

    return (
        <Aligned col>
            <StationInput />
            <PeriodInput />
            <StationTable />
            <Aligned col centered>
                <Call />
                {Boolean(measuresToExport.length) && (
                    <CustomButton
                        icon={<DownloadIcon />}
                        className="success"
                        onClick={() =>
                            exportToExcel(
                                `mesures_meteo_${moment
                                    .min(dates)
                                    .format("DDMMYY")}_au_${moment
                                    .max(dates)
                                    .format("DDMMYY")}`,
                                measuresToExport
                            )
                        }>
                        {measuresToExport.length} données météo (
                        {getDisplayPeriod(moment.min(dates), moment.max(dates))}
                        )
                    </CustomButton>
                )}
                {Boolean(stationsToExport.length) && (
                    <CustomButton
                        icon={<DownloadIcon />}
                        className="success"
                        onClick={() =>
                            exportToExcel(`stations_meteo`, stationsToExport)
                        }>
                        {stationsToExport.length} stations
                    </CustomButton>
                )}
            </Aligned>
        </Aligned>
    );
}

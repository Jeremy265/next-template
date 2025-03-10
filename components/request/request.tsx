"use client";

import { useDataStore } from "@/lib/stores/data";
import { useSettingsStore } from "@/lib/stores/settings";
import {
    formatMeasureToExport,
    formatStationToExport,
} from "@/lib/utils/csv.utils";
import { exportToExcel } from "@/lib/utils/excel.utils";
import { getDisplayPeriod } from "@/lib/utils/time.utils";
import DownloadIcon from "@mui/icons-material/Download";
import moment from "moment";
import dynamic from "next/dynamic";
import Aligned from "../generic/aligned";
import CustomButton from "../generic/button";
import InputStationsField from "../generic/fields/inputStations.field";
import WeatherDataPeriodField from "../generic/fields/weatherDataPeriod.field";
import WeatherParametersToExportField from "../generic/fields/weatherParametersToExport.field";
import RequestStationTable from "./stations.table";

const Call = dynamic(() => import("./call"), { ssr: false });

export default function RequestView() {
    const { data, setData } = useDataStore();
    const { settings, setSettings } = useSettingsStore();

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
            <InputStationsField />
            <WeatherDataPeriodField />
            {data.weatherDataRequestPeriod?.from &&
                data.weatherDataRequestPeriod.to && (
                    <WeatherParametersToExportField />
                )}
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

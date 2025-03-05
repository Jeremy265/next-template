"use client";

import { StationRow } from "@/lib/type";
import { updateObjectOfArray } from "@/lib/utils/array.utils";
import {
    formatMeasureToExport,
    formatStationToExport,
} from "@/lib/utils/csv.utils";
import { exportToExcel } from "@/lib/utils/excel.utils";
import { isStationIdValid } from "@/lib/utils/station.utils";
import DownloadIcon from "@mui/icons-material/Download";
import moment, { Moment } from "moment";
import { createContext, useEffect, useState } from "react";
import Aligned from "../generic/aligned";
import CustomButton from "../generic/button";
import Call from "./call.button";
import PeriodInput from "./period.input";
import StationInput from "./stations.input";
import StationTable from "./stations.table";

type RequestData = {
    inputStations: string;
    stations: StationRow[];
    period: Partial<{
        from: Moment | null;
        to: Moment | null;
    }>;
};

export const RequestContext = createContext<
    Partial<{
        state: RequestData;
        setInputStations: (inputStations: string) => void;
        setPeriod: (period: RequestData["period"]) => void;
        setStation: (station: StationRow) => void;
        resetStations: () => void;
    }>
>({});

export default function RequestView() {
    const [state, setState] = useState<RequestData>(
        localStorage.getItem("data")
            ? {
                  ...JSON.parse(localStorage.getItem("data")!),
                  period: {
                      from: JSON.parse(localStorage.getItem("data")!).period
                          .from
                          ? moment(
                                JSON.parse(localStorage.getItem("data")!).period
                                    .from
                            )
                          : null,
                      to: JSON.parse(localStorage.getItem("data")!).period.to
                          ? moment(
                                JSON.parse(localStorage.getItem("data")!).period
                                    .to
                            )
                          : null,
                  },
              }
            : {
                  inputStations: "",
                  stations: [],
                  period: { from: null, to: null },
              }
    );

    const setInputStations = (inputStations: string) =>
        setState((state) => ({
            ...state,
            inputStations,
            stations: inputStations
                .trim()
                .split(/[\n,;-]/)
                .map((id) => ({
                    id: id.trim(),
                    status: !isStationIdValid(id) ? "error" : "ready",
                    infos: !isStationIdValid(id) ? ["Identifiant erroné"] : [],
                })),
        }));

    const setPeriod = (period: RequestData["period"]) =>
        setState((state) => ({ ...state, period }));

    const setStation = (station: StationRow) =>
        setState((state) => ({
            ...state,
            stations: updateObjectOfArray(station, "id", state.stations),
        }));

    const resetStations = () =>
        setState((state) => ({
            ...state,
            stations: state.stations.map((station) => ({
                ...station,
                infos: [],
                loading: false,
                measures: [],
                status: "ready",
            })),
        }));

    useEffect(
        () => localStorage.setItem("data", JSON.stringify(state)),
        [state]
    );

    const dates = state.stations.flatMap(
        (station) =>
            station.measures?.map((measure) =>
                moment(measure.DATE, "YYYYMMDD")
            ) ?? []
    );

    const measuresToExport = state.stations.flatMap(
        (station) => station.measures?.map(formatMeasureToExport) ?? []
    );

    const stationsToExport = state.stations
        .filter((station) => station.station)
        .map((station) => formatStationToExport(station.station!));

    return (
        <Aligned col>
            <RequestContext.Provider
                value={{
                    state,
                    setInputStations,
                    setPeriod,
                    setStation,
                    resetStations,
                }}>
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
                                exportToExcel(`mesures`, measuresToExport)
                            }>
                            {measuresToExport.length} données météo (
                            {moment.min(dates).format("DD/MM/YY")}-
                            {moment.max(dates).format("DD/MM/YY")})
                        </CustomButton>
                    )}
                    {Boolean(stationsToExport.length) && (
                        <CustomButton
                            icon={<DownloadIcon />}
                            className="success"
                            onClick={() =>
                                exportToExcel(`stations`, stationsToExport)
                            }>
                            {stationsToExport.length} stations
                        </CustomButton>
                    )}
                </Aligned>
            </RequestContext.Provider>
        </Aligned>
    );
}

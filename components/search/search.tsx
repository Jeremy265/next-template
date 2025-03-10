"use client";

import { useDataStore } from "@/lib/stores/data";
import { useSettingsStore } from "@/lib/stores/settings";
import { Box } from "@mui/material";
import dynamic from "next/dynamic";
import Aligned from "../generic/aligned";
import CoordinatesField from "../generic/fields/coordinates.field";
import NumberOfClosestStationsField from "../generic/fields/numberOfClosestStations.field";
import OpenStationPeriodField from "../generic/fields/openStationPeriod.field";
import SearchStationTable from "./stations.table";

const PositionField = dynamic(
    () => import("../generic/fields/position.field"),
    {
        ssr: false,
    }
);

const TownField = dynamic(() => import("../generic/fields/town.field"), {
    ssr: false,
});

const Map = dynamic(() => import("./map"), {
    ssr: false,
});

const CallSearch = dynamic(() => import("./call"), {
    ssr: false,
});

export default function SearchView() {
    const { data, setData } = useDataStore();
    const { settings, setSettings } = useSettingsStore();

    return (
        <Aligned col>
            <Aligned top space={4}>
                <Aligned col>
                    <PositionField />
                    <TownField />
                    <CoordinatesField />
                    <NumberOfClosestStationsField />
                    <OpenStationPeriodField />
                </Aligned>
                <Map />
            </Aligned>
            <Box textAlign="center">
                <CallSearch />
            </Box>
            <SearchStationTable />
        </Aligned>
    );
}

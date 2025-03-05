"use client";

import { useDataStore } from "@/lib/stores/data";
import { useSettingsStore } from "@/lib/stores/settings";
import CastConnectedIcon from "@mui/icons-material/CastConnected";
import { Box } from "@mui/material";
import moment from "moment";
import dynamic from "next/dynamic";
import Aligned from "../generic/aligned";
import Field from "../generic/fields/field";
import PeriodField from "../generic/fields/period.field";
import Coordinates from "./coordinates";
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
                    <Coordinates />
                    <Field
                        type="numeric"
                        defaultValue={settings.numberOfClosestStations}
                        onChange={(numberOfClosestStations) =>
                            setSettings({
                                ...settings,
                                numberOfClosestStations,
                            })
                        }
                        label="Nombre de station les plus proches"
                        startAdornment={<CastConnectedIcon />}
                    />
                    <PeriodField
                        label="Période d'ouverture"
                        defaultValue={{
                            from: data.openStationPeriod?.from
                                ? moment(data.openStationPeriod.from)
                                : undefined,
                            to: data.openStationPeriod?.to
                                ? moment(data.openStationPeriod.to)
                                : undefined,
                        }}
                        onFromChange={(from) =>
                            setData({
                                ...data,
                                openStationPeriod: {
                                    ...data.openStationPeriod,
                                    from: from,
                                },
                            })
                        }
                        onToChange={(to) =>
                            setData({
                                ...data,
                                openStationPeriod: {
                                    ...data.openStationPeriod,
                                    to: to,
                                },
                            })
                        }
                    />
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

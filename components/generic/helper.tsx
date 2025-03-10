"use client";

import { useDataStore } from "@/lib/stores/data";
import { useFiltersStore } from "@/lib/stores/filters";
import { useSettingsStore } from "@/lib/stores/settings";
import { sortArray } from "@/lib/utils/array.utils";
import { printWithIcon } from "@/lib/utils/icon.utils";
import { formatPathname } from "@/lib/utils/string.utils";
import CloseIcon from "@mui/icons-material/Close";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import HelpCenterIcon from "@mui/icons-material/HelpCenter";
import HistoryIcon from "@mui/icons-material/History";
import KeyIcon from "@mui/icons-material/Key";
import LightbulbIcon from "@mui/icons-material/Lightbulb";
import RestartAltIcon from "@mui/icons-material/RestartAlt";
import SendAndArchiveIcon from "@mui/icons-material/SendAndArchive";
import SettingsIcon from "@mui/icons-material/Settings";
import SkipNextIcon from "@mui/icons-material/SkipNext";
import StorageIcon from "@mui/icons-material/Storage";
import {
    SpeedDial,
    SpeedDialAction,
    SpeedDialIcon,
    Typography,
} from "@mui/material";
import { usePathname } from "next/navigation";
import { ReactElement, useState } from "react";
import CustomButton from "./button";
import CustomDivider from "./divider";
import CoordinatesField from "./fields/coordinates.field";
import Field from "./fields/field";
import InputStationsField from "./fields/inputStations.field";
import NumberOfClosestStationsField from "./fields/numberOfClosestStations.field";
import OpenStationPeriodField from "./fields/openStationPeriod.field";
import TownField from "./fields/town.field";
import WeatherDataPeriodField from "./fields/weatherDataPeriod.field";
import WeatherParametersToExportField from "./fields/weatherParametersToExport.field";
import CustomModal from "./modal";
import { getRouteByPathname } from "./navs/breadcrumbs";
import CustomTable from "./table/table";

const helpByPathname: { [key: string]: string | ReactElement } = {};

export default function Helper() {
    const pathname = formatPathname(usePathname()).replaceAll(/[0-9]+\/?/g, "");
    const help = helpByPathname[pathname];

    const [modal, setModal] = useState<{
        type?: "help" | "settings" | "data" | "filters";
        open: boolean;
    }>({ open: false });

    const closeModal = () => setModal({ open: false });

    const { filters, resetFilters } = useFiltersStore();
    const { settings, setSettings, resetSettings } = useSettingsStore();
    const { resetData } = useDataStore();

    return (
        <>
            <SpeedDial
                ariaLabel="Menu"
                sx={{
                    position: "fixed",
                    bottom: 32,
                    right: 32,
                }}
                icon={
                    <SpeedDialIcon
                        icon={<LightbulbIcon />}
                        openIcon={<CloseIcon />}
                    />
                }>
                <SpeedDialAction
                    icon={<SettingsIcon />}
                    slotProps={{ tooltip: { title: "Gérer les paramètres" } }}
                    onClick={() => setModal({ open: true, type: "settings" })}
                />
                <SpeedDialAction
                    icon={<StorageIcon />}
                    slotProps={{ tooltip: { title: "Gérer les données" } }}
                    onClick={() => setModal({ open: true, type: "data" })}
                />
                <SpeedDialAction
                    icon={<FilterAltIcon />}
                    slotProps={{ tooltip: { title: "Gérer les filtres" } }}
                    onClick={() => setModal({ open: true, type: "filters" })}
                />

                {help && (
                    <SpeedDialAction
                        icon={<HelpCenterIcon />}
                        slotProps={{ tooltip: { title: "Aide" } }}
                        onClick={() => setModal({ open: true, type: "help" })}
                    />
                )}
            </SpeedDial>
            <CustomModal
                title="Gestion des paramètres de l'application"
                subtitle={
                    <CustomButton
                        className="danger"
                        icon={<RestartAltIcon />}
                        onClick={resetSettings}>
                        Réinitialiser les paramètres
                    </CustomButton>
                }
                open={modal.open && modal.type === "settings"}
                onClose={closeModal}>
                <WeatherParametersToExportField />
                <NumberOfClosestStationsField />
                <Field
                    defaultValue={settings.maxRetry}
                    type="numeric"
                    label="Nombre maximal de tentative si la requête échoue"
                    onChange={(value) =>
                        setSettings({ ...settings, maxRetry: value })
                    }
                    startAdornment={<HistoryIcon />}
                    endAdornment="ms"
                />
                <Field
                    defaultValue={settings.delayBeforeRetrieveOrder}
                    type="numeric"
                    label="Délai entre la création d'une commande de données météo et sa récupération"
                    onChange={(value) =>
                        setSettings({
                            ...settings,
                            delayBeforeRetrieveOrder: value,
                        })
                    }
                    startAdornment={<SendAndArchiveIcon />}
                    endAdornment="ms"
                />
                <Field
                    defaultValue={settings.delayBeforeNextStation}
                    type="numeric"
                    label="Délai entre deux stations météo"
                    onChange={(value) =>
                        setSettings({
                            ...settings,
                            delayBeforeNextStation: value,
                        })
                    }
                    startAdornment={<SkipNextIcon />}
                    endAdornment="ms"
                />
                <Field
                    defaultValue={settings.meteoFranceApiKey}
                    label="Clé API Météo France"
                    onChange={(value) =>
                        setSettings({ ...settings, meteoFranceApiKey: value })
                    }
                    startAdornment={<KeyIcon />}
                />
            </CustomModal>
            <CustomModal
                title="Gestion des données de l'application"
                subtitle={
                    <CustomButton
                        className="danger"
                        icon={<RestartAltIcon />}
                        onClick={resetData}>
                        Réinitialiser les données
                    </CustomButton>
                }
                open={modal.open && modal.type === "data"}
                onClose={closeModal}>
                <Typography variant="h6">
                    Requêter les stations et les données météo
                </Typography>
                <InputStationsField />
                {/* stations: StationRow[]; */}
                <WeatherDataPeriodField />
                <CustomDivider />
                <Typography variant="h6">Chercher une station</Typography>
                <TownField />
                <CoordinatesField />
                <OpenStationPeriodField />
                {/* closestStations: ApiStationFromInformation[]; */}
            </CustomModal>
            <CustomModal
                title="Gestion des filtres de l'application"
                subtitle={
                    Object.keys(filters).length ? (
                        <CustomButton className="danger" onClick={resetFilters}>
                            Supprimer tous les filtres
                        </CustomButton>
                    ) : undefined
                }
                open={modal.open && modal.type === "filters"}
                onClose={closeModal}>
                <CustomTable
                    dense
                    sortable={false}
                    paginable={false}
                    data={sortArray({
                        array: Object.entries(filters).map(
                            ([filterKey, values]) => ({ filterKey, values })
                        ),
                        key: "filterKey",
                    })}
                    columns={[
                        {
                            dataKey: "filterKey",
                            label: "Filtre",
                        },
                        {
                            dataKey: "values",
                            label: "Valeurs",
                            render: (filter) => filter.values.join(", "),
                        },
                    ]}
                />
            </CustomModal>
            {help && (
                <CustomModal
                    title={printWithIcon(
                        <Typography variant="h5">
                            Aide de la page{" "}
                            {getRouteByPathname(pathname)?.label}
                        </Typography>,
                        getRouteByPathname(pathname)?.icon ?? <></>,
                        "right"
                    )}
                    subtitle={`Mode d'emploi de la page ${
                        getRouteByPathname(pathname)?.label
                    }`}
                    open={modal.open && modal.type === "help"}
                    onClose={closeModal}>
                    {help}
                </CustomModal>
            )}
        </>
    );
}

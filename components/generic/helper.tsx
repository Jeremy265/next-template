"use client";

import { useFiltersStore } from "@/lib/stores/filters";
import { useSettingsStore } from "@/lib/stores/settings";
import { sortArray } from "@/lib/utils/array.utils";
import { printWithIcon } from "@/lib/utils/icon.utils";
import { formatPathname } from "@/lib/utils/string.utils";
import CloseIcon from "@mui/icons-material/Close";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import HelpCenterIcon from "@mui/icons-material/HelpCenter";
import HistoryIcon from "@mui/icons-material/History";
import HolidayVillageIcon from "@mui/icons-material/HolidayVillage";
import KeyIcon from "@mui/icons-material/Key";
import LightbulbIcon from "@mui/icons-material/Lightbulb";
import RestartAltIcon from "@mui/icons-material/RestartAlt";
import SendAndArchiveIcon from "@mui/icons-material/SendAndArchive";
import SettingsIcon from "@mui/icons-material/Settings";
import SkipNextIcon from "@mui/icons-material/SkipNext";
import TuneIcon from "@mui/icons-material/Tune";
import {
    SpeedDial,
    SpeedDialAction,
    SpeedDialIcon,
    Typography,
} from "@mui/material";
import { usePathname } from "next/navigation";
import { ReactElement, useState } from "react";
import CustomButton from "./button";
import AutocompleteField from "./fields/autocomplete.field";
import Field from "./fields/field";
import CustomModal from "./modal";
import { getRouteByPathname } from "./navs/breadcrumbs";
import CustomTable from "./table/table";

const helpByPathname: { [key: string]: string | ReactElement } = {};

export default function Helper() {
    const pathname = formatPathname(usePathname()).replaceAll(/[0-9]+\/?/g, "");
    const help = helpByPathname[pathname];

    const [modal, setModal] = useState<{
        type?: "help" | "settings" | "filters";
        open: boolean;
    }>({ open: false });

    const closeModal = () => setModal({ open: false });

    const { filters, setFilters } = useFiltersStore();
    const { settings, setSettings, resetSettings } = useSettingsStore();

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
                    icon={<FilterAltIcon />}
                    slotProps={{ tooltip: { title: "Filtres" } }}
                    onClick={() => setModal({ open: true, type: "filters" })}
                />
                <SpeedDialAction
                    icon={<SettingsIcon />}
                    slotProps={{ tooltip: { title: "Paramètres" } }}
                    onClick={() => setModal({ open: true, type: "settings" })}
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
                <Field
                    defaultValue={settings.maxRetry}
                    label="Nombre maximal de tentative si la requête échoue"
                    onChange={(value) =>
                        setSettings({ ...settings, maxRetry: value })
                    }
                    startAdornment={<HistoryIcon />}
                    endAdornment="ms"
                />
                <Field
                    defaultValue={settings.delayBeforeRetrieveOrder}
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
                    defaultValue={settings.numberOfClosestStations}
                    label="Nombre de stations météo les plus proches à récupérer"
                    onChange={(value) =>
                        setSettings({
                            ...settings,
                            numberOfClosestStations: value,
                        })
                    }
                    startAdornment={<HolidayVillageIcon />}
                />
                <AutocompleteField
                    multiple
                    unlimitTags
                    schema={{
                        primaryKeyField: "title",
                        getOptionLabel: (option) => option.title,
                        getOptionDescription: (option) => option.subtitle,
                    }}
                    options={[
                        {
                            title: "BA300",
                            subtitle:
                                "HAUTEUR MINIMALE DE LA COUCHE >300M AVEC UNE NÃ‰BULOSITÃ‰ MAXI > 4/8",
                        },
                        {
                            title: "BROU",
                            subtitle: "OCCURRENCE DE BROUILLARD QUOTIDIENNE",
                        },
                        {
                            title: "BRUME",
                            subtitle: "OCCURRENCE DE BRUME QUOTIDIENNE",
                        },
                        { title: "DG", subtitle: "DUREE DE GEL QUOTIDIENNE" },
                        {
                            title: "DHUMEC",
                            subtitle: "DUREE HUMECTATION QUOTIDIENNE",
                        },
                        {
                            title: "DHUMI40",
                            subtitle: "DUREE HUMIDITE <= 40% QUOTIDIENNE",
                        },
                        {
                            title: "DHUMI80",
                            subtitle: "DUREE HUMIDITE >= 80% QUOTIDIENNE",
                        },
                        {
                            title: "DIFT",
                            subtitle: "RAYONNEMENT DIFFUS QUOTIDIEN",
                        },
                        {
                            title: "DIRT",
                            subtitle: "RAYONNEMENT DIRECT QUOTIDIEN",
                        },
                        {
                            title: "DRR",
                            subtitle: "DUREE DES PRECIPITATIONS QUOTIDIENNES",
                        },
                        {
                            title: "DXI",
                            subtitle:
                                "DIRECTION VENT MAXI INSTANTANE QUOTIDIEN",
                        },
                        {
                            title: "DXI2",
                            subtitle:
                                "DIRECTION DU VENT INSTANTANE MAXI QUOTIDIEN A 2 M",
                        },
                        {
                            title: "DXI3S",
                            subtitle:
                                "DIRECTION DU VENT INSTANTANÃ‰ SUR 3 SECONDES",
                        },
                        {
                            title: "DXY",
                            subtitle:
                                "DIRECTION VENT QUOTIDIEN MAXI MOYENNE SUR 10 MIN ",
                        },
                        {
                            title: "ECLAIR",
                            subtitle: "OCCURRENCE ECLAIR QUOTIDIENNE",
                        },
                        {
                            title: "ETPGRILLE",
                            subtitle:
                                "ETP CALCULEE AU POINT DE GRILLE LE PLUS PROCHE",
                        },
                        {
                            title: "ETPMON",
                            subtitle:
                                "EVAPO-TRANSPIRATION MONTEITH QUOTIDIENNE",
                        },
                        {
                            title: "FF2M",
                            subtitle:
                                "MOYENNE DES VITESSES DU VENT A 2 METRES QUOTIDIENNE",
                        },
                        {
                            title: "FFM",
                            subtitle:
                                "MOYENNE DES VITESSES DU VENT A 10M QUOTIDIENNE",
                        },
                        {
                            title: "FUMEE",
                            subtitle: "OCCURRENCE DE FUMEE QUOTIDIENNE",
                        },
                        {
                            title: "FXI",
                            subtitle:
                                "VITESSE VENT MAXI INSTANTANE QUOTIDIENNE",
                        },
                        {
                            title: "FXI2",
                            subtitle:
                                "VITESSE DU VENT INSTANTANE MAXI QUOTIDIEN A 2 M",
                        },
                        {
                            title: "FXI3S",
                            subtitle:
                                "VITESSE DU VENT INSTANTANÃ‰ SUR 3 SECONDES, MAXI DANS Lâ€™HEURE",
                        },
                        {
                            title: "FXY",
                            subtitle:
                                "VITESSE VENT QUOTIDIEN MAXI MOYENNE SUR 10 MIN ",
                        },
                        {
                            title: "GELEE",
                            subtitle: "OCCURRENCE DE GELEE QUOTIDIENNE",
                        },
                        {
                            title: "GLOT",
                            subtitle: "RAYONNEMENT GLOBAL QUOTIDIEN",
                        },
                        {
                            title: "GRELE",
                            subtitle: "OCCURRENCE DE GRELE QUOTIDIENNE",
                        },
                        {
                            title: "GRESIL",
                            subtitle: "OCCURENCE DE GRESIL QUOTIDIENNE",
                        },
                        {
                            title: "HNEIGEF",
                            subtitle: "HAUTEUR DE NEIGE TOMBEE EN 24H",
                        },
                        {
                            title: "HTN",
                            subtitle: "HEURE DU TN SOUS ABRI QUOTIDIENNE",
                        },
                        {
                            title: "HTX",
                            subtitle: "HEURE DU TX SOUS ABRI QUOTIDIENNE",
                        },
                        {
                            title: "HUN",
                            subtitle: "HEURE DU MINI D'HUMIDITE QUOTIDIENNE",
                        },
                        {
                            title: "HUX",
                            subtitle: "HEURE DU MAXI D'HUMIDITE QUOTIDIENNE",
                        },
                        {
                            title: "HXI",
                            subtitle: "HEURE VENT MAXI INSTANTANE QUOTIDIEN",
                        },
                        {
                            title: "HXI2",
                            subtitle:
                                "HEURE DU VENT MAX INSTANTANE A 2 M QUOTIDIENNE",
                        },
                        {
                            title: "HXI3S",
                            subtitle:
                                "HEURE DU VENT INSTANTANÃ‰ SUR 3 SECONDES",
                        },
                        {
                            title: "HXY",
                            subtitle:
                                "HEURE VENT QUOTIDIEN MAXI MOYENNE SUR 10 MIN ",
                        },
                        {
                            title: "INFRART",
                            subtitle: "SOMME DES RAYONNEMENTS IR HORAIRE",
                        },
                        {
                            title: "INST",
                            subtitle: "DUREE D'INSOLATION QUOTIDIENNE",
                        },
                        {
                            title: "NB300",
                            subtitle:
                                "NÃ‰BULOSITÃ‰ MAXIMALE > 4/8 Dâ€™UNE COUCHE < 300 M",
                        },
                        {
                            title: "NEIG",
                            subtitle: "OCCURRENCE DE NEIGE QUOTIDIENNE",
                        },
                        {
                            title: "NEIGETOT06",
                            subtitle:
                                "EPAISSEUR DE NEIGE TOTALE RELEVEE A 0600 FU",
                        },
                        {
                            title: "NEIGETOTX",
                            subtitle:
                                "MAXIMUM QUOTIDIEN DES EPAISSEURS DE NEIGE TOTALE HORAIRE",
                        },
                        {
                            title: "ORAG",
                            subtitle: "OCCURRENCE D'ORAGE QUOTIDIENNE",
                        },
                        {
                            title: "PMERM",
                            subtitle: "PRESSION MER MOYENNE QUOTIDIENNE",
                        },
                        {
                            title: "PMERMIN",
                            subtitle: "PRESSION MER MINIMUM QUOTIDIENNE",
                        },
                        {
                            title: "ROSEE",
                            subtitle: "OCCURRENCE DE ROSEE QUOTIDIENNE",
                        },
                        {
                            title: "RR",
                            subtitle: "HAUTEUR DE PRECIPITATIONS QUOTIDIENNE",
                        },
                        {
                            title: "SIGMA",
                            subtitle: "RAPPORT INSOLATION QUOTIDIEN",
                        },
                        {
                            title: "SOLNEIGE",
                            subtitle: "OCCURRENCE DE SOL COUVERT DE NEIGE",
                        },
                        {
                            title: "TAMPLI",
                            subtitle: "AMPLITUDE ENTRE TN ET TX QUOTIDIEN",
                        },
                        {
                            title: "TM",
                            subtitle:
                                "TEMPERATURE MOYENNE SOUS ABRI QUOTIDIENNE",
                        },
                        {
                            title: "TMERMAX",
                            subtitle:
                                "TEMPERATURE MAXIMALE QUOTIDIENNE DE L'EAU DE MER",
                        },
                        {
                            title: "TMERMIN",
                            subtitle:
                                "TEMPERATURE MINIMALE QUOTIDIENNE DE L'EAU DE MER",
                        },
                        {
                            title: "TMNX",
                            subtitle:
                                "TEMPERATURE MOYENNE SOUS ABRI QUOTIDIENNE A PARTIR DE (TN+TX)/2",
                        },
                        {
                            title: "TN",
                            subtitle:
                                "TEMPERATURE MINIMALE SOUS ABRI QUOTIDIENNE",
                        },
                        {
                            title: "TN50",
                            subtitle: "TEMPERATURE MINI A +50CM QUOTIDIENNE",
                        },
                        {
                            title: "TNSOL",
                            subtitle:
                                "TEMPERATURE MINIMALE A +10CM QUOTIDIENNE",
                        },
                        {
                            title: "TNTXM",
                            subtitle: "MOYENNE DE TN ET TX QUOTIDIEN",
                        },
                        {
                            title: "TSVM",
                            subtitle: "TENSION DE VAPEUR MOYENNE QUOTIDIENNE",
                        },
                        {
                            title: "TX",
                            subtitle:
                                "TEMPERATURE MAXIMALE SOUS ABRI QUOTIDIENNE",
                        },
                        { title: "UM", subtitle: "HUMIDITE RELATIVE MOYENNE" },
                        {
                            title: "UN",
                            subtitle: "HUMIDITE RELATIVE MINIMALE QUOTIDIENNE",
                        },
                        {
                            title: "UV",
                            subtitle: "RAYONNEMENT ULTRA VIOLET QUOTIDIEN",
                        },
                        {
                            title: "UV_INDICEX",
                            subtitle: "MAX DES INDICES UV HORAIRE",
                        },
                        {
                            title: "UX",
                            subtitle: "HUMIDITE RELATIVE MAXIMALE QUOTIDIENNE",
                        },
                        { title: "VERGLAS", subtitle: "OCCURRENCE DE VERGLAS" },
                    ]}
                    defaultValue={settings.paramsToExport}
                    label="Paramètres météo à exporter"
                    onChange={(value) =>
                        setSettings({
                            ...settings,
                            paramsToExport: value,
                        })
                    }
                    startAdornment={<TuneIcon />}
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
                title="Gestion des filtres de l'application"
                subtitle={
                    Object.keys(filters).length ? (
                        <CustomButton
                            className="danger"
                            onClick={() => setFilters({})}>
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

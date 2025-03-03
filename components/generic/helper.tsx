"use client";

import { useFiltersStore } from "@/lib/store/store";
import { sortArray } from "@/lib/utils/array.utils";
import { printWithIcon } from "@/lib/utils/icon.utils";
import { formatPathname } from "@/lib/utils/string.utils";
import CloseIcon from "@mui/icons-material/Close";
import HelpCenterIcon from "@mui/icons-material/HelpCenter";
import LightbulbIcon from "@mui/icons-material/Lightbulb";
import SearchIcon from "@mui/icons-material/Search";
import SupportIcon from "@mui/icons-material/Support";
import {
    SpeedDial,
    SpeedDialAction,
    SpeedDialIcon,
    Typography,
} from "@mui/material";
import { usePathname } from "next/navigation";
import { ReactElement, useState } from "react";
import { useCookies } from "react-cookie";
import CustomButton from "./button";
import CustomModal from "./modal";
import { getRouteByPathname } from "./navs/breadcrumbs";
import CustomTable from "./table/table";

const helpByPathname: { [key: string]: string | ReactElement } = {};

export default function Helper() {
    const [cookie] = useCookies();

    const pathname = formatPathname(usePathname()).replaceAll(/[0-9]+\/?/g, "");
    const help =
        pathname.startsWith("/checks") ||
        pathname.startsWith("/monitoring") ||
        helpByPathname[pathname];

    const [modal, setModal] = useState<{
        type?: "help" | "support" | "filters";
        open: boolean;
    }>({ open: false });

    const closeModal = () => setModal({ open: false });

    const { filters, setFilters } = useFiltersStore();

    return (
        <>
            <SpeedDial
                ariaLabel="Menu"
                sx={{
                    position: "fixed",
                    bottom: 32,
                    right: 32,
                }}
                FabProps={{
                    style: {
                        backgroundColor: "#c50022",
                    },
                }}
                icon={
                    <SpeedDialIcon
                        icon={<LightbulbIcon />}
                        openIcon={<CloseIcon />}
                    />
                }>
                <SpeedDialAction
                    icon={<SearchIcon />}
                    tooltipTitle="Filtres"
                    onClick={() => setModal({ open: true, type: "filters" })}
                />
                <SpeedDialAction
                    icon={<SupportIcon />}
                    tooltipTitle="Support"
                    onClick={() => setModal({ open: true, type: "support" })}
                />
                {help && (
                    <SpeedDialAction
                        icon={<HelpCenterIcon />}
                        tooltipTitle="Aide"
                        onClick={() => setModal({ open: true, type: "help" })}
                    />
                )}
            </SpeedDial>
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
                    title="Filtres"
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

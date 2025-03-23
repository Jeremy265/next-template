"use client";

import { useFiltersStore } from "@/lib/stores/filters";
import { sortArray } from "@/lib/utils/array.utils";
import { printWithIcon } from "@/lib/utils/icon.utils";
import { formatPathname } from "@/lib/utils/string.utils";
import CloseIcon from "@mui/icons-material/Close";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import HelpCenterIcon from "@mui/icons-material/HelpCenter";
import LightbulbIcon from "@mui/icons-material/Lightbulb";
import {
    SpeedDial,
    SpeedDialAction,
    SpeedDialIcon,
    Typography,
} from "@mui/material";
import { usePathname } from "next/navigation";
import { ReactElement, useState } from "react";
import CustomButton from "./button";
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

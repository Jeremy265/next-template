import { useDataStore } from "@/lib/stores/data";
import { ApiStationFromInformation } from "@/lib/type";
import { toPlural } from "@/lib/utils/string.utils";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import { Chip } from "@mui/material";
import { useState } from "react";
import CustomButton from "../generic/button";
import CustomTable from "../generic/table/table";
import ParametersModal from "../parameters.modal";

export default function SearchStationTable() {
    const [selectedStation, setSelectedStation] =
        useState<ApiStationFromInformation>();

    const { data } = useDataStore();

    return (
        <>
            <CustomTable
                data={data.closestStations ?? []}
                columns={[
                    {
                        dataKey: "id",
                        label: "ID Station",
                        filterKey: "id",
                        render: (station) => (
                            <Chip
                                variant="outlined"
                                label={station.id}
                                color={station.dateFin ? "warning" : "success"}
                            />
                        ),
                    },
                    {
                        dataKey: "distance",
                        label: "Distance",
                        filterKey: "distance",
                        render: (station) =>
                            `${Math.round(station.distance)} km`,
                    },
                    {
                        dataKey: "nom",
                        label: "Nom",
                        filterKey: "nom",
                    },
                    {
                        dataKey: "dateDebut",
                        label: "Ouverture",
                        filterKey: "start",
                    },
                    {
                        dataKey: "dateFin",
                        label: "Fermeture",
                        filterKey: "end",
                    },
                    {
                        dataKey: "parametres",
                        label: "Paramètres",
                        filterKey: "parameters",
                        render: (station) => (
                            <CustomButton
                                icon={<RemoveRedEyeIcon />}
                                onClick={() => setSelectedStation(station)}>
                                {toPlural(
                                    "paramètre",
                                    station.parametres.length ?? 0,
                                    true
                                )}
                            </CustomButton>
                        ),
                    },
                ]}
            />
            <ParametersModal
                station={selectedStation}
                onClose={() => setSelectedStation(undefined)}
            />
        </>
    );
}

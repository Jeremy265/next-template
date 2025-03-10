import { useDataStore } from "@/lib/stores/data";
import { ApiStationFromInformation } from "@/lib/type";
import { toPlural } from "@/lib/utils/string.utils";
import { formatDate } from "@/lib/utils/time.utils";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import { Chip } from "@mui/material";
import moment from "moment";
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
                        render: (station) =>
                            !station.dateFin
                                ? "Ouverte"
                                : formatDate(moment(station.dateFin)),
                    },
                    {
                        dataKey: "parametres",
                        label: "Paramètres",
                        filterKey: "parameters",
                        render: (station) => {
                            const nbParams = station.parametres.filter(
                                (parameter) => !parameter.dateFin
                            ).length;
                            return (
                                <CustomButton
                                    icon={<RemoveRedEyeIcon />}
                                    onClick={() => setSelectedStation(station)}>
                                    {toPlural("paramètre", nbParams, true)}
                                    {toPlural("disponible", nbParams)}
                                </CustomButton>
                            );
                        },
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

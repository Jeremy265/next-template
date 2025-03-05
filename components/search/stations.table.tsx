import { useDataStore } from "@/lib/stores/data";
import { ApiStationFromInformation } from "@/lib/type";
import { toPlural } from "@/lib/utils/string.utils";
import { formatDate } from "@/lib/utils/time.utils";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import { Chip } from "@mui/material";
import moment from "moment";
import { useState } from "react";
import CustomButton from "../generic/button";
import CustomModal from "../generic/modal";
import CustomTable from "../generic/table/table";

export default function SearchStationTable() {
    const [modal, setModal] = useState<{
        open: boolean;
        station?: ApiStationFromInformation;
    }>({
        open: false,
    });
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
                                onClick={() =>
                                    setModal({ open: true, station })
                                }>
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
            <CustomModal
                title={`Paramètres de la station ${modal.station?.id}`}
                subtitle={modal.station?.nom}
                open={modal.open}
                onClose={() => setModal({ open: false })}>
                <CustomTable
                    data={modal.station?.parametres ?? []}
                    columns={[
                        {
                            dataKey: "nom",
                            filterKey: "nom_parametre",
                            label: "Nom",
                        },
                        {
                            dataKey: "dateDebut",
                            filterKey: "debut_parametre",
                            label: "Début",
                            render: (parameter) =>
                                formatDate(moment(parameter.dateDebut)),
                        },
                        {
                            dataKey: "dateFin",
                            filterKey: "fin_parametre",
                            label: "Fin",
                            render: (parameter) =>
                                formatDate(moment(parameter.dateFin)),
                        },
                    ]}
                />
            </CustomModal>
        </>
    );
}

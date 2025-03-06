import { ApiStationFromInformation } from "@/lib/type";
import { formatDate } from "@/lib/utils/time.utils";
import moment from "moment";
import { useEffect, useState } from "react";
import CustomModal from "./generic/modal";
import CustomTable from "./generic/table/table";

type Props = {
    station?: ApiStationFromInformation;
    onClose: () => void;
};

export default function ParametersModal(props: Props) {
    const [open, setOpen] = useState(Boolean(props.station));

    useEffect(() => setOpen(Boolean(props.station)), [props.station]);

    return (
        <CustomModal
            title={`Paramètres de la station ${props.station?.id}`}
            subtitle={props.station?.nom}
            open={open}
            onClose={props.onClose}>
            <CustomTable
                data={props.station?.parametres ?? []}
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
                            parameter.dateFin
                                ? formatDate(moment(parameter.dateFin))
                                : "Disponible",
                    },
                ]}
            />
        </CustomModal>
    );
}

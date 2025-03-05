import { StationRow } from "@/lib/type";
import { formatMeasureToExport } from "@/lib/utils/csv.utils";
import { exportToExcel } from "@/lib/utils/excel.utils";
import CastIcon from "@mui/icons-material/Cast";
import CheckIcon from "@mui/icons-material/Check";
import DownloadIcon from "@mui/icons-material/Download";
import HourglassEmptyIcon from "@mui/icons-material/HourglassEmpty";
import WarningAmberIcon from "@mui/icons-material/WarningAmber";
import WbSunnyIcon from "@mui/icons-material/WbSunny";
import { Chip, CircularProgress } from "@mui/material";
import moment from "moment";
import { useContext } from "react";
import Aligned from "../generic/aligned";
import CustomButton from "../generic/button";
import CustomTable from "../generic/table/table";
import { RequestContext } from "./view";

export const statuses = {
    error: {
        label: "Erreur",
        color: "error",
        icon: <WarningAmberIcon />,
    },
    ready: {
        label: "Prêt",
        color: "info",
        icon: <HourglassEmptyIcon />,
    },
    waiting: {
        label: "En attente",
        color: "info",
        icon: <HourglassEmptyIcon />,
    },
    "getting-station-details": {
        label: "Récupération de la station",
        color: "warning",
        icon: <CastIcon />,
    },
    "placing-order": {
        label: "Génération de la commande",
        color: "warning",
        icon: <WbSunnyIcon />,
    },
    "retrieving-order": {
        label: "Récupération de la commande",
        color: "warning",
        icon: <CastIcon />,
    },
    done: {
        label: "Terminé",
        color: "success",
        icon: <CheckIcon />,
    },
};

export default function StationTable() {
    const { state } = useContext(RequestContext);

    return (
        <CustomTable
            data={state!.stations ?? []}
            columns={[
                {
                    dataKey: "id",
                    label: "ID Station",
                    render: (station) => (
                        <Chip
                            variant="outlined"
                            icon={statuses[station.status].icon}
                            label={
                                <Aligned noWrap>
                                    <span>
                                        {`${station.id} : ${
                                            statuses[station.status].label
                                        }`}
                                    </span>
                                    {station.loading && (
                                        <CircularProgress
                                            size="16px"
                                            color={
                                                statuses[station.status]
                                                    .color as
                                                    | "success"
                                                    | "warning"
                                                    | "info"
                                                    | "error"
                                            }
                                        />
                                    )}
                                </Aligned>
                            }
                            color={
                                statuses[station.status].color as
                                    | "success"
                                    | "warning"
                                    | "info"
                                    | "error"
                            }
                        />
                    ),
                },
                {
                    dataKey: "station",
                    label: "Nom",
                    filterKey: "nom",
                    render: (station) => {
                        if (!station.station) return "";
                        return `${station.station?.nom}${
                            station.station?.lieuDit
                                ? `, ${station.station?.lieuDit}`
                                : ""
                        }`;
                    },
                },
                {
                    dataKey: "station",
                    label: "Coordonnées",
                    render: (station) => {
                        if (!station.station?.positions) return "";
                        const position = station.station.positions.find(
                            (position) => !position.dateFin
                        );

                        return `Alt/Lat/Lon : ${position?.altitude.toFixed(
                            4
                        )}/${position?.latitude.toFixed(
                            4
                        )}/${position?.longitude.toFixed(4)}`;
                    },
                },
                {
                    dataKey: "station",
                    label: "Statut",
                    render: (station) => {
                        if (!station.station) return "";
                        return `${
                            station.station.dateFin ? "Inactive" : "Active"
                        }`;
                    },
                },
                {
                    dataKey: "station",
                    label: "Paramètres",
                    render: (station) => {
                        if (!station.station) return "";
                        return `${
                            (station.station.parametres ?? []).filter(
                                (parameter) => !parameter.dateFin
                            ).length
                        } paramètre(s)`;
                    },
                },
                ...((state!.period.from && state!.period.to) ||
                state!.stations.some((station) => station.measures?.length)
                    ? [
                          {
                              dataKey: "measures" as keyof StationRow,
                              label: "Données météo",
                              render: (station: StationRow) => {
                                  const dates = station.measures?.map(
                                      (measure) =>
                                          moment(measure.DATE, "YYYYMMDD")
                                  );
                                  if (!dates?.length) return "";
                                  return (
                                      <CustomButton
                                          icon={<DownloadIcon />}
                                          className="success"
                                          onClick={() =>
                                              exportToExcel(
                                                  `${station.id}_mesures`,
                                                  station.measures!.map(
                                                      formatMeasureToExport
                                                  )
                                              )
                                          }>
                                          {station.measures!.length} mesures (
                                          {moment.min(dates).format("DD/MM/YY")}
                                          -
                                          {moment.max(dates).format("DD/MM/YY")}
                                          )
                                      </CustomButton>
                                  );
                              },
                          },
                      ]
                    : []),
                {
                    dataKey: "infos",
                    label: "Statut de la requête",
                    render: (station) => (
                        <ul>
                            {station.infos.map((infos, index) => (
                                <li key={index}>{infos}</li>
                            ))}
                        </ul>
                    ),
                },
            ]}
        />
    );
}

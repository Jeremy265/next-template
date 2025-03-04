import { parse } from "papaparse";
import { useSettingsStore } from "../stores/settings";
import { ApiMeasure, ApiStationFromInformation } from "../type";

const stringToFrenchDate = (string: string) =>
    `${string.slice(8, 10)}/${string.slice(5, 7)}/${string.slice(0, 4)}`;

export const parseCsv = (text: string): any[] =>
    parse(text, { header: true, delimiter: ";" }).data;

export const formatMeasureToExport = (measure: ApiMeasure) => {
    const settings = useSettingsStore.getState().settings;
    const measureToExport: Partial<ApiMeasure> = {
        POSTE: measure.POSTE,
        DAT: `${measure.DATE.slice(6, 8)}/${measure.DATE.slice(
            4,
            6
        )}/${measure.DATE.slice(0, 4)}`,
    };
    for (const param of settings.paramsToExport) {
        measureToExport[param.title] = measure[param.title];
    }
    return measureToExport;
};

export const formatStationToExport = (station: ApiStationFromInformation) => ({
    date: stringToFrenchDate(new Date().toISOString()),
    ...station,
    dateDebut: stringToFrenchDate(station.dateDebut),
    dateFin: station.dateFin ? stringToFrenchDate(station.dateFin) : null,
    typesPoste: station.typesPoste
        .map(
            (typePoste) =>
                `${typePoste.type} ${
                    typePoste.dateFin ? "du" : "depuis"
                } ${stringToFrenchDate(typePoste.dateDebut)}${
                    typePoste.dateFin
                        ? ` au ${stringToFrenchDate(typePoste.dateFin)}`
                        : ""
                }`
        )
        .join("; "),
    parametres: station.parametres
        .map(
            (parametre) =>
                `${parametre.nom} ${
                    parametre.dateFin ? "du" : "depuis"
                } ${stringToFrenchDate(parametre.dateDebut)}${
                    parametre.dateFin
                        ? ` au ${stringToFrenchDate(parametre.dateFin)}`
                        : ""
                }`
        )
        .join("; "),
    producteurs: station.producteurs
        .map(
            (producteur) =>
                `${producteur.nom} ${
                    producteur.dateFin ? "du" : "depuis"
                } ${stringToFrenchDate(producteur.dateDebut)}${
                    producteur.dateFin
                        ? ` au ${stringToFrenchDate(producteur.dateFin)}`
                        : ""
                }`
        )
        .join("; "),
    positions: station.positions
        .map(
            (position) =>
                `Alt=${position.altitude}/Lat=${position.latitude}/Lon=${
                    position.longitude
                } ${position.dateFin ? "du" : "depuis"} ${stringToFrenchDate(
                    position.dateDebut
                )}${
                    position.dateFin
                        ? ` au ${stringToFrenchDate(position.dateFin)}`
                        : ""
                }`
        )
        .join("; "),
});

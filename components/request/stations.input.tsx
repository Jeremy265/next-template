import { useDataStore } from "@/lib/stores/data";
import { isStationIdValid } from "@/lib/utils/station.utils";
import CastIcon from "@mui/icons-material/Cast";
import Field from "../generic/fields/field";

export default function StationInput() {
    const { data, setData } = useDataStore();

    return (
        <Field
            defaultValue={data.inputStations}
            label="Stations"
            helperText="Coller la liste des identifiants séparés par un retour à la ligne, une virgule, un point-virgule ou un tiret. Chaque identifiant doit être composé de 8 chiffres."
            startAdornment={<CastIcon />}
            onChange={(inputStations: string) =>
                setData({
                    ...data,
                    inputStations,
                    stations: inputStations
                        .trim()
                        .split(/[\n,;-]/)
                        .map((id) => ({
                            id: id.trim(),
                            status: !isStationIdValid(id) ? "error" : "ready",
                            infos: !isStationIdValid(id)
                                ? ["Identifiant erroné"]
                                : [],
                        })),
                })
            }
        />
    );
}

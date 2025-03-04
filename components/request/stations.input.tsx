import CastIcon from "@mui/icons-material/Cast";
import { useContext } from "react";
import Field from "../generic/fields/field";
import { RequestContext } from "./view";

export default function StationInput() {
    const { state, setInputStations } = useContext(RequestContext);

    return (
        <Field
            defaultValue={state!.inputStations}
            label="Stations"
            helperText="Coller la liste des identifiants séparés par un retour à la ligne, une virgule, un point-virgule ou un tiret. Chaque identifiant doit être composé de 8 chiffres."
            startAdornment={<CastIcon />}
            onChange={setInputStations}
        />
    );
}

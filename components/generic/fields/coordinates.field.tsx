import { useDataStore } from "@/lib/stores/data";
import LanguageIcon from "@mui/icons-material/Language";
import Aligned from "../aligned";
import Field from "./field";

export default function CoordinatesField() {
    const { data, setData } = useDataStore();

    return (
        <Aligned>
            <Field
                defaultValue={data.coordinates?.lat}
                onChange={(lat) =>
                    setData({
                        ...data,
                        coordinates: { ...data.coordinates, lat },
                    })
                }
                label="Latitude"
                startAdornment={<LanguageIcon />}
            />
            <Field
                defaultValue={data.coordinates?.lon}
                onChange={(lon) =>
                    setData({
                        ...data,
                        coordinates: { ...data.coordinates, lon },
                    })
                }
                label="Longitude"
                startAdornment={<LanguageIcon />}
            />
        </Aligned>
    );
}

import { useDataStore } from "@/lib/stores/data";
import LanguageIcon from "@mui/icons-material/Language";
import Aligned from "../generic/aligned";
import Field from "../generic/fields/field";

export default function Coordinates() {
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

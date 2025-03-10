import { useSettingsStore } from "@/lib/stores/settings";
import CastConnectedIcon from "@mui/icons-material/CastConnected";
import Field from "./field";

export default function NumberOfClosestStationsField() {
    const { settings, setSettings } = useSettingsStore();

    return (
        <Field
            type="numeric"
            defaultValue={settings.numberOfClosestStations}
            onChange={(numberOfClosestStations) =>
                setSettings({
                    ...settings,
                    numberOfClosestStations,
                })
            }
            label="Nombre de station les plus proches à récupérer"
            startAdornment={<CastConnectedIcon />}
        />
    );
}

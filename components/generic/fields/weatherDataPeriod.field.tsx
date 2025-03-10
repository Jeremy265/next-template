import { useDataStore } from "@/lib/stores/data";
import moment from "moment";
import PeriodField from "./period.field";

export default function WeatherDataPeriodField() {
    const { data, setData } = useDataStore();

    return (
        <PeriodField
            label="Période de données météo"
            defaultValue={{
                from: data.weatherDataRequestPeriod?.from
                    ? moment(data.weatherDataRequestPeriod.from)
                    : null,
                to: data.weatherDataRequestPeriod?.to
                    ? moment(data.weatherDataRequestPeriod.to)
                    : null,
            }}
            onFromChange={(from) =>
                setData({
                    ...data,
                    weatherDataRequestPeriod: {
                        ...data.weatherDataRequestPeriod,
                        from,
                    },
                })
            }
            onToChange={(to) =>
                setData({
                    ...data,
                    weatherDataRequestPeriod: {
                        ...data.weatherDataRequestPeriod,
                        to,
                    },
                })
            }
        />
    );
}

import { useDataStore } from "@/lib/stores/data";
import moment from "moment";
import PeriodField from "./period.field";

export default function OpenStationPeriodField() {
    const { data, setData } = useDataStore();

    return (
        <PeriodField
            label="Période d'ouverture"
            defaultValue={{
                from: data.openStationPeriod?.from
                    ? moment(data.openStationPeriod.from)
                    : undefined,
                to: data.openStationPeriod?.to
                    ? moment(data.openStationPeriod.to)
                    : undefined,
            }}
            onFromChange={(from) =>
                setData({
                    ...data,
                    openStationPeriod: {
                        ...data.openStationPeriod,
                        from: from,
                    },
                })
            }
            onToChange={(to) =>
                setData({
                    ...data,
                    openStationPeriod: {
                        ...data.openStationPeriod,
                        to: to,
                    },
                })
            }
        />
    );
}

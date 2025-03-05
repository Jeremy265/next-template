import { useDataStore } from "@/lib/stores/data";
import { Box } from "@mui/material";
import moment from "moment";
import Aligned from "../generic/aligned";
import DateField from "../generic/fields/date.field";

export default function PeriodInput() {
    const { data, setData } = useDataStore();

    return (
        <Aligned top space={2}>
            <Box>
                <DateField
                    label="Du"
                    defaultValue={data.period.from}
                    maxDate={data.period.to}
                    onChange={(date) =>
                        setData({
                            ...data,
                            period: {
                                ...data.period,
                                from: date,
                            },
                        })
                    }
                    required={Boolean(!data.period.from && data.period.to)}
                    error={Boolean(!data.period.from && data.period.to)}
                    helperText={
                        Boolean(!data.period.from && data.period.to)
                            ? "La date de début est obligatoire"
                            : ""
                    }
                />
            </Box>
            <Box>
                <DateField
                    label="Au"
                    defaultValue={data.period.to}
                    minDate={data.period.from}
                    maxDate={moment()}
                    onChange={(date) => {
                        setData({
                            ...data,
                            period: {
                                ...data.period,
                                to: date,
                            },
                        });
                    }}
                    required={Boolean(!data.period.to && data.period.from)}
                    error={Boolean(!data.period.to && data.period.from)}
                    helperText={
                        Boolean(!data.period.to && data.period.from)
                            ? "La date de fin est obligatoire"
                            : ""
                    }
                />
            </Box>
        </Aligned>
    );
}

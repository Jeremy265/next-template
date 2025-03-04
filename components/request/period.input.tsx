import { Box } from "@mui/material";
import moment from "moment";
import { useContext } from "react";
import Aligned from "../generic/aligned";
import DateField from "../generic/fields/date.field";
import { RequestContext } from "./view";

export default function PeriodInput() {
    const { state, setPeriod } = useContext(RequestContext);

    return (
        <Aligned space={2}>
            <Box>
                <DateField
                    label="Du"
                    defaultValue={state!.period.from}
                    maxDate={state!.period.to}
                    onChange={(date) =>
                        setPeriod &&
                        setPeriod({
                            ...state!.period,
                            from: date,
                        })
                    }
                    required={Boolean(!state!.period.from && state!.period.to)}
                    error={Boolean(!state!.period.from && state!.period.to)}
                    helperText={
                        Boolean(!state!.period.from && state!.period.to)
                            ? "La date de début est obligatoire"
                            : ""
                    }
                />
            </Box>
            <Box>
                <DateField
                    label="Au"
                    defaultValue={state!.period.to}
                    minDate={state!.period.from}
                    maxDate={moment()}
                    onChange={(date) => {
                        setPeriod &&
                            setPeriod({
                                ...state!.period,
                                to: date,
                            });
                    }}
                    required={Boolean(!state!.period.to && state!.period.from)}
                    error={Boolean(!state!.period.to && state!.period.from)}
                    helperText={
                        Boolean(!state!.period.to && state!.period.from)
                            ? "La date de fin est obligatoire"
                            : ""
                    }
                />
            </Box>
        </Aligned>
    );
}

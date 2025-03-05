import { Box } from "@mui/material";
import moment, { Moment } from "moment";
import Aligned from "../aligned";
import DateField from "./date.field";
import { FieldProps } from "./field";

export default function PeriodField(
    props: {
        onFromChange: (from: Moment) => void;
        onToChange: (from: Moment) => void;
    } & FieldProps
) {
    return (
        <Aligned top space={2}>
            <Box width="100%">
                <DateField
                    label={props.label ? `${props.label} (Début)` : "Du"}
                    defaultValue={props.defaultValue?.from}
                    maxDate={props.defaultValue?.to}
                    onChange={props.onFromChange}
                    required={Boolean(
                        !props.defaultValue?.from && props.defaultValue?.to
                    )}
                    error={Boolean(
                        !props.defaultValue?.from && props.defaultValue?.to
                    )}
                    helperText={
                        Boolean(
                            !props.defaultValue?.from && props.defaultValue?.to
                        )
                            ? "La date de début est obligatoire"
                            : ""
                    }
                />
            </Box>
            <Box width="100%">
                <DateField
                    label={props.label ? `${props.label} (Fin)` : "Au"}
                    defaultValue={props.defaultValue?.to}
                    minDate={props.defaultValue?.from}
                    maxDate={moment()}
                    onChange={props.onToChange}
                    required={Boolean(
                        !props.defaultValue?.to && props.defaultValue?.from
                    )}
                    error={Boolean(
                        !props.defaultValue?.to && props.defaultValue?.from
                    )}
                    helperText={
                        Boolean(
                            !props.defaultValue?.to && props.defaultValue?.from
                        )
                            ? "La date de fin est obligatoire"
                            : ""
                    }
                />
            </Box>
        </Aligned>
    );
}

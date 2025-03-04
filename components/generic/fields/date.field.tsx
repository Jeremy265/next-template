import { Box } from "@mui/material";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import moment, { Moment } from "moment";
import "moment/locale/fr";
import { FieldProps } from "./field";

type Props = {
    minDate?: Moment | null;
    maxDate?: Moment | null;
} & FieldProps;

moment.updateLocale("fr", {
    week: {
        dow: 1,
    },
});

export default function DateField(props: Props) {
    return (
        <Box width="100%">
            <LocalizationProvider dateAdapter={AdapterMoment}>
                <DatePicker
                    {...props}
                    autoFocus
                    format="DD/MM/YYYY"
                    minDate={props.minDate ? moment(props.minDate) : undefined}
                    maxDate={
                        props.maxDate !== null
                            ? moment(
                                  props.maxDate !== undefined
                                      ? props.maxDate
                                      : new Date()
                              )
                            : undefined
                    }
                    value={
                        props.defaultValue
                            ? moment(props.defaultValue, "DD/MM/YYYY")
                            : null
                    }
                    onChange={(value: Moment | null) => {
                        props.onChange && props.onChange(value);
                    }}
                    slotProps={{
                        textField: {
                            fullWidth: true,
                            variant: "standard",
                            margin: "dense",
                            required: props.required,
                            error: props.error,
                            helperText: props.helperText,
                        },
                        field: {
                            clearable: true,
                            focused: Boolean(props.defaultValue),
                        },
                    }}
                />
            </LocalizationProvider>
        </Box>
    );
}

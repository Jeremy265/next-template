import { Box, FormHelperText, Switch } from "@mui/material";
import FormControlLabel from "@mui/material/FormControlLabel";
import { FieldProps } from "./field";

type Props = {
    labelPlacement?: "start" | "end";
} & FieldProps;

export default function SwitchField(props: Props) {
    return (
        <Box width="100%">
            <FormControlLabel
                {...props}
                onBlur={undefined}
                label={props.label}
                labelPlacement={props.labelPlacement ?? "top"}
                sx={{ margin: 0 }}
                control={
                    <Switch
                        onChange={(e: any) =>
                            props.onChange &&
                            props.onChange(e.currentTarget.checked)
                        }
                        checked={props.defaultValue}
                        color="success"
                    />
                }
            />
            <FormHelperText error={props.error}>
                {props.helperText}
            </FormHelperText>
        </Box>
    );
}

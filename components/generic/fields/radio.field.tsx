import {
    FormControl,
    FormControlLabel,
    FormLabel,
    Radio,
    RadioGroup,
} from "@mui/material";

type Option = {
    label: string;
    value: any;
    disabled?: boolean;
};
type Props = {
    options: Option[];
    label: string;
    name: string;
    defaultValue?: any;
    onChange?: (value: any) => void;
    row?: boolean;
};

export default function RadioField(props: Props) {
    return (
        <FormControl>
            <FormLabel>{props.label}</FormLabel>
            <RadioGroup
                row={props.row}
                onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                    props.onChange && props.onChange(event.target.value)
                }
                defaultValue={props.defaultValue}
                name={props.name}>
                {props.options.map((option) => (
                    <FormControlLabel
                        key={option.label}
                        value={option.value}
                        control={<Radio />}
                        label={option.label}
                        disabled={option.disabled}
                    />
                ))}
            </RadioGroup>
        </FormControl>
    );
}

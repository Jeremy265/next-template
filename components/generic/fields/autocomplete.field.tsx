import { getReactNodeText } from "@/lib/utils/object.utils";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import {
    Autocomplete,
    AutocompleteRenderInputParams,
    Checkbox,
    createFilterOptions,
    FilterOptionsState,
    InputAdornment,
    ListItemText,
    TextField,
} from "@mui/material";
import { ReactElement, useEffect, useState } from "react";
import { formatString } from "../../../lib/utils/string.utils";
import Aligned from "../aligned";
import { FieldProps } from "./field";

export type AutocompleteFieldProps<T> = {
    multiple?: boolean;
    options: T[];
    schema?: Partial<{
        getOptionLabel: (option: T) => string | ReactElement;
        getOptionDescription: (option: T) => string;
        primaryKeyField: keyof T;
        uniqueField: keyof T;
    }>;
    getOptionTooltip?: (option: T) => string;
    clearable?: boolean;
    unlimitTags?: boolean;
    onInput?: (text: string) => void;
    showAllOptions?: boolean;
} & FieldProps;

export default function AutocompleteField<T>(props: AutocompleteFieldProps<T>) {
    const filter = createFilterOptions<T>({
        stringify: (option) =>
            `${getOptionLabel(option)}${props.schema?.getOptionDescription?.(
                option
            )}`,
        trim: true,
    });

    const [value, setValue] = useState<T | T[] | null>(
        props.defaultValue || (props.multiple ? [] : null)
    );

    useEffect(
        () => setValue(props.defaultValue || (props.multiple ? [] : null)),
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [props.defaultValue]
    );

    useEffect(
        () => {
            if (!Array.isArray(value) || !props.schema?.primaryKeyField) return;
            const newValue = value.filter((v) =>
                props.options.some(
                    (option) =>
                        v[props.schema?.primaryKeyField!] ===
                        option[props.schema?.primaryKeyField!]
                )
            );
            if (newValue.length === value.length) return;
            setValue(newValue);
            props.onChange && props.onChange(newValue);
        },
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [props.options]
    );

    const getOptionLabel = (option: any): string =>
        typeof option === "string" || !props.schema?.getOptionLabel
            ? option
            : getReactNodeText(props.schema?.getOptionLabel(option));

    const groupBy = (option: T) =>
        formatString(
            /[0-9]/.test(getOptionLabel(option)[0])
                ? "0-9"
                : getOptionLabel(option)[0]
        ).toUpperCase();

    const getOptionByInput = (input: string) =>
        props.options.find((option) =>
            props.schema?.primaryKeyField
                ? option[props.schema?.primaryKeyField]
                : option === input
        );

    const isNewOption = (optionToFind: T): boolean =>
        !props.schema?.uniqueField ||
        (Array.isArray(optionToFind) ? optionToFind : [optionToFind]).find(
            (optionToFind2) =>
                props.options.find(
                    (option) =>
                        formatString(
                            optionToFind2[props.schema?.uniqueField!] as string
                        ) ===
                        formatString(
                            option[props.schema?.uniqueField!] as string
                        )
                ) === undefined
        );

    const renderOption = (
        optionProps: any,
        option: T,
        { selected }: { selected: boolean }
    ): ReactElement => (
        <ListItemText
            {...optionProps}
            key={
                props.schema?.primaryKeyField
                    ? option[props.schema?.primaryKeyField]
                    : optionProps.key
            }
            sx={{
                "& > img": { mr: 2, flexShrink: 0 },
                flexDirection: "column",
                alignItems: "start !important",
            }}
            title={props.getOptionTooltip && props.getOptionTooltip(option)}
            primary={
                <Aligned space={0}>
                    {props.multiple && (
                        <Checkbox
                            icon={<CheckBoxOutlineBlankIcon fontSize="small" />}
                            checkedIcon={<CheckBoxIcon fontSize="small" />}
                            style={{ marginRight: 8 }}
                            checked={selected}
                        />
                    )}
                    {(props.schema?.getOptionLabel &&
                        props.schema?.getOptionLabel(option)) ||
                        getOptionLabel(option)}
                </Aligned>
            }
            secondary={
                (!props.schema?.uniqueField || !isNewOption(option)) &&
                props.schema?.getOptionDescription &&
                props.schema?.getOptionDescription(option)
            }
        />
    );

    const filterOptions = (options: any[], params: FilterOptionsState<any>) =>
        props.showAllOptions ? options : filter(options, params);

    return (
        <>
            <Autocomplete
                disableClearable={props.clearable === false}
                multiple={props.multiple}
                disableCloseOnSelect={props.multiple}
                limitTags={props.unlimitTags ? undefined : 1}
                noOptionsText="Aucune option disponible"
                fullWidth
                openText="Ouvrir"
                closeText="Fermer"
                clearText="Effacer"
                readOnly={props.readonly}
                options={props.options.sort((a, b) =>
                    getOptionLabel(a).localeCompare(getOptionLabel(b))
                )}
                isOptionEqualToValue={(option: T, value: T) =>
                    props.schema?.primaryKeyField
                        ? option[props.schema.primaryKeyField] ===
                          value[props.schema.primaryKeyField]
                        : option === value
                }
                value={value}
                disabled={props.disabled}
                onChange={(_: any, input: any) => {
                    let option: T =
                        typeof input === "string"
                            ? getOptionByInput(input)
                            : input;

                    setValue(option);

                    props.onChange && props.onChange(option);
                }}
                groupBy={groupBy}
                getOptionLabel={getOptionLabel}
                renderOption={renderOption}
                filterOptions={filterOptions}
                renderInput={(
                    params: AutocompleteRenderInputParams
                ): ReactElement => (
                    <TextField
                        {...params}
                        fullWidth
                        margin="dense"
                        size={props.readonly ? "small" : "medium"}
                        variant={props.readonly ? "filled" : "standard"}
                        label={props.label}
                        error={props.error}
                        helperText={props.helperText}
                        onChange={(e) =>
                            props.onInput &&
                            props.onInput(e.currentTarget.value)
                        }
                        required={props.required}
                        placeholder={props.placeholder}
                        focused={props.focused}
                        slotProps={{
                            input: {
                                ...params.InputProps,
                                startAdornment: (params.InputProps
                                    .startAdornment ||
                                    props.startAdornment) && (
                                    <>
                                        {props.startAdornment && (
                                            <InputAdornment position="start">
                                                {props.startAdornment}
                                            </InputAdornment>
                                        )}
                                        {params.InputProps.startAdornment}
                                    </>
                                ),
                            },
                        }}
                    />
                )}
            />
        </>
    );
}

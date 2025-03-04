"use client";

import { editIcon, errorIcon, successIcon } from "@/lib/utils/icon.utils";
import { Box, InputAdornment, TextField, Tooltip } from "@mui/material";
import { ReactElement, useEffect, useState } from "react";

export interface FieldProps {
    id?: string;
    label?: string | ReactElement;
    defaultValue?: any;
    type?: "text" | "numeric" | "decimal" | "email";
    disabled?: boolean;
    required?: boolean;
    readonly?: boolean;
    onChange?: (value: any) => void;
    onBlur?: (_: any) => void;
    endAdornment?: string | ReactElement;
    startAdornment?: string | ReactElement;
    error?: boolean;
    helperText?: string;
    placeholder?: string;
    title?: string;
    noFullWidth?: boolean;
    isConform?: boolean;
    focused?: boolean;
    noMargin?: boolean;
    multiline?: boolean;
}

export default function Field(props: FieldProps) {
    const [value, setValue] = useState(props.defaultValue ?? "");

    useEffect(() => {
        setValue(props.defaultValue ?? "");
    }, [props.defaultValue]);

    const getValueFromEvent = (e: any): string | number | null =>
        e.currentTarget.value;

    const getCallbackValue = (value: string | number | null) =>
        ["numeric", "decimal"].includes(props.type ?? "text") &&
        !isNaN(Number(value))
            ? value === ""
                ? null
                : Number(value)
            : String(value).trim();

    const handleChange = (e: any) => {
        const value = getValueFromEvent(e);
        setValue(value);
        props.onChange && props.onChange(getCallbackValue(value));
    };

    return (
        <Box width="100%">
            <Tooltip title={props.title}>
                <TextField
                    fullWidth={!props.noFullWidth}
                    multiline={props.multiline !== false}
                    maxRows={10}
                    value={value}
                    error={props.error}
                    helperText={props.helperText}
                    id={props.id}
                    label={props.label}
                    disabled={props.disabled}
                    required={props.required}
                    margin="dense"
                    size={props.readonly ? "small" : "medium"}
                    variant={props.readonly ? "filled" : "standard"}
                    type={props.type}
                    inputMode={props.type}
                    onChange={handleChange}
                    onBlur={() =>
                        props.onBlur && props.onBlur(getCallbackValue(value))
                    }
                    {...(props.focused ? { focused: true } : {})}
                    placeholder={props.placeholder}
                    slotProps={{
                        input: {
                            readOnly: props.readonly,
                            startAdornment:
                                props.startAdornment ||
                                props.isConform !== undefined ? (
                                    <InputAdornment
                                        position="start"
                                        sx={{ marginTop: "0px!important" }}>
                                        {props.startAdornment
                                            ? props.startAdornment
                                            : props.defaultValue ===
                                                  undefined ||
                                              props.defaultValue === null
                                            ? editIcon
                                            : props.isConform
                                            ? successIcon
                                            : errorIcon}
                                    </InputAdornment>
                                ) : undefined,
                            endAdornment: props.endAdornment ? (
                                <InputAdornment position="end">
                                    {props.endAdornment}
                                </InputAdornment>
                            ) : undefined,
                        },
                    }}
                />
            </Tooltip>
        </Box>
    );
}

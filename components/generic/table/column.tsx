import SearchIcon from "@mui/icons-material/Search";
import SwapVertIcon from "@mui/icons-material/SwapVert";
import { IconButton, Tooltip } from "@mui/material";
import { ReactElement } from "react";
import Aligned from "../aligned";
import AutocompleteField from "../fields/autocomplete.field";
import Field from "../fields/field";

export type TableColumnType<T> = {
    label: string;
    dataKey: keyof T;
    filterKey?: string;
    render?: (row: T) => string | ReactElement;
    selectable?: boolean;
    sortable?: boolean;
} & Props<T>;

type Props<T> = {
    onFilterChange?: (value: string | string[]) => void;
    onFilterBlur?: (value: string | string[]) => void;
    onSort?: (column: TableColumnType<T>) => void;
    defaultFilter?: string[];
    filterOptions?: string[];
    sortDirection?: "asc" | "desc";
};

export default function CustomTableColumn<T>(props: TableColumnType<T>) {
    return (
        <Tooltip title={props.filterOptions ? "" : props.label}>
            <Aligned noWrap spaced>
                {props.onFilterChange || props.onFilterBlur ? (
                    props.filterOptions ? (
                        <AutocompleteField<string>
                            multiple
                            label={props.label}
                            placeholder="Sélectionner..."
                            options={props.filterOptions}
                            onChange={(value) => {
                                props.onFilterChange &&
                                    props.onFilterChange(value as string[]);
                                props.onFilterBlur &&
                                    props.onFilterBlur(value as string[]);
                            }}
                            defaultValue={props.defaultFilter}
                            startAdornment={
                                <SearchIcon
                                    color={
                                        props.defaultFilter
                                            ? "primary"
                                            : undefined
                                    }
                                />
                            }
                            focused={Boolean(props.defaultFilter)}
                        />
                    ) : (
                        <Field
                            id={props.label}
                            label={props.label}
                            multiline={false}
                            placeholder="Filtrer..."
                            onChange={props.onFilterChange}
                            onBlur={props.onFilterBlur}
                            defaultValue={props.defaultFilter?.at(0)}
                            startAdornment={
                                <SearchIcon
                                    color={
                                        props.defaultFilter
                                            ? "primary"
                                            : undefined
                                    }
                                />
                            }
                            focused={Boolean(props.defaultFilter)}
                        />
                    )
                ) : (
                    props.label
                )}
                {props.onSort && (
                    <Tooltip
                        title={
                            !props.sortDirection ||
                            props.sortDirection === "desc"
                                ? "Trier par ordre croissant"
                                : "Trier par ordre décroissant"
                        }>
                        <IconButton
                            color={props.sortDirection ? "primary" : undefined}
                            onClick={() => props.onSort && props.onSort(props)}>
                            <SwapVertIcon />
                        </IconButton>
                    </Tooltip>
                )}
            </Aligned>
        </Tooltip>
    );
}

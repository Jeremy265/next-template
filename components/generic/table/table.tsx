"use client";

import { useFiltersStore } from "@/lib/stores/filters";
import { sortArray } from "@/lib/utils/array.utils";
import { exportToExcel } from "@/lib/utils/excel.utils";
import { getReactNodeText } from "@/lib/utils/object.utils";
import { formatString } from "@/lib/utils/string.utils";
import noData from "@/public/no-data.gif";
import DownloadIcon from "@mui/icons-material/Download";
import {
    TableBody,
    TableCell,
    TablePagination,
    TableRow,
    Typography,
    useMediaQuery,
    useTheme,
} from "@mui/material";
import Table from "@mui/material/Table";
import TableContainer from "@mui/material/TableContainer";
import Image from "next/image";
import { ReactElement, useState } from "react";
import Aligned from "../aligned";
import CustomButton from "../button";
import BasicSkeleton from "../skeletons/skeleton";
import { TableColumnType } from "./column";
import CustomTableHeader from "./header";
import CustomTableRow, { getCellContentToString } from "./row";

export type Action<T> = {
    onClick: (datum: T) => void;
    icon?: ReactElement;
    tooltip?: string;
    className?: string;
};

export type TableCollapsableColumn<T> = TableColumnType<T> & {
    isRowConcerned?: (row: T) => boolean;
};

type Props<T> = {
    title?: string | ReactElement;
    dense?: boolean;
    caption?: string | ReactElement;
    sortable?: boolean;
    sortBy?: keyof T;
    sortDirection?: "asc" | "desc";
    paginable?: boolean;
    downloadable?: boolean;
    hasFilters?: boolean;
    data: T[];
    columns: TableColumnType<T>[] | TableCollapsableColumn<T>[];
    collapsableColumns?: TableCollapsableColumn<T>[];
};

export default function CustomTable<T>(props: Props<T>) {
    const { filters, setFilters } = useFiltersStore();

    const md = useMediaQuery(useTheme().breakpoints.down("md"));
    const [pagination, setPagination] = useState<{
        page: number;
        rowsPerPage: number;
    }>({
        page: 0,
        rowsPerPage: 10,
    });
    const [sorting, setSorting] = useState<{
        column?: TableColumnType<T>;
        direction: "asc" | "desc";
    }>({
        column: props.columns.find(
            (column) =>
                column.dataKey === props.sortBy ||
                column.dataKey === "updated_at"
        ),
        direction: props.sortDirection ?? "desc",
    });

    const getColumnByFilterKey = (filterKey: string) =>
        props.columns.find((column) => column.filterKey === filterKey);

    const filteredRows = !props.data
        ? []
        : props.data.filter(
              (row) =>
                  !Object.entries(filters)
                      .filter(([filterKey]) => getColumnByFilterKey(filterKey))
                      .map(([filterKey, values]) => {
                          const column = getColumnByFilterKey(filterKey);
                          if (!column) return false;
                          const content = getCellContentToString(row, column);
                          return values
                              .map((value) =>
                                  value === ""
                                      ? content === ""
                                      : formatString(content).includes(
                                            formatString(value)
                                        )
                              )
                              .includes(true);
                      })
                      .includes(false)
          );

    const sortedRows =
        props.sortable === false || !sorting.column
            ? filteredRows
            : sortArray<T & { ["sorting_key"]: string | Date }>({
                  array: filteredRows.map((row) => ({
                      ...row,
                      sorting_key:
                          row[sorting.column!.dataKey] instanceof Date
                              ? (row[sorting.column!.dataKey] as Date)
                              : getCellContentToString(row, sorting.column!),
                  })),
                  key: "sorting_key" as keyof T,
                  direction: sorting.direction,
              });

    const paginatedRows = sortedRows.slice(
        props.paginable !== false
            ? pagination.page * pagination.rowsPerPage
            : undefined,
        props.paginable !== false
            ? pagination.page * pagination.rowsPerPage + pagination.rowsPerPage
            : undefined
    );

    const hasActions = Boolean(
        paginatedRows.some((paginatedRow) =>
            props.collapsableColumns?.some(
                (collapsableColumn) =>
                    !collapsableColumn.isRowConcerned ||
                    collapsableColumn.isRowConcerned(paginatedRow)
            )
        )
    );

    const hasFilters = Object.keys(filters).find(
        (filterKey) =>
            props.hasFilters ||
            props.columns
                .concat(props.collapsableColumns ?? [])
                .find((column) => filterKey === column.filterKey)
    );

    return (
        <TableContainer sx={{ margin: "8px 0" }}>
            <Aligned col noWrap>
                <Typography variant="h6">{props.title}</Typography>
                {props.downloadable !== false && Boolean(sortedRows.length) && (
                    <span>
                        <CustomButton
                            icon={<DownloadIcon />}
                            onClick={() =>
                                exportToExcel(
                                    getReactNodeText(props.title) ||
                                        "Export_Inventaire",
                                    sortedRows.map((row) => {
                                        const datum: {
                                            [key: string]: any;
                                        } = {};
                                        props.columns
                                            .concat(
                                                props.collapsableColumns?.filter(
                                                    (collapsableColumn) =>
                                                        !collapsableColumn.isRowConcerned ||
                                                        collapsableColumn.isRowConcerned(
                                                            row
                                                        )
                                                ) ?? []
                                            )
                                            .forEach(
                                                (column) =>
                                                    (datum[column.label] =
                                                        getCellContentToString(
                                                            row,
                                                            column
                                                        ))
                                            );
                                        return datum;
                                    })
                                )
                            }
                            className="success no-print">
                            Excel
                        </CustomButton>
                    </span>
                )}
            </Aligned>
            <Table
                sx={{ width: "100%" }}
                size={props.dense ? "small" : "medium"}>
                {(props.caption || hasFilters) && (
                    <caption
                        style={{
                            padding: props.dense ? 0 : "normal",
                        }}>
                        {props.caption}
                        {hasFilters && (
                            <Typography color="#1976d2">
                                Attention, la table est filtrée sur{" "}
                                {props.columns
                                    .concat(props.collapsableColumns ?? [])
                                    .filter((column) =>
                                        Object.keys(filters).find(
                                            (filterKey) =>
                                                filterKey === column.filterKey
                                        )
                                    )
                                    .map((column) => column.label)
                                    .join(", ")}
                                . Effacer les filtres pour voir toutes les
                                données.
                            </Typography>
                        )}
                    </caption>
                )}
                <CustomTableHeader<T>
                    break={md}
                    dense={props.dense}
                    columns={props.columns.map((column) => ({
                        ...column,
                        onFilterChange: column.filterKey
                            ? (value) => {
                                  if (pagination.page !== 0)
                                      setPagination({
                                          ...pagination,
                                          page: 0,
                                      });
                                  const newColumnFilters = {
                                      ...filters,
                                  };
                                  if (
                                      !value ||
                                      (Array.isArray(value) && !value.length)
                                  ) {
                                      delete newColumnFilters[
                                          column.filterKey!
                                      ];
                                  } else {
                                      newColumnFilters[column.filterKey!] =
                                          Array.isArray(value)
                                              ? value
                                              : [value];
                                  }
                                  setFilters(newColumnFilters);
                              }
                            : undefined,
                        filterOptions: column.selectable
                            ? sortArray({
                                  array: Array.from(
                                      new Set<string>(
                                          props.data?.map((row) =>
                                              getCellContentToString(
                                                  row,
                                                  column as TableColumnType<T>
                                              )
                                          )
                                      )
                                  ),
                              })
                            : undefined,
                        defaultFilter:
                            column.filterKey && filters[column.filterKey]
                                ? filters[column.filterKey]
                                : undefined,
                        onSort:
                            props.sortable !== false &&
                            column.sortable !== false
                                ? (column: TableColumnType<T>) =>
                                      setSorting({
                                          column: column,
                                          direction:
                                              sorting.column?.dataKey ===
                                                  column.dataKey &&
                                              sorting.direction === "asc"
                                                  ? "desc"
                                                  : "asc",
                                      })
                                : undefined,
                        sortDirection:
                            sorting.column?.dataKey === column.dataKey
                                ? sorting.direction
                                : undefined,
                    }))}
                    action={hasActions ? <>Actions</> : undefined}
                />
                <TableBody>
                    {!props.data &&
                        [1, 2, 3].map((rowIndex) => (
                            <TableRow key={rowIndex}>
                                {[...props.columns, hasActions ? [{}] : []].map(
                                    (_, cellIndex) => (
                                        <TableCell key={cellIndex}>
                                            <BasicSkeleton />
                                        </TableCell>
                                    )
                                )}
                            </TableRow>
                        ))}
                    {props.data && !paginatedRows.length && (
                        <TableRow>
                            <TableCell
                                colSpan={
                                    props.columns.length + Number(hasActions)
                                }
                                align="center">
                                <Aligned centered>
                                    Aucune donnée{" "}
                                    {hasFilters &&
                                        "pour les filtres sélectionnés"}
                                    <Image
                                        style={{
                                            height: "50px",
                                            width: "auto",
                                        }}
                                        src={noData}
                                        alt=""
                                        unoptimized
                                    />
                                </Aligned>
                            </TableCell>
                        </TableRow>
                    )}
                    {paginatedRows.map((row, index) => (
                        <CustomTableRow<T>
                            key={index}
                            row={row}
                            columns={props.columns}
                            collapsableColumns={props.collapsableColumns?.filter(
                                (collapsableColumn) =>
                                    !collapsableColumn.isRowConcerned ||
                                    collapsableColumn.isRowConcerned(row)
                            )}
                            tableHasActions={hasActions}
                            break={md}
                            dense={props.dense}
                        />
                    ))}
                </TableBody>
            </Table>
            {props.paginable !== false && (
                <TablePagination
                    component="div"
                    rowsPerPageOptions={[10, 25, 50, 100]}
                    count={filteredRows.length}
                    rowsPerPage={pagination.rowsPerPage}
                    page={pagination.page}
                    onPageChange={(_: any, page: number) =>
                        setPagination({ ...pagination, page })
                    }
                    onRowsPerPageChange={(
                        event: React.ChangeEvent<HTMLInputElement>
                    ) =>
                        setPagination({
                            ...pagination,
                            rowsPerPage: Number(event.target.value),
                        })
                    }
                    labelRowsPerPage="Lignes par page"
                    labelDisplayedRows={({ from, to, count }) =>
                        `${from} à ${to} sur ${count}`
                    }
                />
            )}
        </TableContainer>
    );
}

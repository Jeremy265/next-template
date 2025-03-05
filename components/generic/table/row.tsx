import { getReactNodeText } from "@/lib/utils/object.utils";
import { formatDate } from "@/lib/utils/time.utils";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import {
    Collapse,
    IconButton,
    Table,
    TableBody,
    TableCell,
    TableRow,
    Tooltip,
    Typography,
} from "@mui/material";
import moment from "moment";
import { Fragment, isValidElement, useState } from "react";
import { TableColumnType } from "./column";
import CustomTable, { TableCollapsableColumn } from "./table";

export const getCellContentToString = <T,>(
    data: T,
    column: TableColumnType<T>
) => {
    const content = getCellContent(data, column) ?? "";
    return (
        isValidElement(content) ? getReactNodeText(content) : String(content)
    ).replace(/(<([^>]+)>)/gi, "");
};

export const getCellContent = <T,>(data: T, column: TableColumnType<T>) => {
    if (column.render) return column.render(data);
    const content = data[column.dataKey];
    if (content instanceof Date) return formatDate(moment(content));
    if (typeof content === "boolean") return content ? "Oui" : "Non";
    return content ? String(content) : "";
};

type Props<T> = {
    break: boolean;
    dense?: boolean;
    row: T;
    columns: TableColumnType<T>[];
    collapsableColumns?: TableCollapsableColumn<T>[];
    tableHasActions?: boolean;
};

export default function CustomTableRow<T>(props: Props<T>) {
    const [open, setOpen] = useState(false);
    const getActionCell = (data: T) => {
        if (!props.collapsableColumns?.length) {
            if (props.tableHasActions) return <TableCell></TableCell>;
            else return <></>;
        }
        return (
            <TableCell
                sx={{
                    position: "relative",
                    ...(props.break && { border: "none" }),
                }}>
                {Boolean(props.collapsableColumns?.length) && (
                    <span
                        style={{
                            position: "absolute",
                            top: "50%",
                            right: "50%",
                            transform: "translate(0, -50%)",
                        }}>
                        <Tooltip title="Déplier pour plus d'information">
                            <IconButton
                                size="small"
                                sx={{
                                    padding: 0,
                                }}
                                onClick={() => setOpen(!open)}>
                                {open ? (
                                    <KeyboardArrowUpIcon />
                                ) : (
                                    <KeyboardArrowDownIcon />
                                )}
                            </IconButton>
                        </Tooltip>
                    </span>
                )}
            </TableCell>
        );
    };

    const getCell = (data: T, column: TableColumnType<T>) => (
        <TableCell
            sx={{
                padding: props.dense ? "0" : "12px 16px",
                ...(props.break
                    ? {
                          maxWidth: `calc(100%/${
                              props.columns.length +
                              Number(props.tableHasActions)
                          })`,
                      }
                    : {}),
            }}>
            {getCellContent(data, column)}
        </TableCell>
    );

    return (
        <>
            <TableRow>
                {!props.break && getActionCell(props.row)}
                {props.break ? (
                    <TableCell colSpan={2}>
                        <Table>
                            <TableBody>
                                {props.columns.map((column, index) => (
                                    <TableRow key={index}>
                                        <TableCell
                                            sx={{
                                                border: "none",
                                                padding: 1,
                                            }}>
                                            <Typography color="text.secondary">
                                                {column.label}
                                            </Typography>
                                        </TableCell>
                                        {getCell(props.row, column)}
                                    </TableRow>
                                ))}
                                <TableRow>{getActionCell(props.row)}</TableRow>
                            </TableBody>
                        </Table>
                    </TableCell>
                ) : (
                    <>
                        {props.columns.map((column, index) => (
                            <Fragment key={index}>
                                {getCell(props.row, column)}
                            </Fragment>
                        ))}
                    </>
                )}
            </TableRow>
            {Boolean(props.collapsableColumns?.length) && (
                <TableRow>
                    <TableCell
                        style={{
                            paddingBottom: 0,
                            paddingTop: 0,
                            border: "none",
                        }}
                        colSpan={
                            props.columns.length + Number(props.tableHasActions)
                        }>
                        <Collapse in={open} timeout="auto" unmountOnExit>
                            <CustomTable
                                downloadable={false}
                                dense={props.dense}
                                paginable={false}
                                sortable={false}
                                columns={props.collapsableColumns!}
                                data={[props.row]}
                            />
                        </Collapse>
                    </TableCell>
                </TableRow>
            )}
        </>
    );
}

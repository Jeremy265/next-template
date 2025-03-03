import { TableCell, TableHead, TableRow } from "@mui/material";
import { ReactElement } from "react";
import Aligned from "../aligned";
import CustomTableColumn, { TableColumnType } from "./column";

type Props<T> = {
    break: boolean;
    columns: TableColumnType<T>[];
    dense?: boolean;
    action?: ReactElement;
};
export default function CustomTableHeader<T>(props: Props<T>) {
    const columns = props.columns
        .filter(
            (column) =>
                !props.break ||
                column.onFilterChange ||
                column.onFilterBlur ||
                column.onSort
        )
        .map((column, index) => (
            <TableCell
                key={index}
                sx={{
                    minWidth: `calc(100%/${props.columns.length})`,
                    padding: props.dense ? "0" : "4px 16px",
                }}>
                <CustomTableColumn {...column} />
            </TableCell>
        ));

    const action = props.action && (
        <TableCell
            sx={{
                minWidth: "75px",
            }}
            padding={props.dense ? "none" : "normal"}>
            {props.action}
        </TableCell>
    );

    return (
        <TableHead>
            {props.break ? (
                <Aligned col component="tr">
                    {action}
                    {columns}
                </Aligned>
            ) : (
                <TableRow>
                    {action}
                    {columns}
                </TableRow>
            )}
        </TableHead>
    );
}

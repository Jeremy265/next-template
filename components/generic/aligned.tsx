import { Stack } from "@mui/material";
import { ReactNode } from "react";

type ColProps = {
    col: boolean;
};

type RowProps = {
    noWrap: boolean;
    top: boolean;
    bottom: boolean;
};

type Props = {
    w: string;
    h: string;
    space: number;
    centered: boolean;
    spaced: boolean;
    children: ReactNode;
    component?: "tr";
} & ColProps &
    RowProps;

function Aligned(props: Partial<Props>) {
    return (
        <Stack
            {...(props.component ? { component: props.component } : {})}
            width={props.w ?? "100%"}
            height={props.h ?? undefined}
            direction={
                props.col
                    ? "column"
                    : props.noWrap
                    ? "row"
                    : { xs: "column", sm: "row" }
            }
            alignItems={
                props.col && !props.centered
                    ? undefined
                    : props.noWrap
                    ? props.top
                        ? "start"
                        : props.bottom
                        ? "bottom"
                        : "center"
                    : {
                          xs: props.centered ? "center" : undefined,
                          sm: props.top
                              ? "start"
                              : props.bottom
                              ? "bottom"
                              : "center",
                      }
            }
            justifyContent={
                props.centered
                    ? "center"
                    : props.spaced
                    ? "space-between"
                    : undefined
            }
            spacing={
                props.col
                    ? props.space ?? 1
                    : {
                          xs: props.space ?? 1,
                          sm: props.space ?? 1,
                      }
            }>
            {props.children}
        </Stack>
    );
}

export default Aligned;

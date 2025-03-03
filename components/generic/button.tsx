import { Button, Tooltip } from "@mui/material";
import { ReactElement, ReactNode } from "react";

type Props = {
    onClick?: () => void;
    className?: string;
    children?: ReactNode;
    icon?: ReactElement;
    iconPosition?: "start" | "end";
    tooltip?: string;
    disabled?: boolean;
    loading?: boolean;
    fullWidth?: boolean;
};
export default function CustomButton(props: Props) {
    return (
        <Tooltip title={props.tooltip}>
            <span style={{ cursor: "not-allowed" }}>
                <Button
                    fullWidth={props.fullWidth}
                    loading={props.loading}
                    loadingPosition={
                        !props.iconPosition || props.iconPosition === "start"
                            ? "start"
                            : "end"
                    }
                    component="label"
                    className={`button${
                        props.className ? ` ${props.className}` : ""
                    }`}
                    disabled={props.disabled}
                    onClick={props.onClick}
                    startIcon={
                        !props.iconPosition || props.iconPosition === "start"
                            ? props.icon
                            : null
                    }
                    endIcon={props.iconPosition === "end" ? props.icon : null}>
                    {props.children}
                </Button>
            </span>
        </Tooltip>
    );
}

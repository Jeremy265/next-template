import Aligned from "@/components/generic/aligned";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import EditIcon from "@mui/icons-material/Edit";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import { Typography } from "@mui/material";
import { ReactElement } from "react";

export const printWithIcon = (
    text: string | ReactElement,
    icon: ReactElement,
    iconPosition: "left" | "right" = "left"
) => (
    <Aligned noWrap>
        <span>
            {iconPosition === "left" ? (
                icon
            ) : typeof text === "string" ? (
                <Typography>{text}</Typography>
            ) : (
                text
            )}
        </span>
        <span>
            {iconPosition === "left" ? (
                typeof text === "string" ? (
                    <Typography>{text}</Typography>
                ) : (
                    text
                )
            ) : (
                icon
            )}
        </span>
    </Aligned>
);

export const errorIcon = <ErrorOutlineIcon color="error" />;
export const successIcon = <CheckCircleOutlineIcon color="success" />;
export const editIcon = <EditIcon />;

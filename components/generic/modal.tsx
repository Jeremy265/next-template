"use client";

import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import { Backdrop, Box, Fade, Modal, Tooltip, Typography } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import { ReactElement, ReactNode } from "react";
import Aligned from "./aligned";
import CustomDivider from "./divider";

interface Props {
    title: string | ReactElement;
    subtitle?: string | ReactElement;
    open: boolean;
    onClose: () => void;
    children?: ReactNode;
}

export default function CustomModal(props: Props) {
    return (
        <Modal
            open={props.open}
            sx={{
                marginTop: "2.5vh",
                overflow: "scroll",
                height: "95vh",
            }}
            onClose={props.onClose}
            closeAfterTransition
            slots={{ backdrop: Backdrop }}
            slotProps={{
                backdrop: {
                    timeout: 500,
                },
            }}>
            <Fade in={props.open}>
                <Box
                    sx={{
                        position: "absolute",
                        top: "10%",
                        left: "50%",
                        transform: "translate(-50%, -10%)",
                        width: "75%",
                        bgcolor: "background.paper",
                        boxShadow: 24,
                        borderRadius: 2,
                        p: 4,
                    }}>
                    <Aligned top noWrap spaced>
                        {typeof props.title === "string" ? (
                            <Typography variant="h5">{props.title}</Typography>
                        ) : (
                            props.title
                        )}
                        <Tooltip title="Close">
                            <IconButton edge="end" onClick={props.onClose}>
                                <CloseRoundedIcon />
                            </IconButton>
                        </Tooltip>
                    </Aligned>
                    <Typography color="text.secondary">
                        {props.subtitle}
                    </Typography>
                    <CustomDivider />
                    {props.children}
                </Box>
            </Fade>
        </Modal>
    );
}

"use client";

import CloseIcon from "@mui/icons-material/Close";
import MenuIcon from "@mui/icons-material/Menu";
import { IconButton, Menu } from "@mui/material";
import { MouseEvent, useState } from "react";
import AppNav from "./app.nav";

export default function NavMobile() {
    const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);

    const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };
    return (
        <>
            <IconButton onClick={handleClick}>
                {Boolean(anchorEl) ? <CloseIcon /> : <MenuIcon />}
            </IconButton>
            <Menu
                disableScrollLock={true}
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleClose}>
                <AppNav onChange={handleClose} />
            </Menu>
        </>
    );
}

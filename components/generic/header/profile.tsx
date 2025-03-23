"use client";

import { AuthContext } from "@/lib/contexts/auth.provider";
import { formatUrl } from "@/lib/utils/string.utils";
import { Avatar, IconButton, Menu, MenuItem, Tooltip } from "@mui/material";
import { useContext, useState } from "react";

export default function Profile() {
    const user = useContext(AuthContext).user!;
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    return (
        <>
            <Tooltip title={`${user.first_name} ${user.last_name}`}>
                <IconButton
                    sx={{ marginLeft: "8px", p: 0 }}
                    onClick={(event: React.MouseEvent<HTMLElement>) => {
                        setAnchorEl(event.currentTarget);
                    }}>
                    <Avatar src={formatUrl("logo.jpg")} />
                </IconButton>
            </Tooltip>
            <Menu
                anchorEl={anchorEl}
                open={open}
                onClose={() => {
                    setAnchorEl(null);
                }}>
                <MenuItem>
                    {user.first_name} {user.last_name}
                </MenuItem>
                <MenuItem>{user.mail}</MenuItem>
            </Menu>
        </>
    );
}

import { AuthContext } from "@/lib/contexts/auth.provider";
import { stringToBoolean } from "@/lib/utils/string.utils";
import { Avatar, IconButton, Menu, MenuItem, Tooltip } from "@mui/material";
import { useContext, useState } from "react";

export default function Profile() {
    const user = useContext(AuthContext).user!;
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    return (
        <>
            <Tooltip title={`${user.full_name}`}>
                <IconButton
                    sx={{ marginLeft: "8px", p: 0 }}
                    onClick={(event: React.MouseEvent<HTMLElement>) => {
                        setAnchorEl(event.currentTarget);
                    }}>
                    <Avatar
                        src={`https://app.roqs.basf.net/user_picture_api/image/${user.username}`}
                    />
                </IconButton>
            </Tooltip>
            <Menu
                anchorEl={anchorEl}
                open={open}
                onClose={() => {
                    setAnchorEl(null);
                }}>
                <MenuItem>{user.full_name}</MenuItem>
                <MenuItem>
                    {user.username}, {user.mail}
                    {user.phone ? `, ${user.phone}` : ""}
                </MenuItem>
                <MenuItem>
                    {user.company}, {user.region}, {user.country} (
                    {user.org_code})
                </MenuItem>
                <MenuItem>
                    {user.street}, {user.postal_code} {user.site}, {user.state}
                </MenuItem>
                <MenuItem>
                    {user.type === "contractor" ? "Prestataire " : ""}
                    {stringToBoolean(user.login_disabled) ? "Inactif" : "Actif"}
                </MenuItem>
            </Menu>
        </>
    );
}

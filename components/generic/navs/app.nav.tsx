"use client";
import { AuthContext } from "@/lib/contexts/auth.provider";
import { NavItem } from "@/lib/type";
import InventoryIcon from "@mui/icons-material/Inventory";
import { cloneElement, useContext } from "react";
import CustomNav from "./nav";

export const appRoutes: NavItem[] = [
    {
        label: "Accueil",
        title: "Accueil",
        icon: <InventoryIcon />,
        path: "/",
    },
];

export default function AppNav({ onChange }: { onChange?: () => void }) {
    const user = useContext(AuthContext).user;
    const routes = appRoutes.map((appRoute) => ({
        ...appRoute,
        subnav:
            appRoute.subnav &&
            cloneElement(appRoute.subnav as any, {
                onChange: onChange,
            }),
    }));
    return <CustomNav onChange={onChange} tabs={!user ? [] : routes} />;
}

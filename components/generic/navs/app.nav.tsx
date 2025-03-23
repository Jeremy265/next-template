"use client";
import { AuthContext } from "@/lib/contexts/auth.provider";
import { NavItem } from "@/lib/type";
import QueryStatsIcon from "@mui/icons-material/QueryStats";
import { cloneElement, useContext } from "react";
import CustomNav from "./nav";

export const appRoutes: NavItem[] = [
    {
        label: "Page label",
        title: "Page title",
        icon: <QueryStatsIcon />,
        path: "custom-path",
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

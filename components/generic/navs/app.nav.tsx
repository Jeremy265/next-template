"use client";
import { AuthContext } from "@/lib/contexts/auth.provider";
import { NavItem } from "@/lib/type";
import QueryStatsIcon from "@mui/icons-material/QueryStats";
import TravelExploreIcon from "@mui/icons-material/TravelExplore";
import { cloneElement, useContext } from "react";
import CustomNav from "./nav";

export const appRoutes: NavItem[] = [
    {
        label: "Requêter l'API",
        title: "Requêter l'API Météo France afin de récupérer les informations des stations et des données météos sur une période donnée.",
        icon: <QueryStatsIcon />,
        path: "request",
    },
    {
        label: "Chercher une station",
        title: "Rechercher les station proches d'un lieu, code postal ou coordonnées géographiques.",
        icon: <TravelExploreIcon />,
        path: "search",
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

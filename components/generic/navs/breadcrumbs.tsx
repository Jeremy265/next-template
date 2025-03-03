"use client";

import { NavItem } from "@/lib/type";
import { printWithIcon } from "@/lib/utils/icon.utils";
import { formatPathname, formatUrl } from "@/lib/utils/string.utils";
import ErrorIcon from "@mui/icons-material/Error";
import HomeIcon from "@mui/icons-material/Home";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { appRoutes } from "./app.nav";

const errorRoutes = [{ label: "Erreur", path: "errors", icon: <ErrorIcon /> }];

const routes = appRoutes.concat(errorRoutes);

export const getRouteByPathname = (pathname: string) =>
    routes.find((route) => `/${route.path}` === pathname);

export default function CustomBreadcrumbs() {
    const [workingWithRoutes, setWorkingWithRoutes] = useState<NavItem[]>([]);
    const currentPathname = formatPathname(usePathname());

    useEffect(() => {
        const routes = [];
        let workWithCurrentPathname = currentPathname.replaceAll(
            /[0-9]+\/?/g,
            ""
        );
        while (workWithCurrentPathname !== "") {
            const route = getRouteByPathname(workWithCurrentPathname);
            workWithCurrentPathname = workWithCurrentPathname.substring(
                0,
                workWithCurrentPathname.lastIndexOf("/")
            );
            if (!route) continue;
            routes.push(route);
        }
        setWorkingWithRoutes(routes);
    }, [currentPathname]);

    return (
        <Breadcrumbs sx={{ ["& ol"]: { justifyContent: "center" } }}>
            {[
                ...workingWithRoutes,
                { label: "Accueil", path: "/", icon: <HomeIcon /> },
            ]
                .reverse()
                .map((route, index) => (
                    <div key={index}>
                        {printWithIcon(
                            index === workingWithRoutes.length ? (
                                route.label
                            ) : (
                                <Link
                                    href={formatUrl(route.path)}
                                    style={{
                                        color: "grey",
                                    }}>
                                    {route.label}
                                </Link>
                            ),
                            route.icon ?? <></>
                        )}
                    </div>
                ))}
        </Breadcrumbs>
    );
}

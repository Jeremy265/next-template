"use client";

import { NavItem } from "@/lib/type";
import { formatPathname, formatUrl } from "@/lib/utils/string.utils";
import { Popover, Tab, Tabs, Tooltip } from "@mui/material";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ReactElement, useEffect, useState } from "react";

type Props = {
    tabs: NavItem[];
    onChange?: () => void;
};

export default function CustomNav(props: Props) {
    const pathname: string = formatPathname(usePathname());
    const [popover, setPopover] = useState<{
        subnav?: ReactElement;
        anchor?: HTMLButtonElement;
    }>({});

    const tabPositionByPathname = props.tabs.findIndex((tab: NavItem) =>
        pathname.startsWith(`/${tab.path}`)
    );

    const [tabPosition, setTabPosition] = useState(
        tabPositionByPathname >= 0 ? tabPositionByPathname : false
    );

    useEffect(
        () =>
            setTabPosition(
                tabPositionByPathname >= 0 ? tabPositionByPathname : false
            ),
        [tabPositionByPathname]
    );

    return (
        <>
            <Tabs
                value={tabPosition}
                variant="scrollable"
                scrollButtons="auto"
                allowScrollButtonsMobile>
                {props.tabs.map((tab, index) => (
                    <Tooltip key={index} title={tab.title}>
                        <Tab
                            sx={{ ":hover": { textDecoration: "underline" } }}
                            icon={tab.icon}
                            label={tab.label}
                            {...{
                                href: tab.subnav
                                    ? undefined
                                    : formatUrl(tab.path),
                            }}
                            LinkComponent={Link}
                            onClick={(event: any) => {
                                if (!tab.subnav) {
                                    props.onChange && props.onChange();
                                    return;
                                }
                                setPopover({
                                    subnav: tab.subnav,
                                    anchor: event.currentTarget,
                                });
                            }}
                        />
                    </Tooltip>
                ))}
            </Tabs>
            <Popover
                open={Boolean(popover.anchor)}
                onClick={() => setPopover({ ...popover, anchor: undefined })}
                anchorEl={popover.anchor}
                anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "left",
                }}>
                {popover.subnav}
            </Popover>
        </>
    );
}

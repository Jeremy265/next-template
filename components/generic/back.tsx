"use client";

import { formatUrl } from "@/lib/utils/string.utils";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import { useRouter } from "next/navigation";
import { ReactNode } from "react";
import CustomButton from "./button";

export default function Back({
    src,
    children,
}: {
    src?: string;
    children?: ReactNode;
}) {
    const router = useRouter();
    return (
        <CustomButton
            icon={<ChevronLeftIcon />}
            onClick={src ? () => router.push(formatUrl(src)) : router.back}>
            {children ?? "Retour"}
        </CustomButton>
    );
}

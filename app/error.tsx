"use client";

import CustomButton from "@/components/generic/button";
import ErrorComponent from "@/components/generic/error";
import { errorToString } from "@/lib/utils/errors.utils";
import RestartAltIcon from "@mui/icons-material/RestartAlt";

export default function Error({
    error,
    reset,
}: {
    error: Error & { digest?: string };
    reset: () => void;
}) {
    return (
        <>
            <CustomButton onClick={() => reset()} icon={<RestartAltIcon />}>
                Réessayer
            </CustomButton>
            <ErrorComponent subtitle={errorToString(error)} />
        </>
    );
}

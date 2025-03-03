import Aligned from "@/components/generic/aligned";
import { getAuthenticatedUser } from "@/lib/utils/users.utils";
import logo from "@/public/logo.jpg";
import { Box, Typography } from "@mui/material";
import { headers } from "next/headers";
import Image from "next/image";

export default async function Home() {
    const authenticatedUser = getAuthenticatedUser(await headers());

    return (
        <Aligned space={2}>
            <Image
                style={{ width: "auto", height: "100%" }}
                src={logo}
                alt="Logo"
                unoptimized
            />
            <Box>
                <Typography variant="h5">
                    {authenticatedUser?.full_name},
                </Typography>
                <Typography variant="h6">Interface API Météo France</Typography>
                <Typography textAlign="justify">
                    Cette application permet de communiquer avec l&apos;API
                    Météo France qui a cessé de fonctionner en octobre 2024.
                </Typography>
            </Box>
        </Aligned>
    );
}

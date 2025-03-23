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
                    {authenticatedUser?.first_name}{" "}
                    {authenticatedUser?.last_name},
                </Typography>
                <Typography variant="h6">Your app title</Typography>
                <Typography textAlign="justify">
                    Your app description
                </Typography>
            </Box>
        </Aligned>
    );
}

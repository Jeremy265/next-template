import Header from "@/components/generic/header/header";
import Helper from "@/components/generic/helper";
import CustomBreadcrumbs from "@/components/generic/navs/breadcrumbs";
import AuthProvider from "@/lib/contexts/auth.provider";
import { formatUrl } from "@/lib/utils/string.utils";
import { getAuthenticatedUser } from "@/lib/utils/users.utils";
import { Box, Container } from "@mui/material";
import { Metadata } from "next";
import { headers } from "next/headers";
import { ToastContainer } from "react-toastify";
import "./globals.css";

export const metadata: Metadata = {
    title: "Interface API Météo France",
    description: "Interface API Météo France",
};

export default async function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const authenticatedUser = getAuthenticatedUser(await headers());

    return (
        <html lang="fr">
            <link rel="icon" href={formatUrl("favicon.ico")} sizes="any" />
            <body>
                <ToastContainer position="top-center" newestOnTop draggable />
                <Helper />
                <AuthProvider user={authenticatedUser}>
                    <Header />
                    <Container maxWidth="xl">
                        <Box marginBottom="12px">
                            <CustomBreadcrumbs />
                        </Box>
                        {children}
                    </Container>
                </AuthProvider>
            </body>
        </html>
    );
}

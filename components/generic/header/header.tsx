import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Stack from "@mui/material/Stack";
import Toolbar from "@mui/material/Toolbar";
import AppNav from "../navs/app.nav";
import NavMobile from "../navs/mobile.nav";
import Login from "./login";
import Logo from "./logo";

export default async function Header() {
    return (
        <AppBar position="static" sx={{ marginBottom: "24px" }}>
            <Container sx={{ maxWidth: "100vw!important" }}>
                <Toolbar sx={{ height: "64px", width: "100%" }} disableGutters>
                    <Stack
                        style={{ height: "100%", width: "100%" }}
                        direction="row"
                        alignItems="center"
                        justifyContent="space-between">
                        <Stack
                            direction="row"
                            alignItems="center"
                            justifyContent="start"
                            sx={{
                                flexGrow: 1,
                                display: {
                                    xs: "none",
                                    md: "flex",
                                    height: "100%",
                                    width: "70%",
                                },
                            }}>
                            <Logo />
                            <AppNav />
                        </Stack>
                        <Box
                            sx={{
                                flexGrow: 1,
                                display: { xs: "flex", md: "none" },
                            }}>
                            <NavMobile />
                        </Box>
                        <Box
                            sx={{
                                flexGrow: 1,
                                display: {
                                    xs: "flex",
                                    md: "none",
                                    height: "100%",
                                    width: "auto",
                                },
                            }}>
                            <Logo />
                        </Box>
                        <Stack
                            direction="row"
                            alignItems="center"
                            justifyContent="end">
                            <Login />
                        </Stack>
                    </Stack>
                </Toolbar>
            </Container>
        </AppBar>
    );
}

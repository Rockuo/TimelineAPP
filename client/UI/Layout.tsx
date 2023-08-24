import * as React from "react";
import Toolbar from "@mui/material/Toolbar";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import IconButton from "@mui/material/IconButton";
import {AccountCircle} from "@mui/icons-material";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import AppBar from "@mui/material/AppBar/AppBar";

export interface LayoutProps {
    onTimelinesClick: () => void
}

export default function Layout({children, onTimelinesClick}: React.PropsWithChildren<LayoutProps>)
{
    return <>
        <AppBar>
            <Toolbar>
                <IconButton
                    size="large"
                    edge="start"
                    color="inherit"
                    aria-label="menu"
                    sx={{mr: 2}}
                >
                    <AccountCircle/>
                </IconButton>
                <Typography variant="h6" component="div" sx={{flexGrow: 1}} onClick={onTimelinesClick}>
                    Timeline
                </Typography>
                <Button color="inherit">Sync (todo)</Button>
            </Toolbar>
        </AppBar>
        <Box
            component="main"
            sx={{
                flexGrow: 1,
                height: '100vh',
                overflow: 'auto',
            }}
        >
            <Toolbar />
            <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
                {children}
            </Container>
        </Box>
    </>
}
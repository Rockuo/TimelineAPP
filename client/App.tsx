import * as React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import {Box} from "@mui/material";
import {createTheme, ThemeProvider} from "@mui/material/styles";
import Layout from "./UI/Layout";
import TimelinesList from "./features/timelines/TimelinesList";
import Timeline from "./features/timelines/Timeline";

const defaultTheme = createTheme(); // todo
export default function App(): React.JSX.Element
{

    return <ThemeProvider theme={defaultTheme}>
            <Box sx={{ display: 'flex' }}>
                <CssBaseline />
                <Layout onTimelinesClick={() => {/*todo*/}}>
                    <TimelinesList/>
                    <Timeline/>
                </Layout>
            </Box>
        </ThemeProvider>
    ;
}
import * as React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import {Box} from "@mui/material";
import {createTheme, ThemeProvider} from "@mui/material/styles";
import Layout from "./UI/Layout";
import TimelinesButton from "./features/timelines/TimelinesButton";
import {useAppDispatch} from "./app/hooks";
import {setCurrentPage} from "./features/pages/pagesSlice";
import Pages from "./features/pages/Pages";


//todo themming
const isDarkMode = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
const defaultTheme = createTheme(
    {
        palette: {
            mode: isDarkMode ? 'dark': 'light',
        }
    }
); // todo
export default function App(): React.JSX.Element
{
    const dispatch = useAppDispatch();
    return <ThemeProvider theme={defaultTheme}>
            <Box sx={{ display: 'flex' }}>
                <CssBaseline />
                <Layout
                    title={
                        <TimelinesButton
                            onClick={()=> {
                                dispatch(setCurrentPage('timelines'));
                            }}
                        />
                    }
                >
                    <Pages/>
                </Layout>
            </Box>
        </ThemeProvider>
    ;
}
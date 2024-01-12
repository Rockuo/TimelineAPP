import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

import { createRoot } from 'react-dom/client';
import * as React from "react";
import App from "./App";
import {store} from './app/store'
import { Provider } from 'react-redux'
import {LocalizationProvider} from "@mui/x-date-pickers";
import {AdapterLuxon} from "@mui/x-date-pickers/AdapterLuxon";

const domNode = document.getElementById('root');
const root = createRoot(domNode);


root.render(
    <Provider store={store}>
        <LocalizationProvider dateAdapter={AdapterLuxon}>
        <App/>
        </LocalizationProvider>
    </Provider>
);
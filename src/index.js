import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './app/App';
import {BrowserRouter} from "react-router-dom";
import {IconsProvider} from "./shared/lib/hooks/iconsContext";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <BrowserRouter>
        <IconsProvider>
            <App/>
        </IconsProvider>
    </BrowserRouter>
);

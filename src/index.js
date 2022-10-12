import React from "react";
import ReactDOM from 'react-dom/client';
import '@/index.css';
import reportWebVitals from "@/reportWebVitals";
import TestApp from "@/test";

const root = document.getElementById("root");

ReactDOM.createRoot(root).render(
    <React.StrictMode>
        <TestApp/>
    </React.StrictMode>
)

reportWebVitals();

import React from "react"
import ReactDOM from "react-dom/client"
import App from "./App.tsx"
import "./index.css"
import { BrowserRouter } from "react-router-dom"
import { AuthProvider } from "./contexts/AuthProvider"
import { CssBaseline } from "@mui/material"

ReactDOM.createRoot(document.getElementById("root")!).render(
    <React.StrictMode>
        <BrowserRouter>
            <AuthProvider>
                <CssBaseline />
                <App />
            </AuthProvider>
        </BrowserRouter>
    </React.StrictMode>
)

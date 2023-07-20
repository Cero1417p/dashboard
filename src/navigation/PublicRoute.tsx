import { useAuth } from "../contexts/AuthProvider"
import useLocalStorage from "../hooks/useLocalStorage"
import { ReactNode } from "react"
import { Navigate } from "react-router-dom"

export const PublicRoute = ({ children }: { children: ReactNode }) => {
    const { user } = useAuth()
    const [lastPath, _] = useLocalStorage("last-path", "/")
    if (user) return <Navigate to={lastPath} replace />
    return children
}

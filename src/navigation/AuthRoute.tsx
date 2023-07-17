import { Navigate, Outlet, useLocation } from "react-router-dom"
import { useAuth } from "../contexts/AuthProvider"

const AuthRoute = () => {
    const { user } = useAuth()
    const location = useLocation()

    console.log("user:", user)

    return user ? (
        <Outlet />
    ) : (
        <Navigate to={"/login"} replace state={{ path: location.pathname }} />
    )
}

export default AuthRoute

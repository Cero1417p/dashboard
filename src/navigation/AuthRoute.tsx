import { Navigate, Outlet, useLocation } from "react-router-dom"
import { useAuth } from "../contexts/AuthProvider"
import { useEffect } from "react"
import useLocalStorage from "../hooks/useLocalStorage"

const AuthRoute = () => {
    const { user } = useAuth()
    const location = useLocation()
    //const [_, setPath] = useLocalStorage("last-path", "")
    useEffect(() => {
        console.log("location: ", location)
        window.localStorage.setItem("last-path", location.pathname)
        //setPath(location.pathname)
    }, [location])

    return user ? (
        <Outlet />
    ) : (
        <Navigate to={"/login"} replace state={{ path: location.pathname }} />
    )
}
export default AuthRoute

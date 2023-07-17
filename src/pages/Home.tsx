import { Link } from "react-router-dom"
import { useAuth } from "../contexts/AuthProvider"
import { Button } from "@mui/material"
import { useEffect } from "react"

const Home = () => {
    const context = useAuth()
    const { user, signOut } = context

    useEffect(() => {
        console.log("cambio user:", user)
    }, [user])
    return (
        <>
            ruta / <Link to="login">login</Link>
            <hr></hr>
            <Button onClick={() => void signOut()}> Logout </Button>
            <pre>{JSON.stringify(user, null, 2)}</pre>
        </>
    )
}

export default Home

import { useAuth } from "../contexts/AuthProvider"
import { Button, Stack, Typography } from "@mui/material"
import { Link } from "react-router-dom"

const Home = () => {
    const context = useAuth()
    const { user, loading, signOut } = context

    return (
        <>
            <Stack direction="row" justifyContent="space-around" alignItems="center" spacing={2}>
                <Typography variant="h6">Home</Typography>
                <Link to="user">Gestión Usuarios</Link>
                <Link to="product">Gestión Productos</Link>
                <Button
                    disabled={loading}
                    variant="contained"
                    onClick={() => {
                        signOut && void signOut()
                    }}
                >
                    {loading ? "Loading..." : "SALIR"}
                </Button>
            </Stack>
            <hr></hr>
            <Typography variant="subtitle1">Current User</Typography>
            <Typography variant="subtitle2">
                <pre>{JSON.stringify(user, null, 2)}</pre>
            </Typography>
        </>
    )
}

export default Home

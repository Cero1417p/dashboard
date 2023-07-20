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
                <Link to="manage-user">Gestión Usuarios</Link>
                <Link to="manage-product">Gestión Productos</Link>
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
            <Typography variant="subtitle2">Current User</Typography>
            <pre>{JSON.stringify(user, null, 2)}</pre>
        </>
    )
}

export default Home

import { Button, Stack } from "@mui/material"
import { Link, Outlet } from "react-router-dom"

export default function ProductLayout() {
    return (
        <>
            <Stack direction="row" justifyContent="flex-start" alignItems="center" spacing={2}>
                <Button component={Link} variant="contained" to="new">
                    Nuevo
                </Button>
            </Stack>
            <Outlet />
        </>
    )
}

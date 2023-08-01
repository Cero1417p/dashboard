import ProductList from "./ProductList"
import { Button, Stack } from "@mui/material"
import { Link } from "react-router-dom"

const ProductManagement = () => {
    return (
        <>
            <Stack direction="row" justifyContent="flex-start" alignItems="center" spacing={2}>
                <Button component={Link} variant="contained" to="new">
                    Nuevo
                </Button>
            </Stack>
            <ProductList />
        </>
    )
}
export default ProductManagement

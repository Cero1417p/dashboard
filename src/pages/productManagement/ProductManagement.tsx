import { useEffect, useState } from "react"
import { supabase } from "../../supabase/client"
import { Typography } from "@mui/material"
import ProductList from "./ProductList"

const ProductManagement = () => {
    const [products, setProducts] = useState<any[]|[]>([])
    const fetchTodos = async () => {
        const { data, error } = await supabase
            .from("products")
            .select("*")
            .order("name", { ascending: true })
        console.log("data: ", data)
        if (error) console.log("error", error)
        else setProducts(data)
    }
    useEffect(() => {
        void fetchTodos()
    }, [])
    return (
        <>
            <Typography variant="h6">Lista de Productos</Typography>
            {products.map((u, i) => {
                return <pre key={i}>{JSON.stringify(u, null, 2)}</pre>
            })}
            <ProductList/>
        </>
    )
}
export default ProductManagement
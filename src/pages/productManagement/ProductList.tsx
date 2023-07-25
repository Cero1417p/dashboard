import { useEffect, useState } from "react"
import { supabase } from "../../supabase/client"
import BasicTable from "../../components/Table/BasicTable"
import EditOutlinedIcon from "@mui/icons-material/EditOutlined"
import DeleteForeverOutlinedIcon from "@mui/icons-material/DeleteForeverOutlined"
import { IconButton, Typography } from "@mui/material"
import SuspenseLoader from "../../components/SuspenseLoader"
import { useNavigate } from "react-router-dom"

const ProductList = () => {
    const navigate = useNavigate()
    const [products, setProducts] = useState<any[] | []>([])
    const [loading, setLoading] = useState(false)
    const actions = [
        {
            item: (
                <IconButton aria-label="edit" color="primary">
                    <EditOutlinedIcon />
                </IconButton>
            ),
            action: (a: any) => {
                console.log("when edit redirect to /manage-product/:id : ", a)
                navigate("/product/" + a.id)
            }
        },
        {
            item: (
                <IconButton aria-label="delete" color="error">
                    <DeleteForeverOutlinedIcon />
                </IconButton>
            ),
            action: (a: any) => {
                console.log("when delete validate yes/no: ", a)
            }
        }
    ]
    const fetchProducts = async () => {
        setLoading(false)
        const { data, error } = await supabase
            .from("products")
            .select("*")
            .order("name", { ascending: true })
        if (error) console.log("error", error)
        else setProducts(data)
        setLoading(true)
    }
    useEffect(() => {
        void fetchProducts()
    }, [])

    if (loading === false) return <SuspenseLoader />

    return (
        <>
            <Typography variant="h6">Lista de Productos</Typography>
            <div style={{ height: 400, width: "100%" }}>
                <BasicTable data={products} actions={actions} size="small" />
            </div>
        </>
    )
}
export default ProductList

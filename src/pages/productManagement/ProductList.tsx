import { useEffect, useState } from "react"
import { supabase } from "../../supabase/client"
import BasicTable from "../../components/Table/BasicTable"
import EditOutlinedIcon from "@mui/icons-material/EditOutlined"
import DeleteForeverOutlinedIcon from "@mui/icons-material/DeleteForeverOutlined"
import VisibilityIcon from "@mui/icons-material/Visibility"
import { IconButton, Typography } from "@mui/material"
import SuspenseLoader from "../../components/SuspenseLoader"
import { useNavigate } from "react-router-dom"
import Swal from "sweetalert2"

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
                navigate("/product/" + a.id + "/edit")
            }
        },
        {
            item: (
                <IconButton aria-label="detail" color="secondary">
                    <VisibilityIcon />
                </IconButton>
            ),
            action: (a: any) => {
                navigate("/product/" + a.id + "/detail")
            }
        },
        {
            item: (
                <IconButton aria-label="delete" color="error">
                    <DeleteForeverOutlinedIcon />
                </IconButton>
            ),
            action: (a: any) => {
                void deleteProduct(a.id)
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

    const deleteProduct = async (id: string) => {
        setLoading(false)
        const { count, statusText, data, status, error } = await supabase
            .from("products")
            .delete()
            .eq("id", id)
        console.log("status: ", status)
        console.log("statusText: ", statusText)
        console.log("count: ", count)
        console.log("data: ", data)
        if (status === 204) {
            void Swal.fire({
                position: "top-end",
                icon: "success",
                title: "Producto eliminado correctamente",
                showConfirmButton: false,
                timer: 1500
            })
        }
        if (error) {
            void Swal.fire({
                position: "top-end",
                icon: "error",
                title: "Error",
                text: error.message,
                showConfirmButton: false,
                timer: 1500
            })
        }
        void fetchProducts()
    }

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

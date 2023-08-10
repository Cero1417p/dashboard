import Inventory2OutlinedIcon from "@mui/icons-material/Inventory2Outlined"
import {
    Avatar,
    Box,
    Button,
    Container,
    createTheme,
    Grid,
    TextField,
    ThemeProvider,
    Typography
} from "@mui/material"
import * as Yup from "yup"
import { useFormik } from "formik"
import { useNavigate, useParams } from "react-router-dom"
import { supabase } from "../../supabase/client"
import { useEffect, useState } from "react"
import SuspenseLoader from "../../components/SuspenseLoader"
import Swal from "sweetalert2"

interface Item {
    id: number
    created_at: string
    name: string
}
const defaultTheme = createTheme()
const validationSchema = Yup.object({
    name: Yup.string()
        .max(30, "El nombre no debe ser mayor a 30 caracteres")
        .required("nombre es requerido")
})
const ProductForm = ({ action }: { action: "EDIT" | "CREATE" | "DETAIL" }) => {
    const titleAction = action === "EDIT" ? "Editar" : action === "CREATE" ? "Crear" : "Detalle"
    const navigate = useNavigate()
    const { id } = useParams()
    const [item, setItem] = useState<Item | undefined>()
    const [loading, setLoading] = useState(true)

    const formik = useFormik({
        initialValues: {
            name: (item?.name as string) ?? ""
        },
        enableReinitialize: true,
        validationSchema,
        onSubmit: (values) => {
            console.log("values: ", values)
            void actionProduct(values.name)
        }
    })

    const fetchProduct = async () => {
        setLoading(true)
        const { data, error } = await supabase.from("products").select("*").eq("id", id).single()
        if (error) {
            void Swal.fire({
                position: "top-end",
                icon: "error",
                title: "Error",
                text: error.message,
                showConfirmButton: false,
                timer: 1500
            })
            navigate("/product")
        } else setItem(data as Item)
        setLoading(false)
    }
    const actionProduct = async (name: string) => {
        setLoading(true)
        const { error } = await supabase.from("products").upsert({ id, name }).select()
        if (error) {
            console.error("error", error)
            void Swal.fire({
                position: "top-end",
                icon: "error",
                title: "Error",
                text: error.message,
                showConfirmButton: false,
                timer: 1500
            })
        }
        setLoading(false)
        void Swal.fire({
            position: "top-end",
            icon: "success",
            title:
                action === "CREATE"
                    ? "Producto creado correctamente"
                    : "Producto editado correctamente",
            showConfirmButton: false,
            timer: 1500
        })
        navigate("/product")
    }
    useEffect(() => {
        console.log("id: ", id)
        console.log("action: ", action)
        if (id !== undefined || action !== "CREATE") {
            void fetchProduct()
        } else {
            setLoading(false)
        }
    }, [id])

    if (loading) return <SuspenseLoader />

    return (
        <ThemeProvider theme={defaultTheme}>
            <Container component="main" maxWidth="xs">
                <Box
                    sx={{
                        marginTop: 8,
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center"
                    }}
                >
                    <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
                        <Inventory2OutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        {titleAction}
                    </Typography>
                    <Box component="form" noValidate onSubmit={formik.handleSubmit} sx={{ mt: 3 }}>
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <TextField
                                    disabled
                                    fullWidth
                                    id="id"
                                    label="ID"
                                    name="id"
                                    value={item?.id ?? ""}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    disabled
                                    fullWidth
                                    id="createAt"
                                    label="Fecha de creación"
                                    name="createAt"
                                    value={item?.created_at ?? ""}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    disabled={action === "DETAIL"}
                                    autoComplete="given-name"
                                    name="name"
                                    required
                                    fullWidth
                                    id="name"
                                    label="Nombres"
                                    autoFocus
                                    value={formik.values.name}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    error={formik.touched.name && Boolean(formik.errors.name)}
                                    helperText={formik.touched.name && formik.errors.name}
                                />
                            </Grid>
                        </Grid>
                        {action !== "DETAIL" && (
                            <Button
                                disabled={loading}
                                type="submit"
                                fullWidth
                                variant="contained"
                                sx={{ mt: 3, mb: 2 }}
                            >
                                {loading ? "Cargando..." : titleAction}
                            </Button>
                        )}
                    </Box>
                </Box>
            </Container>
        </ThemeProvider>
    )
}
export default ProductForm

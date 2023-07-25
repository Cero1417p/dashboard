import Inventory2OutlinedIcon from '@mui/icons-material/Inventory2Outlined';
import {
    Avatar,
    Box,
    Button,
    Container,
    createTheme,
    CssBaseline,
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
import Swal from 'sweetalert2'

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
const ProductForm = () => {
    const navigate = useNavigate()
    const {id} = useParams()
    const [item, setItem] = useState<Item|undefined>()
    const [loading, setLoading] = useState(true)
    // get by id
    const [title,setTitle]=useState("Crear Nuevo")

    const formik = useFormik({
        initialValues: {
            name: (item?.name as string) ?? ""
        },
        enableReinitialize: true,
        validationSchema,
        onSubmit: (values) => {
            //  :action
            //  CREAR / EDITAR

            console.log("values: ", values)
            void editProduct(values.name)
            //signInWithEmail && void signInWithEmail(values.email, values.password)
        }
    })

    const fetchProduct = async () => {
        setLoading(true)
        const { data, error } = await supabase
            .from("products")
            .select("*")
            .eq("id", id)
            .single()
        if (error) {
            console.error("error", error)
            navigate("/product")
        } else setItem(data as Item)
        console.log("data: ", data)
        setLoading(false)
    }
    const editProduct = async (name:string) => {
        setLoading(true)
        const {  error } =  await supabase
        .from('products')
        .upsert({ id, name })
        .select()
        if (error) {
            console.error("error", error)
            Swal.fire({
                position: 'top-end',
                icon: 'error',
                title: "Error",
                text:error.message,
                showConfirmButton: false,
                timer: 1500
              })
        }
        setLoading(false)
        Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'Producto editado correctamente',
            showConfirmButton: false,
            timer: 1500
          })
        navigate("/product")
    }
    useEffect(() => {
        if( id === "new"){
            setItem(undefined)
            setLoading(false)
        }else{
            setTitle("Editar Producto")
            void fetchProduct()
        }
    }, [])

    if (loading) return <SuspenseLoader />

    return (
        <ThemeProvider theme={defaultTheme}>
            <Container component="main" maxWidth="xs">
                <CssBaseline />
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
                        {title}
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
                        <Button
                            disabled={loading}
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                        >
                            {loading ? "Cargando..." : "Editar"}
                        </Button>
                    </Box>
                </Box>
            </Container>
        </ThemeProvider>
    )
}
export default ProductForm

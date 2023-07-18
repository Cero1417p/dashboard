import LockOutlinedIcon from "@mui/icons-material/LockOutlined"
import {
    Avatar,
    Box,
    Button,
    Container,
    createTheme,
    CssBaseline,
    Grid,
    Link,
    TextField,
    ThemeProvider,
    Typography
} from "@mui/material"
import Copyright from "../components/Copyright/Copyright"
import * as Yup from "yup"
import { useFormik } from "formik"
import { useAuth } from "../contexts/AuthProvider"
const defaultTheme = createTheme()
const validationSchema = Yup.object({
    firstName: Yup.string()
        .max(20, "El nombre no debe ser mayor a 20 caracteres")
        .required("Nombre es requerido"),
    lastName: Yup.string()
        .max(30, "El apellido no debe ser mayor a 30 caracteres")
        .required("Apellido es requerido"),
    email: Yup.string()
        .email("Ingrese un correo electrónico válido")
        .required("El correo electrónico es requerido"),
    password: Yup.string().required("La contraseña es requerida"),
    comparePassword: Yup.string()
        .oneOf([Yup.ref("password")], "Las contraseñas no coinciden")
        .required("Campo requerido")
})
const Register = () => {
    const { loading, signUp } = useAuth()
    const formik = useFormik({
        initialValues: {
            firstName: "",
            lastName: "",
            email: "",
            password: "",
            comparePassword: ""
        },
        validationSchema,
        onSubmit: (values) => {
            //
            console.log("values: ", values)
            signUp &&
                void signUp(values.email, values.password, {
                    firstName: values.firstName,
                    lastName: values.lastName
                })
            //signInWithEmail && void signInWithEmail(values.email, values.password)
        }
    })
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
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Registro de Usuario
                    </Typography>
                    <Box component="form" noValidate onSubmit={formik.handleSubmit} sx={{ mt: 3 }}>
                        <Grid container spacing={2}>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    autoComplete="given-name"
                                    name="firstName"
                                    required
                                    fullWidth
                                    id="firstName"
                                    label="Nombres"
                                    autoFocus
                                    value={formik.values.firstName}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    error={
                                        formik.touched.firstName && Boolean(formik.errors.firstName)
                                    }
                                    helperText={formik.touched.firstName && formik.errors.firstName}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    required
                                    fullWidth
                                    id="lastName"
                                    label="Apellidos"
                                    name="lastName"
                                    autoComplete="family-name"
                                    value={formik.values.lastName}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    error={
                                        formik.touched.lastName && Boolean(formik.errors.lastName)
                                    }
                                    helperText={formik.touched.lastName && formik.errors.lastName}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    id="email"
                                    label="Dirección Email"
                                    name="email"
                                    autoComplete="email"
                                    value={formik.values.email}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    error={formik.touched.email && Boolean(formik.errors.email)}
                                    helperText={formik.touched.email && formik.errors.email}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    name="password"
                                    label="Password"
                                    type="password"
                                    id="password"
                                    autoComplete="new-password"
                                    value={formik.values.password}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    error={
                                        formik.touched.password && Boolean(formik.errors.password)
                                    }
                                    helperText={formik.touched.password && formik.errors.password}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    name="comparePassword"
                                    label="Compare Password"
                                    type="password"
                                    id="comparePassword"
                                    autoComplete="new-password"
                                    value={formik.values.comparePassword}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    error={
                                        formik.touched.comparePassword &&
                                        Boolean(formik.errors.comparePassword)
                                    }
                                    helperText={
                                        formik.touched.comparePassword &&
                                        formik.errors.comparePassword
                                    }
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
                            {loading ? "Cargando..." : "Agregar Nuevo"}
                        </Button>
                        <Grid container justifyContent="flex-end">
                            <Grid item>
                                <Link href="#" variant="body2">
                                    Already have an account? Sign in
                                </Link>
                            </Grid>
                        </Grid>
                    </Box>
                </Box>
                <Copyright sx={{ mt: 5 }} />
            </Container>
        </ThemeProvider>
    )
}
export default Register

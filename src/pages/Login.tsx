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
import { useEffect } from "react"
import * as Yup from "yup"
import { useFormik } from "formik"
import { useAuth } from "../contexts/AuthProvider"
import { useNavigate } from "react-router-dom"
import Copyright from "../components/Copyright/Copyright"

const defaultTheme = createTheme()
const validationSchema = Yup.object({
    email: Yup.string()
        .email("Ingrese un correo electrónico válido")
        .required("El correo electrónico es requerido"),
    password: Yup.string().required("La contraseña es requerida")
})
const Login = () => {
    const { user, loading, signInWithEmail } = useAuth()
    const navigate = useNavigate()
    const lastPath = window.localStorage.getItem("last-path") || "/"

    const formik = useFormik({
        initialValues: {
            email: "",
            password: ""
        },
        validationSchema,
        onSubmit: (values) => {
            //
            signInWithEmail && void signInWithEmail(values.email, values.password)
        }
    })

    useEffect(() => {
        if (user) {
            navigate(lastPath)
        }
        console.log("called")
    }, [user])
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
                        Ingreso
                    </Typography>
                    <Box component="form" onSubmit={formik.handleSubmit} noValidate sx={{ mt: 1 }}>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="email"
                            label="Usuario"
                            name="email"
                            autoComplete="email"
                            autoFocus
                            value={formik.values.email}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={formik.touched.email && Boolean(formik.errors.email)}
                            helperText={formik.touched.email && formik.errors.email}
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            name="password"
                            label="Password"
                            type="password"
                            id="password"
                            autoComplete="current-password"
                            value={formik.values.password}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={formik.touched.password && Boolean(formik.errors.password)}
                            helperText={formik.touched.password && formik.errors.password}
                        />

                        <Button
                            disabled={loading}
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                        >
                            {loading ? "Loading..." : "Login"}
                        </Button>
                        <Grid container>
                            <Grid item xs>
                                <Link href="#" variant="body2">
                                    Olvide mi contraseña
                                </Link>
                            </Grid>
                            <Grid item></Grid>
                        </Grid>
                    </Box>
                </Box>
                <Copyright sx={{ mt: 8, mb: 4 }} />
            </Container>
        </ThemeProvider>
    )
}
export default Login

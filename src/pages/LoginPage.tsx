import LockOutlinedIcon from "@mui/icons-material/LockOutlined"
import {
    Avatar,
    Box,
    Button,
    Checkbox,
    Container,
    createTheme,
    CssBaseline,
    FormControlLabel,
    Grid,
    Link,
    TextField,
    ThemeProvider,
    Typography,
    TypographyProps
} from "@mui/material"
import { FC, useEffect } from "react"
import * as Yup from "yup"
import { useFormik } from "formik"
import { useAuth } from "../contexts/AuthProvider"
import { useNavigate } from "react-router-dom"

interface CopyrightProps extends TypographyProps {
    website?: string
}
const Copyright: FC<CopyrightProps> = ({ website = "#", ...typographyProps }) => {
    return (
        <Typography variant="body2" color="text.secondary" align="center" {...typographyProps}>
            {"Copyright © "}
            <Link color="inherit" href={website}>
                Your Website
            </Link>
            {new Date().getFullYear()}
            {"."}
        </Typography>
    )
}
const defaultTheme = createTheme()
const validationSchema = Yup.object({
    email: Yup.string()
        .email("Ingrese un correo electrónico válido")
        .required("El correo electrónico es requerido"),
    password: Yup.string().required("La contraseña es requerida")
})
const LoginPage = () => {
    const { user, signInWithEmail } = useAuth()
    const navigate = useNavigate()

    const formik = useFormik({
        initialValues: {
            email: "",
            password: ""
        },
        validationSchema,
        onSubmit: (values) => {
            //
            void signInWithEmail(values.email, values.password)
        }
    })

    useEffect(() => {
        console.log("cambio user:", user)
    }, [user])
    useEffect(() => {
        if (user) {
            navigate("/")
        }
        console.log("called")
    }, [navigate])
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
                        Sign in
                    </Typography>
                    <Box component="form" onSubmit={formik.handleSubmit} noValidate sx={{ mt: 1 }}>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="email"
                            label="Email Address"
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
                        <FormControlLabel
                            control={<Checkbox value="remember" color="primary" />}
                            label="Remember me"
                        />
                        <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
                            Sign In
                        </Button>
                        <Grid container>
                            <Grid item xs>
                                <Link href="#" variant="body2">
                                    Forgot password?
                                </Link>
                            </Grid>
                            <Grid item>
                                <Link href="#" variant="body2">
                                    {"Don't have an account? Sign Up"}
                                </Link>
                            </Grid>
                        </Grid>
                    </Box>
                </Box>
                <Copyright sx={{ mt: 8, mb: 4 }} />
            </Container>
            <pre>{JSON.stringify(user, null, 2)}</pre>
        </ThemeProvider>
    )
}
export default LoginPage

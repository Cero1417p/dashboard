import { Suspense, lazy, ComponentType } from "react"
import { RouteObject } from "react-router"
import SuspenseLoader from "./components/SuspenseLoader"
import { Link } from "react-router-dom"

interface LoaderProps {
    [key: string]: any
}

const Loader =
    <P extends LoaderProps>(Component: ComponentType<P>) =>
    (props: P) => (
        <Suspense fallback={<SuspenseLoader />}>
            <Component {...props} />
        </Suspense>
    )

const LoginPage = Loader(lazy(() => import("./pages/LoginPage")))

const routes: RouteObject[] = [
    {
        path: "/",
        element: (
            <>
                ruta / <Link to="login">login</Link>{" "}
            </>
        )
    },
    {
        path: "login",
        element: <LoginPage />
    }
]
export default routes

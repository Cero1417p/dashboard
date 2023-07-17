import { Suspense, lazy, ComponentType } from "react"
import { RouteObject } from "react-router"
import SuspenseLoader from "./components/SuspenseLoader"
import Home from "./pages/Home"
import AuthRoute from "./navigation/AuthRoute"

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
        element: <AuthRoute />,
        children: [
            {
                path: "/",
                element: <Home />
            },
            {
                path: "/home",
                element: <h1>HOME</h1>
            }
        ]
    },
    {
        path: "login",
        element: <LoginPage />
    }
]
export default routes

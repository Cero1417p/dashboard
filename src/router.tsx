import { Suspense, lazy, ComponentType } from "react"
import { RouteObject } from "react-router"
import SuspenseLoader from "./components/SuspenseLoader"
import Home from "./pages/Home"
import AuthRoute from "./navigation/AuthRoute"
import Register from "./pages/Register"
import UserManagement from "./pages/UserManagement"

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

const LoginPage = Loader(lazy(() => import("./pages/Login")))

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
            },
            {
                path: "manage-user",
                element: <UserManagement />
            }
        ]
    },
    {
        path: "login",
        element: <LoginPage />
    },
    { path: "register", element: <Register /> }
]
export default routes

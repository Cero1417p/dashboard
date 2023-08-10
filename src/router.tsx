import { Suspense, lazy, ComponentType } from "react"
import { RouteObject } from "react-router"
import SuspenseLoader from "./components/SuspenseLoader"
import Home from "./pages/Home"
import AuthRoute from "./navigation/AuthRoute"
import Register from "./pages/Register"
import UserManagement from "./pages/userManagement/UserManagement"
import ProductManagement from "./pages/productManagement/ProductManagement"
import ProductForm from "./pages/productManagement/ProductForm"
import ProductLayout from "./pages/productManagement/ProductLayout"

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
                path: "home",
                element: <h1>HOME</h1>
            },
            {
                path: "user",
                element: <UserManagement />
            },
            {
                path: "product",
                element: <ProductLayout />,
                children: [
                    { path: "/product", element: <ProductManagement /> },
                    {
                        path: ":id/detail",
                        element: <ProductForm action="DETAIL" />
                    },
                    {
                        path: ":id/edit",
                        element: <ProductForm action="EDIT" />
                    },
                    {
                        path: "new",
                        element: <ProductForm action="CREATE" />
                    }
                ]
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

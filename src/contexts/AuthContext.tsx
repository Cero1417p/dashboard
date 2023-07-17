import { createContext, ReactNode, useContext, useState } from "react"
import { supabase } from "../supabase/client"
import { Session, User } from "@supabase/supabase-js"

interface IData {
    user: User | null
    session: Session | null
}
interface Context {
    loading: boolean
    data: IData | undefined
    signInWithEmail: (email: string, password: string) => Promise<void>
    signOut: () => Promise<void>
}
export const AuthContext = createContext<Context | null>(null)
export const useAuth = () => {
    const context = useContext(AuthContext)
    if (context === undefined) {
        throw new Error("useAuth must be used within a AuthProvider")
    }
    return context
}
export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [data, setData] = useState<IData | undefined>()
    const [loading, setLoading] = useState(false)
    const signInWithEmail = async (email: string, password: string) => {
        setLoading(true)
        try {
            const { data: dat, error } = await supabase.auth.signInWithPassword({
                email,
                password
            })
            if (error) {
                throw error
            }
            setData({ user: dat.user, session: dat.session })
            alert("INGRESO CORRECTO: ")
        } catch (error) {
            alert((error as Error).message)
        } finally {
            setLoading(false)
        }
    }
    const signOut = async () => {
        try {
            const { error } = await supabase.auth.signOut()
            if (error) {
                throw error
            }
            alert("SALIO de cuenta")
        } catch (error) {
            alert((error as Error).message)
        } finally {
            setLoading(false)
        }
    }
    return (
        <AuthContext.Provider value={{ loading, data, signInWithEmail, signOut }}>
            {children}
        </AuthContext.Provider>
    )
}

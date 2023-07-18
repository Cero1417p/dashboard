import { createContext, ReactNode, useContext, useEffect, useState } from "react"
import { supabase } from "../supabase/client"
import { User } from "@supabase/supabase-js"

interface IMetadata {
    firstName: string
    lastName: string
}
interface IContext {
    loading: boolean
    user: User | undefined | null
    signInWithEmail: ((email: string, password: string) => Promise<void>) | null
    signOut: (() => Promise<void>) | null
    signUp: ((email: string, password: string, metadata: IMetadata) => Promise<void>) | null
}
const defaultContext: IContext = {
    loading: false,
    user: null,
    signInWithEmail: null,
    signOut: null,
    signUp: null
}
export const AuthContext = createContext<IContext>(defaultContext)
export const useAuth = () => {
    const context = useContext(AuthContext)
    if (context === undefined) {
        throw new Error("useAuth must be used within a AuthProvider")
    }
    return context
}

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useState<User | undefined | null>(null)
    const [loading, setLoading] = useState(false)
    const signInWithEmail = async (email: string, password: string) => {
        setLoading(true)
        try {
            const { error } = await supabase.auth.signInWithPassword({
                email,
                password
            })
            if (error) {
                throw error
            }
            alert("INGRESO CORRECTO: ")
        } catch (error) {
            alert((error as Error).message)
        } finally {
            setLoading(false)
        }
    }
    const signOut = async () => {
        setLoading(true)
        try {
            const { error } = await supabase.auth.signOut()
            if (error) {
                throw error
            }
            setUser(null)
            alert("SALIO DE SU CUENTA")
        } catch (error) {
            alert((error as Error).message)
        } finally {
            setLoading(false)
        }
    }
    const signUp = async (email: string, password: string, metadata: IMetadata) => {
        setLoading(true)
        try {
            const { error } = await supabase.auth.signUp({
                email,
                password,
                options: { data: metadata }
            })
            if (error) {
                throw error
            }
            alert(`Usuario creado correctamente`)
        } catch (error) {
            alert((error as Error).message)
        } finally {
            setLoading(false)
        }
    }
    useEffect(() => {
        const { data } = supabase.auth.onAuthStateChange((event, session) => {
            console.log("session: ", session)
            console.log("event: ", event)
            if (event === "INITIAL_SESSION" || event === "SIGNED_IN") {
                setUser(session?.user)
            }
        })
        return () => {
            data.subscription.unsubscribe()
        }
    }, [])
    return (
        <AuthContext.Provider value={{ user, loading, signInWithEmail, signOut, signUp }}>
            {children}
        </AuthContext.Provider>
    )
}

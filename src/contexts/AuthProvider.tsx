import { createContext, ReactNode, useContext, useEffect, useState } from "react"
import { supabase } from "../supabase/client"
import { User } from "@supabase/supabase-js"

interface Context {
    loading: boolean
    user: User | undefined | null
    signInWithEmail: (email: string, password: string) => Promise<void>
    signOut: () => Promise<void>
}
const defaultContext: Context = {
    loading: false,
    user: null,
    signInWithEmail: async (email: string, password: string): Promise<void> => {},
    signOut: async (): Promise<void> => {}
}
export const AuthContext = createContext<Context>(defaultContext)
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
        try {
            const { error } = await supabase.auth.signOut()
            if (error) {
                throw error
            }
            setUser(null)
            alert("SALIO de cuenta")
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
            if (event === "INITIAL_SESSION") {
                setUser(session?.user)
            }
        })
        return () => {
            data.subscription.unsubscribe()
        }
    }, [])
    return (
        <AuthContext.Provider value={{ user, loading, signInWithEmail, signOut }}>
            {children}
        </AuthContext.Provider>
    )
}

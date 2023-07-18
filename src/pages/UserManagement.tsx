import { supabase } from "../supabase/client"
import { useEffect, useState } from "react"
import { Typography } from "@mui/material"

const UserManagement = () => {
    const [users, setUsers] = useState([])
    const fetchTodos = async () => {
        const { data, error } = await supabase
            .from("users")
            .select("*")
            .order("id", { ascending: false })
        console.log("data: ", data)
        if (error) console.log("error", error)
        else setUsers(data)
    }
    useEffect(() => {
        void fetchTodos()
    }, [])
    return (
        <>
            <Typography variant="h6">Lista de Usuarios</Typography>
            {users.map((u, i) => {
                return <pre key={i}>{JSON.stringify(u, null, 2)}</pre>
            })}
        </>
    )
}
export default UserManagement

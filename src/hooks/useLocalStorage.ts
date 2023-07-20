import { Dispatch, SetStateAction, useEffect, useState } from "react"
const useLocalStorage = <T>(key: string, initialValue: T): [T, Dispatch<SetStateAction<T>>] => {
    const [storedValue, setStoredValue] = useState<T>(() => {
        try {
            const item = window.localStorage.getItem(key)
            if (!item) {
                window.localStorage.setItem(
                    key,
                    JSON.stringify(initialValue, (_, value: unknown) => {
                        if (typeof value === "bigint") return value.toString()
                        return value
                    })
                )
            }
            return item
                ? typeof initialValue === "bigint"
                    ? BigInt(JSON.parse(item))
                    : JSON.parse(item)
                : initialValue
        } catch (error) {
            return initialValue
        }
    })
    useEffect(() => {
        try {
            const item = JSON.stringify(storedValue, (_, value: unknown) => {
                if (typeof value === "bigint") return value.toString()
                return value
            })
            window.localStorage.setItem(key, item)
        } catch (error) {
            console.log(error)
        }
    }, [storedValue])

    return [storedValue, setStoredValue]
}
export default useLocalStorage

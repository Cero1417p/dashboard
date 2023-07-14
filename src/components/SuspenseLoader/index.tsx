import { useEffect, useState } from "react"
import { Box, CircularProgress } from "@mui/material"

function SuspenseLoader() {
    const [showLoader, setShowLoader] = useState(false)

    useEffect(() => {
        const loaderTimeout = setTimeout(() => {
            setShowLoader(true)
        }, 300) // Simulate a delay of 300 milliseconds

        return () => {
            clearTimeout(loaderTimeout)
        }
    }, [])

    if (showLoader) {
        return (
            <Box
                sx={{
                    position: "fixed",
                    left: 0,
                    top: 0,
                    width: "100%",
                    height: "100%"
                }}
                display="flex"
                alignItems="center"
                justifyContent="center"
            >
                <CircularProgress size={64} disableShrink thickness={3} />
            </Box>
        )
    }
    // Render your actual content here
    return null
}

export default SuspenseLoader

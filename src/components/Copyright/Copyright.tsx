import { Link, Typography, TypographyProps } from "@mui/material"
import { FC } from "react"

interface CopyrightProps extends TypographyProps {
    website?: string
}
const Copyright: FC<CopyrightProps> = ({ website = "#", ...typographyProps }) => {
    return (
        <Typography variant="body2" color="text.secondary" align="center" {...typographyProps}>
            {"Copyright © "}
            <Link color="inherit" href={website}>
                Your Website
            </Link>
            {new Date().getFullYear()}
            {"."}
        </Typography>
    )
}
export default Copyright

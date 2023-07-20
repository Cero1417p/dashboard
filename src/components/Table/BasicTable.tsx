import TableContainer from "@mui/material/TableContainer"
import Paper from "@mui/material/Paper"
import Table, { TableProps } from "@mui/material/Table"
import TableHead from "@mui/material/TableHead"
import TableRow from "@mui/material/TableRow"
import TableCellMUI from "@mui/material/TableCell"
import TableBody from "@mui/material/TableBody"
import * as React from "react"
import { Stack } from "@mui/material"
import { SxProps } from "@mui/material/styles"
import { Theme } from "@mui/system"
import { ReactNode } from "react"
import { NoDataFound } from "../NoDataFound/Index"

interface Props extends TableProps {
    data: { [key: string]: any }[] | undefined
    labels?: string[]
    actions?: { item: ReactNode; action: <T>(obj: T) => void }[]
    sx?: SxProps<Theme> | undefined
}

const BasicTable: React.FC<Props> = ({ data, labels, actions, sx, ...rest }) => {
    if (data === undefined || data.length === 0) {
        return <NoDataFound />
    }
    const campos = Object.keys(data[0])
    return (
        <TableContainer component={Paper} sx={{ overflow: "auto", ...sx }}>
            <Table aria-label="simple table" {...rest}>
                <TableHead>
                    <TableRow sx={{ position: "sticky", top: 0 }}>
                        {labels
                            ? labels.map((e, i) => {
                                  return (
                                      <TableCellMUI
                                          key={i}
                                          sx={{
                                              fontWeight: "bold",
                                              borderBottom: "2px solid black"
                                          }}
                                      >
                                          {e}
                                      </TableCellMUI>
                                  )
                              })
                            : campos.map((campo, i) => {
                                  return (
                                      <TableCellMUI
                                          key={i}
                                          sx={{
                                              fontWeight: "bold",
                                              borderBottom: "2px solid black"
                                          }}
                                      >
                                          {campo.charAt(0).toUpperCase() + campo.substring(1)}
                                      </TableCellMUI>
                                  )
                              })}
                        {actions && (
                            <TableCellMUI
                                sx={{
                                    fontWeight: "bold",
                                    borderBottom: "2px solid black"
                                }}
                            >
                                Acciones
                            </TableCellMUI>
                        )}
                    </TableRow>
                </TableHead>
                <TableBody>
                    {data.map((object, i) => {
                        return (
                            <TableRow
                                key={i}
                                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                                hover={true}
                            >
                                {campos.map((campo, ii) => {
                                    if (campo === "id" && labels) {
                                        return null
                                    }
                                    return (
                                        <TableCellMUI key={ii}>
                                            {(object[campo] as string).toString()}
                                        </TableCellMUI>
                                    )
                                })}
                                {
                                    //
                                }
                                {actions && object.id && (
                                    <TableCellMUI>
                                        <Stack direction="row">
                                            {actions.map((e, i) => {
                                                return (
                                                    <div
                                                        key={i}
                                                        color="secondary"
                                                        onClick={() => {
                                                            e.action(object)
                                                        }}
                                                    >
                                                        {e.item}
                                                    </div>
                                                )
                                            })}
                                        </Stack>
                                    </TableCellMUI>
                                )}
                            </TableRow>
                        )
                    })}
                </TableBody>
            </Table>
        </TableContainer>
    )
}
export default BasicTable

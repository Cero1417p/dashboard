import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid';
import { useEffect, useState } from 'react';
import { supabase } from '../../supabase/client';
import {Button} from '@mui/material'

const columns: GridColDef[] = [
  { field: 'id', headerName: 'ID', width: 70 },
  { field: 'name', headerName: 'Nombre producto', width: 130 },
  {
    field: "action",
    headerName: "Action",
    sortable: false,
    renderCell: (params) => {
      const onClick = (e) => {
       return  console.log("CLICK: ",params)
      };

      return <Button onClick={onClick}>Click</Button>;
    }}
];

interface IProduct{
    id:number,
    name:string
}  

const ProductList = () => {
    const [products, setProducts] = useState<any[]|[]>([])
    const fetchProducts = async () => {
        const { data, error } = await supabase
            .from("products")
            .select("*")
            .order("name", { ascending: true })
        console.log("data: ", data)
        if (error) console.log("error", error)
        else setProducts(data.map((d:IProduct)=>{
            return {id:d.id,name:d.name,action:<Button onClick={()=>{console.log("GET: ",d)}} >Get DATA</Button>}
        }))
    }
    useEffect(() => {
        void fetchProducts()
    }, [])
    useEffect(() => {
        console.log("products:: ",products)
    }, [products])

  return (
    <div style={{ height: 400, width: '100%' }}>
      <DataGrid
        rows={products}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 5 },
          },
        }}
        pageSizeOptions={[5, 10]}
        checkboxSelection
      />
    </div>
  )
}
export default ProductList

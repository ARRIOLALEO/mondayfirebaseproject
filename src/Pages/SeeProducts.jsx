import React,{useContext,useState} from 'react'
import {FirestoreContext} from '../contex/GeneralFireStore'
import {Grid,Button,Dialog,DialogContent,DialogTitle,FormControl,Input} from "@mui/material"
export default function SeeProducts() {
  const {allProducts,deleteProduct} = useContext(FirestoreContext)


  const handlerDelete = (id,imageToDelete) =>{
    imageToDelete = [...imageToDelete]
    const start =  imageToDelete.indexOf("%")
    const end =  imageToDelete.indexOf("?")
    
    imageToDelete  = imageToDelete.slice(start,end).join("")
    console.log(imageToDelete)
   // deleteProduct(id,imageToDelete)

    
   // https://firebasestorage.googleapis.com/v0/b/reactapp-3f238.appspot.com/o/images%2Fimage.png?alt=media&token=b70e9731-3324-467b-b481-38096c36355e
  }

  const [dialogOpen,setDialogOpen] = useState(false)
  const handlerClose = () =>{
    setDialogOpen(!dialogOpen)
  }
  return (
<>
    <Grid container spacing={2}>{
      allProducts.map(({data,id})=>(
        <>
        <Grid item sx={2}>{data.name}</Grid>
        <Grid item sx={2}>{data.price}</Grid>
        <Grid item sx={2}><img src={data.img} width="100"/></Grid>
        <Grid item sx={2}><Button onClick={()=> setDialogOpen(true)} >Modify</Button></Grid>
        <Grid item sx={2}><Button onClick={()=> handlerDelete(id,data.img)}>Delete</Button></Grid>
        </>
      )
      )
    }
    </Grid>
    <Dialog open={dialogOpen} onClose={handlerClose}>
      <DialogTitle>Edit This Product</DialogTitle>
      <DialogContent>
        some content
      </DialogContent>
    </Dialog>
    </>
  )
}








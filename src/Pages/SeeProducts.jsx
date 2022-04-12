import React,{useContext,useState} from 'react'
import {FirestoreContext} from '../contex/GeneralFireStore'
import {Grid,Button,Dialog,DialogContent,DialogTitle,FormControl,Input} from "@mui/material"
export default function SeeProducts() {
  const {allProducts,deleteProduct,modifyProduct} = useContext(FirestoreContext)


  const handlerDelete = (id,imageToDelete) =>{
    imageToDelete = [...imageToDelete]
    const start =  imageToDelete.indexOf("%")
    const end =  imageToDelete.indexOf("?")
    
    imageToDelete  = imageToDelete.slice(start,end).join("")
    console.log(imageToDelete)
   // deleteProduct(id,imageToDelete)

    }

  const [dialogOpen,setDialogOpen] = useState(false)
  const [dataToChange,setDataToChange] = useState({})
  const handlerClose = () =>{
    setDialogOpen(!dialogOpen)
  }
  const handlerEdit = (data) =>{
    setDataToChange(data)
    setDialogOpen(true)
    
  }

  // this function will save our data if we change it
  const updateProduct = () =>{
    // i need to send that that to my firestore
    modifyProduct(dataToChange)
  }
  return (
<>
    <Grid container spacing={2}>{
      allProducts.map(({data,id})=>(
        <>
        <Grid item sx={2}>{data.name}</Grid>
        <Grid item sx={2}>{data.price}</Grid>
        <Grid item sx={2}><img src={data.img} width="100"/></Grid>
        <Grid item sx={2}><Button onClick={()=> handlerEdit({...data,id:id}) } >Modify</Button></Grid>
        <Grid item sx={2}><Button onClick={()=> handlerDelete(id,data.img)}>Delete</Button></Grid>
        </>
      )
      )
    }
    </Grid>
    <Dialog open={dialogOpen} onClose={handlerClose}>
      <DialogTitle>Edit This Product</DialogTitle>
      <DialogContent>

        <FormControl fullWidth>
        <Input value={dataToChange.name} onChange={(e)=> setDataToChange({...dataToChange,name:e.target.value})}/>
        </FormControl>
        <FormControl fullWidth>
        <Input value={dataToChange.price} onChange={(e)=> setDataToChange({...dataToChange,price:e.target.value})}/>
        </FormControl>
        <FormControl fullWidth>
        <Input type='file' onChange={(e)=> setDataToChange({...dataToChange,newImage: e.target.files[0]})}/>
        </FormControl>
        <Button variant='contained' onClick={updateProduct}>Save Changes</Button>
        <Button variant='contained' style={{backgroundColor:"red"}} onClick={handlerClose}>Cancel</Button>
      </DialogContent>
    </Dialog>
    </>
  )
}








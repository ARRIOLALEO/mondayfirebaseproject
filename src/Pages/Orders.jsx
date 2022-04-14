import React,{useContext,useEffect} from 'react'
import {FirestoreContext} from '../contex/GeneralFireStore'
import {Grid} from '@mui/material'
export default function Orders() {
  const {getAllOrders,allOrders} = useContext(FirestoreContext)
  useEffect(()=>{
    getAllOrders()
  },[])
  console.log(allOrders)
  return (
    <>
    <div>Order</div>
    <Grid container spacing={2}>

      <Grid item sx={2}>Order ID</Grid>
      <Grid item sx={2}>Name</Grid>
      <Grid item sx={2}>Addres</Grid>
      <Grid item sx={2}>Description</Grid>
      <Grid item sx={2}>Status</Grid>
      <Grid item sx={2}>Delete</Grid>
      </Grid>
      {
        allOrders.map(({id,data})=>{
          const {name,address} = data;
          return(
          <Grid container spacing={2}>
      <Grid item sx={2}>{id}</Grid>
      <Grid item sx={2}>{name}</Grid>
      <Grid item sx={2}>{address}</Grid>
      <Grid item sx={2}>Description</Grid>
      <Grid item sx={2}>Status</Grid>
      <Grid item sx={2}>Delete</Grid>
      </Grid>)
        })
      }
    </>
  )
}

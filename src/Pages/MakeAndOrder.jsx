import React,{useContext,useState} from 'react'
import {CartContext} from '../contex/GeneralCart'
import { FirestoreContext} from '../contex/GeneralFireStore'
import Header from '../components/commons/Header'
import {Grid,List,ListItem,FormControl,Input,Button,Typography} from '@mui/material'

export default function MakeAndOrder() {
  const {allProductsInCart} = useContext(CartContext)
  const {saveOrder} = useContext(FirestoreContext)
  const [customerData,setCustomerData] = useState({})
  const hanlderMakeAnOrder = () =>{
    // where i have to save in firebase
    saveOrder(allProductsInCart,customerData)

  }
  return (
      <>
      <Header/>
      <Grid container spacing={2}>
        <Grid item sx={12}md={6}>
          <h1>add the list of items to but</h1>
          <List>
            {
              allProductsInCart.map(el=>{
                return <ListItem key={el.id}> {el.name} {el.qqt} </ListItem>
              })
            }
          </List>

        </Grid>
        <Grid item ={12}md={6}>
          <Grid container spacing={2}>
            <FormControl fullWidth>
              <Input placeholder='Write your name' onChange={(e) =>setCustomerData({...customerData,name:e.target.value})}/>
            </FormControl>
            <FormControl fullWidth>
              <Input placeholder='Write your Phone' onChange={(e)=> setCustomerData({...customerData,telephone:e.target.value})}/>
            </FormControl>
            <FormControl fullWidth>
              <Input placeholder='Write your addres' onChange={(e)=> setCustomerData({...customerData,address:e.target.value})}/>
            </FormControl>
            <FormControl fullWidth>
              <Input placeholder='Write your email' onChange={(e)=> setCustomerData({...customerData,email:e.target.value})}/>
            </FormControl>
            <FormControl fullWidth>
              <Input type='number' placeholder='Credid card' onChange={(e)=> setCustomerData({...customerData,creditCard:e.target.value})}/>
            </FormControl>
            <Button variant='contained' style={{backgroundColor:"orange"}} onClick={hanlderMakeAnOrder}>Make and Order </Button>
          </Grid>
         </Grid>
      </Grid>
    </>
  )
}







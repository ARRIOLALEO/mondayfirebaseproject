import React,{useContext} from 'react'
import Header from '../components/commons/Header'
import {GeneralAuthContext} from '../contex/GeneralAuthContext'
import FormProducts from '../components/FormProducts'
import { Grid,List,ListItemButton,Divider } from '@mui/material'
import {Link, Navigate,Outlet} from 'react-router-dom'

export default function Dashboard() {
  const {user} = useContext(GeneralAuthContext )
  return (
      <>
      {user?(
      <>
      <Header/>
      <Grid container spacing={2}>
        <Grid item sx={2} md={3}>
          <List>
            <ListItemButton>
              <Link to="see-produts">All Products</Link>
              <Divider/>
            </ListItemButton>
            <ListItemButton>
              <Link to="add-product">Add Produc</Link>
              <Divider/>
            </ListItemButton>
            <ListItemButton>
              <Link to="orders">Orders</Link>
              <Divider/>
            </ListItemButton>
          </List>
        </Grid>
        <Grid item sx={2} md={5}><Outlet/></Grid>
      </Grid>
      </>):(<Navigate to="/login"/>)
      }
      </>
  )
}

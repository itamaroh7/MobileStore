import {  Card, CardContent, Grid,  Paper, List, Button,CardHeader, IconButton, CardActions} from "@mui/material";
import {Link} from 'react-router-dom'
import { useState} from 'react'
import {useSelector} from 'react-redux'
import CustomerInProdComp from "./CustomerInProd";
import ShoppingCart from "@mui/icons-material/ShoppingCart";

function ProductComp(props) {
    const storeData=useSelector(state=>state)

    return (
        <Card sx={{display:'flex',flexDirection:'column',justifyContent:'space-between',m:'10px',minWidth:'250px',minHeight:'250px'}}>
           
               <CardHeader title={<Button style={{textTransform:'none',fontSize:'20px'}} component={Link} to={'/EditProduct/'+props.prod.id}>
                    {props.prod.Name}
               </Button>}
                        subheader={(props.prod.Price.toString()+'₪\n '+props.prod.Quantity.toString()).split('\n').map(par=>{return(<b style={{ml:'5px'}}>{par}</b>)})}/>
            <CardContent>
            {storeData.userRole!='admin'?null:
            <Paper elevation={0} style={{maxHeight: 200, overflow: 'auto'}}> 
                     {storeData.purchases.filter(item1=>item1.ProductID==props.prod.id).map(item=>
                        {
                            return(
                            <CustomerInProdComp key={item.id} k={item.id}/>
                            )
                        })}           
            </Paper>}
            </CardContent>
        <CardActions>
            { storeData.userRole=='admin'?null:
            <IconButton >
                <ShoppingCart/>
            </IconButton>}
        </CardActions>
      </Card>
    );
  }
  
  export default ProductComp;
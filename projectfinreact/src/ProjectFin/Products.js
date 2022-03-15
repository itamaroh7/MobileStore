import { Button, Card, CardContent, Container, Grid} from "@mui/material";
import { Box } from "@mui/system";
import { useEffect } from "react";
import {useSelector,useDispatch} from 'react-redux'
import ProductComp from "./Product";
import {Link} from 'react-router-dom'



function ProductsComp() {
  const storeData=useSelector(state=>state)

    return (
        <Box sx={{ bgcolor: '#cfe8fc', height: 'auto',width:'auto'}}>
          <Grid container column>
          <Grid container row justify='center' style={{margin:'20px'}}>
            <Grid item xs={5}>
            {storeData.userRole!='admin'?null:<Button variant="contained" component={Link} to='/AddProduct'>
            Add Product
          </Button>}
          </Grid>
          <Grid item>
          {storeData.userRole!='admin'?null:<Card sx={{ml:'20px'}}>
            <CardContent>
            {'Total Amount: '+storeData.totalAmount }
            </CardContent>
            </Card>}
            </Grid>
           </Grid>
             <Grid container spacing={4} direction='row' style={{justifyContent:'center'}}>
               
             {storeData.products.map(prod=>{
               return(
                <Grid item xs={12} sm={4} lg={3}>
                <ProductComp key={prod.id} prod={prod} customers={storeData.customers}/>
                </Grid>
             )})}
             
             </Grid>
          </Grid>
        </Box>
    );
  }
  
  export default ProductsComp;
  
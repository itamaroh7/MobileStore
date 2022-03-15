import * as React from 'react';
import {Box, Grid} from '@mui/material';
import { useSelector } from 'react-redux';
import CustomerCardComp from '../Product/CustomerCard';

function CustomersComp() {
    const storeData=useSelector(state=>state)

    return (
        <Box sx={{ bgcolor: '#cfe8fc', height: '95vh',width:'auto' }} >
            <Grid container direction='row' spacing={4} style={{justifyContent:'center'}}>
                {storeData.customers.map(customer1=>{
                    return(
                        <Grid item xs={12} sm={3} sx={{m:'30px'}}>
                            <CustomerCardComp key={customer1.id} customer={customer1}/>
                        </Grid>
                    )
                })}
            </Grid>
        </Box>
    )
  }
  
  export default CustomersComp;
  
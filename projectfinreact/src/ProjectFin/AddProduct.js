import {Box, Grid, Card, CardActions, CardContent, CardHeader, IconButton, TextField, Tooltip, Typography} from '@mui/material';
import Add from '@mui/icons-material/Add';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import firebase from './firebaseApp'


function AddProductComp()
{
    const dispatch=useDispatch()
    const nav =useHistory()
    const [prod,setProd] = useState({Name:'',Price:0,Quantity:0})

    const addProduct=()=>
    {
        firebase.firestore().collection('Products').add({Name:prod.Name,Price:prod.Price,Quantity:prod.Quantity})
        .then(data1=>
            {
                dispatch({type:'ADDPRODUCT',payload:{Name:prod.Name,Price:prod.Price,Quantity:prod.Quantity,id:data1.id}})
                nav.push('/')
            })
    }

    return(
        <Box sx={{ bgcolor: '#cfe8fc', height: '95vh',width:'auto' }} >
            <Grid container style={{justifyContent:'center'}}>
                <Grid item sx={{m:'60px'}}>
            <Card >
                <CardHeader title='Add Product'/>
                <CardContent sx={{m:'10px'}}>
                            <Box sx={{'& .MuiTextField-root': { m: 1, width: 'auto' },textAlign:'center'}}>
                                <TextField variant='outlined' label='Name' value={prod.Name} onChange={e=>setProd({...prod,Name:e.target.value})}/><br/>
                                <TextField type='number' variant='outlined' label='Price' value={prod.Price} onChange={e=>setProd({...prod,Price:e.target.value})}/><br/>
                                <TextField type='number' variant='outlined' label='Quantity' value={prod.Quantity} onChange={e=>setProd({...prod,Quantity:e.target.value})}/>
                            </Box>
                </CardContent>
                <CardActions>
                    <Tooltip title='Add Product'>
                        <IconButton onClick={addProduct}>
                            <Add/>
                        </IconButton>
                    </Tooltip>
                </CardActions>
            </Card>
            </Grid>
            </Grid>
        </Box>
    )
}
export default AddProductComp
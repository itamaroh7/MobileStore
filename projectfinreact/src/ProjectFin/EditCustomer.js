import * as React from 'react';
import Box from '@mui/material/Box';
import Delete from '@mui/icons-material/Delete';
import { Button, Card, CardActions, CardContent, Grid, Paper, TextField,IconButton, Tooltip, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, List } from '@mui/material';
import { useSelector,useDispatch } from 'react-redux';
import {useState,useEffect} from 'react'
import {useParams,useHistory,Link} from 'react-router-dom'
import Utils from './Utils';
import firebase from './firebaseApp'


function EditCustomerComp() {
    const storeData=useSelector(state=>state)
    const dispatch=useDispatch()
    const params = useParams()
    const [customer,setCustomer] = useState({FirstName:'',LastName:'',City:''})
    const [changesCustomer,setChangesCustomer] = useState({FirstName:'',LastName:'',City:''})
    const [productsIdArr,setProductsIdArr] = useState([])
    const [isChanges,setIsChanges] = useState(false)
    const [openDialogDel,setOpenDialogDel] = useState(false)
    const nav=useHistory()


    useEffect(()=>
    {
        let newArr=[]
        newArr=storeData.purchases.filter(purch=>purch.CustomerID==params.id)
        setProductsIdArr(newArr)
        let customer=Utils.findElement(storeData.customers,'id',params.id)
        if(customer!=undefined)
        {
            setCustomer(customer)
            setChangesCustomer(customer)
        }
    },[storeData])

    useEffect(()=>
    {
        if(customer.FirstName!=changesCustomer.FirstName||customer.LastName!=changesCustomer.LastName||customer.City!=changesCustomer.City)
        {
            setIsChanges(true)
        }
        else{
            setIsChanges(false)
        }
    },[changesCustomer])

    const updateCustomer=()=>
    {
        let docRef = firebase.firestore().collection('Users').doc(params.id);
        docRef.get().then(doc=>{
            let customer=doc.data()
            let updatedCustomer = {...customer,FirstName : changesCustomer.FirstName, LastName : changesCustomer.LastName, City : changesCustomer.City,id:params.id }
            docRef.set(updatedCustomer)
            .then(data =>
            {
                dispatch({type:'UPDATECUSTOMER',payload:updatedCustomer})
                setIsChanges(false)
                setCustomer(updatedCustomer)
            })
        })
    }

    const deleteCustomer=()=>
    {
        handleClose()
        let purchWithCustomer=storeData.purchases.filter(purch=>purch.CustomerID==params.id)
        purchWithCustomer.forEach(element => {
            let docRef = firebase.firestore().collection('Purchases').doc(element.id);
            docRef.delete()
            .then(data =>
            {
               dispatch({type:'DELETECUSTOMER',payload:params.id})
               
            })
        });
        let docRef = firebase.firestore().collection('Users').doc(params.id);
        docRef.delete()
        .then(data =>
        {
            nav.push('/')
        })
        
    }

    const handleClickOpen = () => 
    {
        setOpenDialogDel(true)
    }
    
      const handleClose = () => 
    {
        setOpenDialogDel(false)
    }

    return (

        <Box sx={{ bgcolor: '#cfe8fc', height: '95vh',width:'auto' }} >
            <Grid container direction='row' spacing={6} justifyContent='center' alignItems='center'>
                <Grid item xs={12} md={4} sx={{m:'50px'}} >
                    <Card >
                        <CardContent sx={{m:'10px'}}>
                            <Box sx={{'& .MuiTextField-root': { m: 1, width: 'auto' },textAlign:'center'}}>
                            <TextField variant='outlined' label='First Name' value={changesCustomer.FirstName} onChange={e=>setChangesCustomer({...changesCustomer,FirstName:e.target.value})}/><br/>
                            <TextField variant='outlined' label='Last Name' value={changesCustomer.LastName} onChange={e=>setChangesCustomer({...changesCustomer,LastName:e.target.value})}/><br/>
                            <TextField variant='outlined' label='City' value={changesCustomer.City} onChange={e=>setChangesCustomer({...changesCustomer,City:e.target.value})}/>
                            </Box>
                        </CardContent>
                        <CardActions>
                            <Tooltip title='Delete'>
                                <IconButton onClick={handleClickOpen}>
                                    <Delete/>
                                </IconButton>
                            </Tooltip>
                            {isChanges&&
                            <Button onClick={updateCustomer}>
                                Save
                            </Button>}
                        </CardActions>
                    </Card>

                </Grid>
                {productsIdArr.length!=0?<Grid item xs={12} md={2} sx={{width:'auto' ,padding:'10px',m:'30px'}}>
                    <Paper  style={{padding:'10px',textAlign:'center'}}>
                            {storeData.products.filter(prod=>productsIdArr.some(prod2=>prod.id==prod2.ProductID))
                            .map(item=>{
                                return(
                                    <Box sx={{m:'5px'}}>
                                        <Button style={{textTransform:'none',fontSize:'13px'}} component={Link} to={'/EditProduct/'+item.id} variant="text" color="primary" type="submit">
                                        {item.Name}
                                        </Button>
                                    </Box>
                                )
                            })}
                    </Paper>
                </Grid>:null}

            </Grid>
            <Dialog open={openDialogDel} onClose={handleClose}  >
                                        <DialogTitle>
                                            {"Delete"}
                                        </DialogTitle>
                                        <DialogContent sx={{minWidth:'200px'}}>
                                            <DialogContentText>
                                                 Are you sure?
                                            </DialogContentText>
                                        </DialogContent>
                                        <DialogActions>
                                            <Button onClick={deleteCustomer}>YES</Button>
                                            <Button onClick={handleClose}>NO</Button>
                                        </DialogActions>
                                    </Dialog>
        </Box>
    );
  }
  
  export default EditCustomerComp;
  
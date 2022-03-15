import Box from '@mui/material/Box';
import Delete from '@mui/icons-material/Delete';
import { Button, Card, CardActions, CardContent, Grid, Paper, TextField,IconButton, Tooltip, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions } from '@mui/material';
import {useState,useEffect} from 'react'
import {useParams,useHistory,Link} from 'react-router-dom'
import Utils from './Utils';
import firebase from './firebaseApp'
import { useSelector,useDispatch } from 'react-redux';


function EditProductComp() {
    const storeData=useSelector(state=>state)
    const dispatch=useDispatch()
    const params = useParams()
    const [prod,setProd] = useState({Name:'',Price:0,Quantity:0})
    const [changesProd,setChangesProd] = useState({Name:'',Price:0,Quantity:0})
    const [customersIdArr,setCustomersIdArr] = useState([])
    const [isChanges,setIsChanges] = useState(false)
    const [openDialogDel,setOpenDialogDel] = useState(false)
    const nav=useHistory()


    useEffect(()=>
    {
        let newArr=[]
        newArr=storeData.purchases.filter(purch=>purch.ProductID==params.id)
        setCustomersIdArr(newArr)
        let prod=Utils.findElement(storeData.products,'id',params.id)
        if(prod!=undefined)
        {
            setProd(prod)
            setChangesProd(prod)
        }
    },[storeData])

    useEffect(()=>
    {
        if(prod.Name!=changesProd.Name||prod.Price!=changesProd.Price||prod.Quantity!=changesProd.Quantity)
        {
            setIsChanges(true)
        }
        else{
            setIsChanges(false)
        }
    },[changesProd])

    const updateProduct=()=>
    {
        let updatedProd={ Name : changesProd.Name, Price : changesProd.Price, Quantity : changesProd.Quantity,id:params.id }
        let docRef = firebase.firestore().collection('Products').doc(params.id);
        docRef.set(updatedProd)
        .then(data =>
        {
            dispatch({type:'UPDATEPRODUCT',payload:updatedProd})
            setIsChanges(false)
            setProd(updatedProd)
        })
    }

    const deleteProduct=()=>
    {
        handleClose()
        let purchWithProd=storeData.purchases.filter(purch=>purch.ProductID==params.id)
        purchWithProd.forEach(element => {
            let docRef = firebase.firestore().collection('Purchases').doc(element.id);
            docRef.delete()
            .then(data =>
            {
            })
        });
        debugger
        let docRef = firebase.firestore().collection('Products').doc(params.id);
        docRef.delete()
        .then(data =>
        {
            debugger
            dispatch({type:'DELETEPRODUCT',payload:params.id})
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
                            <TextField disabled={storeData.userRole!='admin'?true:false} variant='outlined' label='Name' value={changesProd.Name} onChange={e=>setChangesProd({...changesProd,Name:e.target.value})}/><br/>
                            <TextField disabled={storeData.userRole!='admin'?true:false} type='number' variant='outlined' label='Price' value={changesProd.Price} onChange={e=>setChangesProd({...changesProd,Price:e.target.value})}/><br/>
                            <TextField disabled={storeData.userRole!='admin'?true:false} type='number' variant='outlined' label='Quantity' value={changesProd.Quantity} onChange={e=>setChangesProd({...changesProd,Quantity:e.target.value})}/>
                            </Box>
                        </CardContent>
                        <CardActions>
                            {storeData.userRole!='admin'?null:<Tooltip title='Delete'>
                                <IconButton onClick={handleClickOpen}>
                                    <Delete/>
                                </IconButton>
                            </Tooltip>}
                            {isChanges&&
                            <Button onClick={updateProduct}>
                                Save
                            </Button>}
                        </CardActions>
                    </Card>

                </Grid>
                {storeData.userRole=='admin'&&customersIdArr.length!=0?<Grid item xs={12} md={2} sx={{width:'auto' ,padding:'10px',m:'30px'}}>
                    <Paper style={{padding:'10px',textAlign:'center'}}>
                            {storeData.customers.filter(customer=>customersIdArr.some(customer2=>customer.id==customer2.CustomerID))
                            .map(item=>{
                                return(
                                    <Box sx={{m:'5px'}}>
                                        <Button style={{textTransform:'none',fontSize:'13px'}} component={Link} to={'/EditCustomer/'+item.id}  variant="text" color="primary" type="submit">
                                        {item.FirstName+' '+item.LastName}
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
                                            <Button onClick={deleteProduct}>YES</Button>
                                            <Button onClick={handleClose}>NO</Button>
                                        </DialogActions>
                                    </Dialog>
        </Box>
    );
  }
  
  export default EditProductComp;
  
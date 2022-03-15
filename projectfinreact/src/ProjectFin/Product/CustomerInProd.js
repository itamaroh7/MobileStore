import { Autocomplete, Card, CardContent, Grid, IconButton,TextField, Button, CardActions} from "@mui/material";
import {Link} from 'react-router-dom'
import ExpandMore from '@mui/icons-material/ExpandMore'
import NavigateNext from '@mui/icons-material/NavigateNext'
import {useEffect, useState} from 'react'
import {useSelector,useDispatch} from 'react-redux'
import firebase from '../firebaseApp'



function CustomerInProdComp(props) {
    const [expand,setExpanded] = useState(false)
    const [purchase,setPurchase] = useState({CustomerID:'',Date:'',ProductID:''})
    const [customer,setCustomer] = useState({})
    const [selectProd,setSelectProd] = useState({Name:'',Price:'',Quantity:''})
    const storeData=useSelector(state=>state)
    const dispatch = useDispatch()

    const getCurrentDate=()=>
    {
        var today = new Date();
        var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
        var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
        var dateTime = date+' '+time;
        return dateTime
    }
    const addProductToCustomer=()=>
    {
        if(selectProd.Name=='')
            return
        firebase.firestore().collection('Purchases').add({CustomerID:customer.id,ProductID:selectProd.id,Date:getCurrentDate()})
        .then(d=>
            {
                firebase.firestore().collection('Purchases').get()
                .then(data=>
                    {
                        let purchasesArr=[]
                        data.forEach(doc=>
                        {
                            purchasesArr.push({CustomerID:doc.data().CustomerID,ProductID:doc.data().ProductID,Date:doc.data().Date,id:doc.id})
                        })
                        dispatch({type:'INITPURCHASES',payload:purchasesArr})
                    })

                dispatch({type:"ADDTOTALAMOUNT",payload:1})
            })
    }

    useEffect(()=>
    {
        let purch=storeData.purchases.filter(item=>item.id==props.k)
        setPurchase(purch[0])
        let custom=storeData.customers.filter(item=>item.id==purch[0].CustomerID)
        setCustomer(custom[0])
    },[])

    return (
        <Card sx={{bgcolor:'#c7ffe4',m:'5px'}}>
      
                <CardContent style={{fontSize:'1vw',justifyContent:'center'}}>
                        <Button style={{textTransform:'none',fontSize:'18px'}} component={Link} to={'/EditCustomer/'+customer.id}>
                            {customer.FirstName+" "+customer.LastName}
                        </Button>
                </CardContent>
                <CardContent>
                    {purchase.Date.toString()}
                </CardContent>
                <IconButton style={{width:'30px'}} onClick={()=>setExpanded(!expand)}>
                    {expand?<ExpandMore/>:<NavigateNext/>}
                </IconButton>
                {expand&& 
                <Card sx={{bgcolor:'#91ffda',m:'20px',justifyContent:'center',display:'flex'}} >
                <CardContent alignItems="center" justify="center">               
                         <Autocomplete
                            id="combo-box-demo"
                            options={storeData.products}
                            getOptionLabel={option => option.Name}
                            style={{ minWidth:'120px' }}
                            renderInput={params => (
                                <TextField
                                {...params}
                                label="Products"
                                variant="outlined"
                                fullWidth
                                
                                />
                            )}onChange={(e,value)=>setSelectProd(value)}
                            />
                            </CardContent>
                            <CardActions>
                            <Button size='small' onClick={addProductToCustomer}>
                                Save
                            </Button>
                            </CardActions>
                            </Card>
                }
      
    </Card>
    );
  }
  
  export default CustomerInProdComp;
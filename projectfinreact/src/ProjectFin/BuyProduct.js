import { Autocomplete,Button,IconButton,TextField } from "@mui/material"
import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import ShoppingCart from '@mui/icons-material/ShoppingCart';
import firebase from './firebaseApp'


function BuyProductComp(props)
{
    const storeData = useSelector(state=>state)
    const dispatch = useDispatch()
    const [selectProdId,setSelectProdId] = useState({id:''})

    const getCurrentDate=()=>
    {
        var today = new Date();
        var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
        var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
        var dateTime = date+' '+time;
        return dateTime
    }

    const buyProduct=()=>
    {
        if(selectProdId!=null&& selectProdId!='')
        {
            debugger
            firebase.firestore().collection('Purchases').add({ProductID:selectProdId,CustomerID:props.customerId,Date:getCurrentDate()})
            .then(data1=>
                {
                    firebase.firestore().collection('Purchases').get()
                        .then(data=>{
                            let purchasesArr=[]
                            data.forEach(doc=>
                            {
                                purchasesArr.push({CustomerID:doc.data().CustomerID,ProductID:doc.data().ProductID,Date:doc.data().Date,id:doc.id})
                            })
                            dispatch({type:'INITPURCHASES',payload:purchasesArr})
                            dispatch({type:'INITTOTALAMOUNT',payload:purchasesArr.length})
                            alert('Bought successfully')
                        })
                })
        }
    }

    return(
        <div>
           <Autocomplete
                            id="combo-box"
                            options={storeData.products}
                            getOptionLabel={option => option.Name}
                            style={{ minWidth:'120px' }}
                            renderInput={params => (
                                <TextField
                                {...params}
                                label="Products"
                                variant="outlined"
                                fullWidth/>
                            )}onChange={(e,value)=>setSelectProdId(value==null?null:value.id)}/>
                            <IconButton sx={{m:'5px'}} onClick={buyProduct}>
                                <ShoppingCart/>
                            </IconButton>
        </div>
    )
}

export default BuyProductComp
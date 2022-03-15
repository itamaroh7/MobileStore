import { Card, CardContent, CardHeader, IconButton, Paper } from "@mui/material"
import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import ProductInCustomerComp from "./ProductInCustomer"
import Utils from '../Utils/Utils';
import ExpandMore from '@mui/icons-material/ExpandMore';
import ExpandLess from '@mui/icons-material/ExpandLess';
import BuyProductComp from "./BuyProduct";


function CustomerCardComp(props)
{
    const storeData=useSelector(state=>state)
    const [productsOfCustomer,setProductsOfCustomer] = useState([])
    const [buyBtn,setBuyBtn] = useState(false)
    useEffect(()=>
    {
        let prodsAndPurchsArr=[]
        let productsIdArr=storeData.purchases.filter(purch=>purch.CustomerID==props.customer.id)
        productsIdArr.forEach(element=>{
            let prod=Utils.findElement(storeData.products,'id',element.ProductID)
            prodsAndPurchsArr.push({id:prod.id,Name:prod.Name,Date:element.Date})
        })
        setProductsOfCustomer(prodsAndPurchsArr)
    },[storeData.purchases])
    return(
        <Card sx={{height:'auto'}}>
            <CardHeader
            title={props.customer.FirstName+' '+props.customer.LastName}
            />
            <CardContent>
                <Paper style={{maxHeight: 215, overflow: 'auto'}}>
                    
                        {productsOfCustomer.map(product=>{
                            return(
                                <ProductInCustomerComp key={product.id} prod={product}/>
                            )
                        })}
                    
                </Paper>
                <IconButton sx={{mt:'5px',mb:'5px'}} onClick={()=>setBuyBtn(!buyBtn)}>
                    {buyBtn?<ExpandLess/>:<ExpandMore/>}
                </IconButton>
                {buyBtn&& <BuyProductComp customerId={props.customer.id}/>}
            </CardContent>
        </Card>
    )
}
export default CustomerCardComp
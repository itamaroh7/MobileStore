import { Card, CardContent, Typography } from "@mui/material";
import { useEffect } from "react";
import {useSelector} from 'react-redux'


function PurchaseCardComp(props) {
    const storeData=useSelector(state=>state)


    useEffect(()=>
    {
  
    },[])
  
      return (
          <Card>
              <CardContent>
              <Typography>
                  {props.prod.Name}
                </Typography>
                <Typography>
                  {props.customer.FirstName+' '+props.customer.LastName}
                </Typography>
                <Typography>
                  {props.purchase.Date.toString()}
                </Typography>
              </CardContent>
          </Card>
      );
    }
    
    export default PurchaseCardComp;
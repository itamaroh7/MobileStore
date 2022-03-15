import { Button, Card, CardContent, Typography } from "@mui/material"
import {Link} from 'react-router-dom'

function ProductInCustomerComp(props)
{
    return(
        <Card sx={{bgcolor:'#f5f6f7'}}>
            <CardContent>
                <Button style={{textTransform:'none',fontSize:'17px'}} component={Link} to={'/EditProduct/'+props.prod.id}>
                    {props.prod.Name}
                </Button>
                <Typography>
                    {props.prod.Date}
                </Typography>
            </CardContent>
        </Card>
    )
}
export default ProductInCustomerComp
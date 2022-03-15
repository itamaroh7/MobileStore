import { Box, Button, Card, CardContent, CardHeader, Grid, Typography,TextField  } from "@mui/material";
import { useRef } from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { useAuth } from "./Auth/AuthContext";


export default function AccountPageComp()
{
    const storeData=useSelector(state=>state)
    const passwordRef = useRef()
    const confirmPassRef = useRef()
    const {updatePassword} = useAuth()
    const nav = useHistory()

    const handleSaveChanges = ()=>
    {
        if(passwordRef.current.value==confirmPassRef.current.value)
        {
            try{ 
                Promise.resolve(updatePassword(passwordRef.current.value)).then(()=>{
                    nav.push('/')
                })    
            }catch{
                alert('error')
            }
        }
    }

    return(
        <Grid container sx={{ bgcolor: '#cfe8fc', height: '95vh',textAlign:'center',width:'auto',alignItems:'center',justifyContent:'center'}} >
           <Grid item>
                <Card sx={{maxWidth:'450px' ,minWidth:'250px'}}>
                    <CardHeader
                    title={storeData.user.userName}/>
                    <CardContent>
                            <Box sx={{'& .MuiTextField-root': { m: 1, width: 'auto' },textAlign:'center'}}>
                                <Typography variant="h6" >
                                {storeData.user.email}
                                </Typography><br/>
                                <TextField inputRef={passwordRef} type='password' variant='outlined' label='Password' /><br/>
                                <TextField inputRef={confirmPassRef} type='password' variant='outlined' label='Confirm Password' /><br/>
                                <Button sx={{textTransform:'none',fontSize:'18px'}} onClick={handleSaveChanges}>
                                    Save Changes
                                </Button>
                            </Box>
                    </CardContent>
                </Card>
            </Grid>
        </Grid>
    )
}
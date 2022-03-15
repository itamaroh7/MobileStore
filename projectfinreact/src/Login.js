import {
  Card,
  CardContent,
  CardHeader,
  Grid,
  Box,
  TextField,
  Button,
  Link,
} from "@mui/material";
import { maxWidth } from "@mui/system";
import { useState,useRef } from "react";
import {useHistory} from 'react-router-dom'
import { useAuth } from "./ProjectFin/AuthContext";

export default function LoginComp() {

    const [loading,setLoading] = useState(false)
    const emailRef =useRef()
    const passwordRef=useRef()
    const {login} = useAuth()
    const nav=useHistory()

    async function handleSignin(e)
    {
        e.preventDefault()
        setLoading(true)
        try{
            await login(emailRef.current.value,passwordRef.current.value)
            nav.push('/')
        }catch{
            alert('Error!')
        }
        setLoading(false)
    }

  return (
    <Grid
      container
      spacing={1}
      textAlign='center'
      direction="column"
      alignItems="center"
      justifyContent="center"
      style={{ minHeight: "100vh" }}
    >
      <Grid item xs={3}>
        <Card sx={{ maxWidth: "350px" }}>
          <CardHeader title="Login" />
          <CardContent >
            <Box
              sx={{
                "& .MuiTextField-root": { m: 1, width: "auto" },
                textAlign: "center",
              }}
            >
              <TextField inputRef={emailRef} variant="outlined" label="Email" />
              <br />
              <TextField inputRef={passwordRef} variant="outlined" type="password" label="Password" />
              <br />
              <Button disabled={loading} variant='outlined' sx={{minWidth:'200px',maxWidth:'300px'}} onClick={handleSignin}>Log In</Button>
            </Box>
          </CardContent>
        </Card>
        
      </Grid>
      <Grid item >
            Need an account?<Link href='/Signup' underline='hover'> Sign Up</Link>
        </Grid>
    </Grid>
  );
}

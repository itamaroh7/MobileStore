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
import firebase from "../firebaseApp";
import { useRef, useState } from "react";
import { useHistory } from "react-router-dom";
import { useAuth } from "../Auth/AuthContext";
  
  export default function SignupComp() {

    const [loading,setLoading] = useState(false)
    const emailRef =useRef()
    const passwordRef=useRef()
    const confirmPassRef=useRef()
    const userNameRef=useRef()
    const fNameRef=useRef()
    const lNameRef=useRef()
    const cityRef=useRef()
    const {signup} = useAuth()
    const nav=useHistory()

    async function handleSignup(e)
    {
        e.preventDefault()
        setLoading(true)
        try{
            if(confirmPassRef.current.value!=passwordRef.current.value)
            {
                alert('please confirm passwords')
                setLoading(false)
                return
            }
            await signup(emailRef.current.value,passwordRef.current.value,userNameRef.current.value,fNameRef.current.value,lNameRef.current.value,cityRef.current.value)
            alert('signed')
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
            <CardHeader title="Sign Up" />
            <CardContent >
              <Box
                sx={{
                  "& .MuiTextField-root": { m: 1, width: "auto" },
                  textAlign: "center",
                }}
              >
                <TextField inputRef={fNameRef} variant="outlined" label="First Name" />
                <TextField inputRef={lNameRef} variant="outlined" label="Last Name" />
                <br />
                <TextField inputRef={cityRef} variant="outlined" label="City" />
                <br />
                <TextField inputRef={userNameRef} variant="outlined" label="UserName" />
                <br />
                <TextField inputRef={emailRef} variant="outlined" label="Email" />
                <br />
                <TextField inputRef={passwordRef} variant="outlined" type="password" label="Password" />
                <br />
                <TextField inputRef={confirmPassRef}
                  variant="outlined"
                  type="password"
                  label="Confirm Password"
                />
                <br />
                <Button disabled={loading} variant='outlined' sx={{minWidth:'200px',maxWidth:'300px'}} onClick={handleSignup}>Sign Up</Button>
              </Box>
            </CardContent>
          </Card>
          
        </Grid>
        <Grid item >
              Already have an account?<Link href='/Login' underline='hover'>Log In</Link>
          </Grid>
      </Grid>
    );
  }
  
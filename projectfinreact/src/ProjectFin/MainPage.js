import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import Grid from '@mui/material/Grid';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import {Route,BrowserRouter as Router,Switch,useHistory,withRouter} from 'react-router-dom'
import ProductsComp from './Products';
import CustomersComp from './Customers';
import PurchasesComp from './Purchases';
import firebase from './firebaseApp'
import {useSelector,useDispatch} from 'react-redux'
import EditProductComp from './EditProduct';
import EditCustomerComp from './EditCustomer';
import AddProductComp from './AddProduct';
import PrivateRoute from './PrivateRoute';
import { AuthProvider, useAuth } from './AuthContext';
import Utils from './Utils';
import auth from './firebaseApp'
import AccountPageComp from './AccountPage';


function MainPageComp() 
{

    const settings = [ 'Account', 'Dashboard', 'Logout'];
    const storeData=useSelector(state=>state)
    const dispatch=useDispatch()
    const {logout} = useAuth()

    React.useEffect(()=>
    {

        firebase.firestore().collection('Users').get()
        .then(data=>{
            let usersArr=[]
            data.forEach(doc=>{
                usersArr.push({Role:doc.data().Role,userId:doc.data().userId,Email:doc.data().Email,UserName:doc.data().UserName})
            })
            let idCurrentUser=firebase.auth().currentUser.uid
            let user=Utils.findElement(usersArr,'userId',idCurrentUser)
            dispatch({type:"INITUSERROLE",payload:user.Role})
            if(user.Role=='admin')
            {
                dispatch({type:"INITPAGES",payload:['Products','Customers','Purchases']})
            }else
            {
                dispatch({type:"INITPAGES",payload:['Products']})
            }
            debugger
            dispatch({type:"INITUSER",payload:{userName:user.UserName,email:user.Email}})
        })

        firebase.firestore().collection('Products').get()
        .then(data=>{
            let prodsArr=[]
            data.forEach(doc=>
            {
                prodsArr.push({Name:doc.data().Name,Price:doc.data().Price,Quantity:doc.data().Quantity,id:doc.id})
            })
            dispatch({type:'INITPRODS',payload:prodsArr})
        })
        firebase.firestore().collection('Users').get()
        .then(data=>{
            let customArr=[]
            data.forEach(doc=>
            {
                customArr.push({FirstName:doc.data().FirstName,LastName:doc.data().LastName,City:doc.data().City,id:doc.id})
            })
            dispatch({type:'INITCUSTOMERS',payload:customArr})
        })
        firebase.firestore().collection('Purchases').get()
        .then(data=>{
            let purchasesArr=[]
            data.forEach(doc=>
            {
                purchasesArr.push({CustomerID:doc.data().CustomerID,ProductID:doc.data().ProductID,Date:doc.data().Date,id:doc.id})
            })
            dispatch({type:'INITPURCHASES',payload:purchasesArr})
            dispatch({type:'INITTOTALAMOUNT',payload:purchasesArr.length})
        })
    },[])

  const [anchorElNav, setAnchorElNav] = React.useState(null);  
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const nav=useHistory()

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = (page) => {
    setAnchorElNav(null);
    nav.push('/'+page)
  };

  const handleCloseUserMenu =async (event) => {
      debugger
    setAnchorElUser(null);
    if(event.currentTarget.innerText=='Logout')
    {
        try{
            await logout()
            nav.push('/login')
        }catch{
            alert('error')
        }
    }
    else if(event.currentTarget.innerText=='Account')
    {
        try{
            nav.push('/Account')
        }catch{
            alert('error')
        }
    }
    else if(event.currentTarget.innerText=='Dashboard')
    {
        try{
            nav.push('/')
        }catch{
            alert('error')
        }
    }
  };

  return (
      <div>
          <Grid container direction='column'>
        <AppBar position="static">
        <Container maxWidth="xxl">
            <Toolbar disableGutters>

            <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
                <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleOpenNavMenu}
                color="inherit"
                >
                <MenuIcon />
                </IconButton>
                <Menu
                id="menu-appbar"
                anchorEl={anchorElNav}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                }}
                keepMounted
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'left',
                }}
                open={Boolean(anchorElNav)}
                onClose={handleCloseNavMenu}
                sx={{
                    display: { xs: 'block', md: 'none' },
                }}
                >
                {storeData.pages.map((page) => (
                    <MenuItem key={page} onClick={()=>handleCloseNavMenu(page)}>
                    <Typography textAlign="center">{page}</Typography>
                    </MenuItem>
                ))}
                </Menu>
            </Box>
            
            <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
                {storeData.pages.map((page) => (
                <Button
                    key={page}
                    onClick={()=>handleCloseNavMenu(page)}
                    sx={{ my: 2, color: 'white', display: 'block' }}
                >
                    {page}
                </Button>
                ))}
            </Box>

            <Box sx={{ flexGrow: 0 }}>
                <Tooltip title="Open settings">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                    <Avatar  />
                </IconButton>
                </Tooltip>
                <Menu
                sx={{ mt: '45px' }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
                >
                {settings.map((setting) => (
                    <MenuItem key={setting} onClick={handleCloseUserMenu}>
                    <Typography textAlign="center">{setting}</Typography>
                    </MenuItem>
                ))}
                </Menu>
            </Box>
            </Toolbar>
        </Container>
        </AppBar>
            <Switch>
                <Route  path='/Account' component={AccountPageComp}/>
                <Route  path='/Products' component={ProductsComp}/>
                <Route  path='/Customers' component={CustomersComp}/>
                <Route  path='/Purchases' component={PurchasesComp}/>
                <Route  path='/AddProduct' component={AddProductComp}/>
                <Route  path='/EditProduct/:id' component={EditProductComp}/>
                <Route  path='/EditCustomer/:id' component={EditCustomerComp}/>
                <PrivateRoute  path='/' component={ProductsComp}/>
            </Switch>
        </Grid>
    </div>
  );
  }
  
  export default MainPageComp;
import {Autocomplete, Box, Checkbox, FormControlLabel, FormGroup, Grid, IconButton, Paper,TextField, Tooltip} from '@mui/material';
import { DesktopDatePicker,LocalizationProvider } from '@mui/lab';
import FilterAlt from '@mui/icons-material/FilterAlt';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import {useEffect, useState} from 'react'
import {useSelector} from 'react-redux'
import Utils from './Utils';
import PurchaseCardComp from './PurchaseCard';

function PurchasesComp() {
  const [selectProd,setSelectProd] = useState({Name:'',Price:'',Quantity:''})
  const [selectCustomer,setSelectCustomer] = useState({FirstName:'',LastName:'',Date:''})
  const [purchasesCards,setPurchasesCards] = useState([])
  const [filterDate,setFilterDate] = useState(false)
  const [selectedDate,setSelectedDate] = useState(new Date())
  const storeData = useSelector(state=>state)

  const getDateInFormat=()=>
  {
    var d=selectedDate
    var date = d.getFullYear()+'-'+(d.getMonth()+1)+'-'+d.getDate();
    var time = d.getHours() + ":" + d.getMinutes() + ":" + d.getSeconds();
    var dateTime = date+' '+time;
    return dateTime
  }

  const filterPurchases=()=>
  {
    let purchasesArr=storeData.purchases
    if(selectProd!=null&&selectProd.Name!='')
    {
      purchasesArr=storeData.purchases.filter(element=>element.ProductID==selectProd.id)
    }
    if(selectCustomer!=null&&selectCustomer.FirstName!='')
    {
      purchasesArr=purchasesArr.filter(element=>element.CustomerID==selectCustomer.id)
    }
    if(selectedDate!=null&& filterDate)
    {
      let date=getDateInFormat()
      date=date.substr(0,date.indexOf(' '))
      purchasesArr=purchasesArr.filter(element=>element.Date.substr(0,element.Date.indexOf(' '))==date)
    }
    setPurchasesCards(purchasesArr)
  }

  const cbFilterByDate=(e)=>
  {
      setFilterDate(e.target.checked)
  }

    return (
      <Box sx={{ bgcolor: '#cfe8fc', height: '95vh',width:'auto' }} >
            <Paper >
              <Grid container spacing={2} direction='row' sx={{m:'40px',width:'auto',height:'auto',justifyContent:'start'}}>
                <Grid item sm={2} xs={12}>
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
                                        fullWidth/>
                                      )}onChange={(e,value)=>setSelectProd(value)}/>
                  </Grid>
                  <Grid item sm={2} xs={12}>
                      <Autocomplete
                                    id="combo-box-demo"
                                    options={storeData.customers}
                                    getOptionLabel={option => option.FirstName+' '+option.LastName}
                                    style={{ minWidth:'120px' }}
                                    renderInput={params => (
                                        <TextField
                                        {...params}
                                        label="Customers"
                                        variant="outlined"
                                        fullWidth/>
                                      )}onChange={(e,value)=>setSelectCustomer(value)}/>
                  </Grid>
                 
                  {filterDate?
                  <Grid item sm={2} xs={12}>
                  <LocalizationProvider dateAdapter={AdapterDateFns}>
                      <DesktopDatePicker
                          label="Date"
                          inputFormat="MM/dd/yyyy"
                          value={selectedDate}
                          onChange={setSelectedDate}
                          renderInput={(params) => <TextField {...params} />}
                     />
                  </LocalizationProvider>
                  
                  </Grid>:null}
                  <Grid xs={12} sm={0.5}>
                  <Tooltip title='Filter'>
                  <IconButton sx={{m:'20px'}} onClick={filterPurchases}>
                      <FilterAlt/>
                    </IconButton>
                    </Tooltip>
                    </Grid>
                    <Grid item sm={2} xs={12}>
                    <FormGroup>
                      <FormControlLabel  control={<Checkbox/>} label='Filter By Date' onChange={cbFilterByDate}/>
                    </FormGroup>
                  </Grid>
                </Grid>
            </Paper>
            <Paper style={{width:'auto'}}>
                  <Grid container direction='row' spacing={4} >
                      {purchasesCards.map(element=>
                        {
                          let customer=Utils.findElement(storeData.customers,'id',element.CustomerID)
                          let product=Utils.findElement(storeData.products,'id',element.ProductID)
                          return(
                            <Grid item xs={12} sm={4} >  
                                <PurchaseCardComp key={element.id} purchase={element} prod={product} customer={customer}/>
                            </Grid>
                          )
                        })}
                  </Grid>
            </Paper>
      </Box>
    );
  }
  
  export default PurchasesComp;
  
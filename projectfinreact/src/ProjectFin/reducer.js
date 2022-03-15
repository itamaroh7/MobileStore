
function reducer(state={totalAmount:0,products:[],customers:[],purchases:[],userRole:'user',user:{},pages:['Products']},action)
{
    switch(action.type)
    {
        case "INITPRODS":
            return {...state,products:action.payload}
        case "INITCUSTOMERS":
            return {...state,customers:action.payload}
        case "INITPURCHASES":
            return {...state,purchases:action.payload}
        case "INITTOTALAMOUNT":
            return {...state,totalAmount:action.payload}
        case "ADDTOTALAMOUNT":
            return {...state,totalAmount:state.totalAmount+action.payload}
        case "UPDATEPRODUCT":
            let idUpdate = action.payload.id;
            let arr = [...state.products]
            let index = arr.findIndex(x => x.id == idUpdate)
            if(index >= 0)
            {
                arr[index] = action.payload
            }
            return {...state,products:arr}
        case "DELETEPRODUCT":
            let idDel = action.payload;
            let arrDel= state.purchases.filter(element=>element.ProductID!=idDel)
            let arrProdDel=state.products.filter(element=>element.id!=idDel)
            return {...state,purchases:arrDel,products:arrProdDel}
        case "UPDATECUSTOMER":
            let idCustomerUpdate = action.payload.id;
            let arrCustom1 = [...state.customers]
            let indexCustomer = arrCustom1.findIndex(x => x.id == idCustomerUpdate)
            if(indexCustomer >= 0)
            {
                arrCustom1[indexCustomer] = action.payload
            }
            return {...state,customers:arrCustom1}
        case "DELETECUSTOMER":
            let idCustomerDel = action.payload;
            let arrCustomPurchasesDel= state.purchases.filter(element=>element.ProductID!=idCustomerDel)
            let arrCustomersDel=state.products.filter(element=>element.id!=idDel)
            return {...state,purchases:arrCustomPurchasesDel,products:arrCustomersDel}
        case "ADDPRODUCT":
            return {...state,products:[...state.products,action.payload]}
        case "INITUSERROLE":
            return {...state,userRole:action.payload}
        case "INITPAGES":
            return {...state,pages:action.payload}
        case "INITUSER":
            return {...state,user:action.payload}
        default:
            return state
    }
}

export default reducer
import React, { useContext, useEffect, useState } from'react'
import {auth} from'./firebaseApp'
import firebase from './firebaseApp'
import {useDispatch} from 'react-redux'
import Utils from './Utils'

const AuthContext=React.createContext()


export function useAuth()
{
    return useContext(AuthContext)
}

export function AuthProvider({children})
{
    const dispatch=useDispatch()
    const [currentUser,setCurrentUser] = useState()
    const [loading,setLoading] = useState(true)

    function signup(email,password,userName,fName,lName,city){
        return auth.createUserWithEmailAndPassword(email,password)
        .then(data=>{
            firebase.firestore().collection('Users').add({FirstName:fName,LastName:lName,City:city,Email:email,Role:'user',userId:data.user.uid,userName:userName})
            .then(data2=>{
                dispatch({type:"INITUSERROLE",payload:'user'})
            })
        })
    }

    function login(email,password){
        return auth.signInWithEmailAndPassword(email,password)
        .then(data1=>{
            firebase.firestore().collection('Users').get()
            .then(data=>{
                let usersArr=[]
                data.forEach(doc=>{
                    usersArr.push({Role:doc.data().Role,userId:doc.data().userId})
                })
                let user=Utils.findElement(usersArr,'userId',data1.user.uid)
                dispatch({type:"INITUSERROLE",payload:user.Role})
                if(user.Role=='admin')
                {
                    dispatch({type:"INITPAGES",payload:['Products','Customers','Purchases']})
                }else
                {
                    dispatch({type:"INITPAGES",payload:['Products']})
                }
            })
        })
    }

    function logout(){
        return auth.signOut()
        .then(data=>{
            dispatch({type:"INITUSERROLE",payload:'user'})
            dispatch({type:"INITPAGES",payload:['Products']})
        })
    }

    function updatePassword(password)
    {
        return currentUser.updatePassword(password)
    }

    useEffect(()=>{
          const unsubscribe=  auth.onAuthStateChanged(user=>{
              setCurrentUser(user)
              setLoading(false)
        })

        return unsubscribe
    },[])

    const value={
        currentUser,
        signup,
        login,
        logout,
        updatePassword
    }
    return(

    <AuthContext.Provider value={value}>
        {!loading&&children}
    </AuthContext.Provider>
    )
}
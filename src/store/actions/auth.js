import * as actiontypes from './actionTypes' ;
import axios from 'axios' ;
//this will define the funcs on the action 


//this type is always have to be defined

export const authStart = () => {
   return { type : actiontypes.AUTH_START}
}


export const authSucces = (token,username) => {
   return { type : actiontypes.AUTH_SUCCESS,
    token : token,
    username : username
   }
}


export const authFail = error => {
    return{
    type : actiontypes.AUTH_FAIL,
    error : error
    }
}


export const authLogout= () => {
    localStorage.removeItem('username')
    localStorage.removeItem('user') ;
    localStorage.removeItem('expiry') ;


    return {
        type: actiontypes.AUTH_LOGOUT ,
        username:null,
        token:null,
        email:null
    }
}




//CONVIENINECE METHOD


export const checkauthtimeout = expiry =>{
    return dispatch =>{
        setTimeout(() =>{
            dispatch(authLogout()) ;
        }
        ,expiry*1000) ;
    }
}






export const authLogin = (username,password) =>{
    //dispach is a method that is call to action
    return dispatch => {
        localStorage.setItem('username',username) ;
        dispatch(authStart()) ;
        axios.defaults.headers={
            'Content-Type':'application/json'
        }
        axios.post("/rest-auth/login/",
        {
            username:username, 
            password : password
        })


        .then( res => {
            
            const token = res.data.key ;
            const expiry = new Date( new Date().getTime() + 3600*1000) ;
            localStorage.setItem('token',token) ;
            localStorage.setItem('expiry',expiry) ;
            const username =localStorage.getItem('username') ;
            dispatch(authSucces(token,username)) ;
            dispatch(checkauthtimeout(3600)) ;
            console.log("Logged in")

        })
        .catch(err => {
            if(err!=={}){
            dispatch(authFail(err))
            }
            localStorage.setItem('username','') ;
        })
    }
}







export const authSignUp = (username,email,pass1,pass2) =>{
    //dispach is a method that is call to action
    return dispatch => {
        localStorage.setItem('username',username) ;
        dispatch(authStart()) ;
        axios.post("/rest-auth/registration/",
        {
            username:username, 
            email:email,
            password1: pass1,
            password2 : pass2 
        })
        .then( (res) => {
           // console.log("error")
            const token = res.data.key ;
            const username =localStorage.getItem('username') ;

            
            const expiry = new Date( new Date().getTime() + 3600*1000) ;
            localStorage.setItem('token',token) ;
            localStorage.setItem('expiry',expiry) ;
            ;
            dispatch(authSucces(token,username)) ;
            // axios.defaults.headers={
            //     'Content-Type':'application/json',
            //     'Authorization':`Token ${token}`
            // }
            // axios.post('http://127.0.0.1:8000/rest-auth/registration/verify-email/',{
            //     'key':token
            // })
            dispatch(checkauthtimeout(3600)) ;
            

        })
        .catch((err) => {
            localStorage.setItem('username','') ;
            console.log(err)
            if(err.response){
                //console.log(err.response.status,err.response.data)
                dispatch(authFail(err.response.data))
            }else if(err.request){
                dispatch(authFail(err.request))
            }else{
                if(err!=={}){
                dispatch(authFail(err))
                }
            }
            
        })
    }
}










export const authCheckState = () => {
    return dispatch => {
        const token = localStorage.getItem('token') ;
        if (token === undefined){
            dispatch(authLogout()) ;
        }else {
            const expiry = new Date(localStorage.getItem('expiry')) ;
            if (expiry <= new Date()) {
                dispatch(authLogout()) ;
            }else {
                const username  = localStorage.getItem('username')
                dispatch(authSucces(token,username)) ;
                dispatch(checkauthtimeout((expiry.getTime() -new Date().getTime())/1000)) ;

            }
        }
    }
}







export const socialLogin = (response,provider,redirect) => {
    return dispatch => {
        dispatch(authStart()) ;
        axios.defaults.headers={
            'Content-Type':'application/json'
        }
    
      axios.post(`/api/login/social/token_user/${provider}/`,{
        "method" : "POST",
        "mode" : "cors" ,
        "code" :response.code,
         "redirect_uri" : redirect,
        "provider" : provider
      }
        ).then(res =>{
            
            const token = res.data.token ;
            const expiry = new Date( new Date().getTime() + 3600*1000) ;
            localStorage.setItem('token',token) ;
            sessionStorage.setItem('userdata',res)
            sessionStorage.getItem('userdata')
            localStorage.setItem('expiry',expiry) ;
            dispatch(authSucces(token,res.data.username)) ;
            dispatch(checkauthtimeout(3600)) 
      }).catch(err => {
        dispatch(authFail(err))
    })


    }
}









export const authlogout = (key)=>{
    return dispatch =>{
        axios.defaults.headers ={
            'Content-Type':'application/json',
            'Authorization':`Token ${key}`
        }
        axios.post("/rest-auth/logout/",{
            key
        }).then(res=>{
            console.log("logged out ")
            dispatch(authLogout())
        }).catch(err=>{
            dispatch(authFail(err))
        })
    }
}
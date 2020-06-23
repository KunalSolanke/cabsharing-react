import * as actiontypes from './actionTypes' ;
import axios from 'axios' ;

export const add_message =(message) => {

    return {
        type:actiontypes.ADD_MESSAGE,
        message: message
    }
}


export const set_messages =(messages) => {
    return {
        type:actiontypes.SET_MESSAGES,
        messages: messages
    }
}

export const online =(username)=>{
    return {type:actiontypes.ONLINE,
    onlineusernames:username
    }
}

export const typing =(username,type)=>{
    console.log(type)
    return {type:actiontypes.TYPING,
      on:type,
    typeusernames:username,
    }
}

export const getUserchatSuccess = (chats) => {
    return {
        type: actiontypes.GET_CHAT_SUCCESS ,
        chats: chats
    }
}



export const getuserchats =(username,token) =>{
  return dispatch => {
    axios.defaults.headers = {
        'Content-Type' : 'application/json',
        'Authorization' : `Token ${token}`


    }
    axios.get(`http://127.0.0.1:8000/capi/${username}/chats/`)
		.then(res => {
			    dispatch(getUserchatSuccess(res.data))
			
		
		})
}
}

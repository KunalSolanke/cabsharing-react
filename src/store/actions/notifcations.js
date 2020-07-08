import * as actiontypes from './actionTypes' ;

export const add_message =(message) => {

    return {
        type:actiontypes.ADD_NOTIFICATION,
        message: message
    }
}


export const set_messages =(messages) => {
    return {
        type:actiontypes.SET_NOTIFICATIONS,
        messages: messages
    }
}

export const status =(status)=>{
    // console.log(status.username)
    return {
        type:actiontypes.STATUS,
        obj:{
            username:status.name,
            status:status.status
        }
    }
}

export const fetchstatus=(obj)=>{
    return {
        type:actiontypes.FETCH_STATUS,
        status:obj
    }
}
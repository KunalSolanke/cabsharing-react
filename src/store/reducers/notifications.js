import * as actionTypes from '../actions/actionTypes' ;
import { UpdatedObj} from '../utility'




const intialState = {
    messages: [] ,
    user_status:[]
}

export const addmessage= (state,action) =>{
    return UpdatedObj(state,{
        messages: [action.message,...state.messages]
    })
}

export const setmessages= (state,action) =>{
    return UpdatedObj(state,{
        messages: action.messages
    })
}


export const getchatsuccess= (state,action) =>{
    return UpdatedObj(state,{
       chats: action.chats
    })
}

export const status =(state,action)=>{
    const   obj=action.obj
    const new_arr=state.user_status.map(o=>{
        if(o.username===obj.username){
            return obj
        }else {
            return o
        }
    })
  
    return UpdatedObj(state,{
        user_status:new_arr})
}

export const fetchstatus = (state,action)=>{
    return UpdatedObj(state,{
        user_status:action.status
    })
}


const reducer = (state=intialState,action) => {
    switch(action.type){
        case actionTypes.ADD_NOTIFICATION: return addmessage(state,action)
        case actionTypes.SET_NOTIFICATIONS : return setmessages(state,action)
        case actionTypes.STATUS: return status(state,action)
        case actionTypes.FETCH_STATUS:return fetchstatus(state,action)

        default: return state
    }
}

export default reducer
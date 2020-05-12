import * as actionTypes from '../actions/actionTypes' ;
import { UpdatedObj} from '../utility'




const intialState = {
    messages: [] ,
    chats : []
}

export const addmessage= (state,action) =>{
    return UpdatedObj(state,{
        messages: [...state.messages,action.message]
    })
}

export const setmessages= (state,action) =>{
    return UpdatedObj(state,{
        messages: action.messages.reverse()
    })
}


export const getchatsuccess= (state,action) =>{
    return UpdatedObj(state,{
       chats: action.chats
    })
}


const reducer = (state=intialState,action) => {
    switch(action.type){
        case actionTypes.GET_CHAT_SUCCESS : return getchatsuccess(state,action)
        case actionTypes.ADD_MESSAGE : return addmessage(state,action)
        case actionTypes.SET_MESSAGES : return setmessages(state,action)
        default: return state
    }
}

export default reducer
import * as actionTypes from '../actions/actionTypes' ;
import { UpdatedObj } from '../utility' ;

const intialstate = {
    showAddChatPopup : false
}

export const  openchatpopup = (state,action)=>{
    return UpdatedObj(state,{
        showAddChatPopup: true
    })
}

export const  closechatpopup = (state,action)=>{
    return UpdatedObj(state,{
        showAddChatPopup: false
    })
}

const reducer = (state=intialstate,action) => {
    switch(action.type){
        case actionTypes.OPEN_ADD_CHAT_POPUP : return openchatpopup(state,action)
        case actionTypes.CLOSE_ADD_CHAT_POPUP : return closechatpopup(state,action)
        default: return state
    }
}


export default reducer ;
import * as actiontypes from './actionTypes' ;



export const open_chat_popup = () => {
    return {
        type : actiontypes.OPEN_ADD_CHAT_POPUP
    }
}


export const close_chat_popup = () => {
    return {
        type : actiontypes.CLOSE_ADD_CHAT_POPUP
    }
}
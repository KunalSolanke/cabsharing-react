import * as actionTypes from '../actions/actionTypes' ;
import { UpdatedObj} from '../utility'




const intialState = {
    messages: [] ,
    chats : [],
    typeusernames:[],
    onlineusernames:[]
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

export const online =(state,action)=>{
    
    return UpdatedObj(state,{
        onlineusernames:[...state.onlineusernames,action.onlineusernames]    })
}

export const typing =(state,action)=>{
   //console.log(action.on)
   if(action.on==='stop'){
       //console.log('here')
       //console.log(state.typeusernames)
       let usernames = []
       state.typeusernames.forEach(u=>{
           if(u.name !== action.typeusernames.name){
               usernames.push(u)
           }
       })
       return UpdatedObj(state,{
           typeusernames:usernames
       })
   }
   let b=false 
   state.typeusernames.forEach(u=>{
       if(u.name===action.typeusernames.name){
         b=true 
       }
   })
    if(b){
        return UpdatedObj(state,{
            typeusernames:[...state.typeusernames]
        })
    }
    return UpdatedObj(state,{
        typeusernames:[...state.typeusernames,action.typeusernames]
    })
}

const reducer = (state=intialState,action) => {
    switch(action.type){
        case actionTypes.GET_CHAT_SUCCESS : return getchatsuccess(state,action)
        case actionTypes.ADD_MESSAGE : return addmessage(state,action)
        case actionTypes.SET_MESSAGES : return setmessages(state,action)
        case actionTypes.TYPING: return typing(state,action)

        default: return state
    }
}

export default reducer
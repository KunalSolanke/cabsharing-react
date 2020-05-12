//import { connect } from "react-redux"


class WebscoketService {

    static instance = null ;
    static getInstance(){
        if(!WebscoketService.instance){
            WebscoketService.instance = new WebscoketService() ;
        }
        return WebscoketService.instance
    }


    callback = {}


    constructor(){
        this.socketRef = null
    }

    connect(chatUrl){
        if(chatUrl) {
           
        const path = `ws://127.0.0.1:8000/ws/chat/${chatUrl}/` ;
        // console.log(path)
        this.socketRef = new WebSocket(path) ;
        // console.log('connect')


        this.socketRef.onopen = e => {
           
            // console.log("websocket open")
        }
        // this.socketNewMessage(JSON.stringify({message:{
        //     command:'fetch_messages'
        // }}))
        this.socketRef.onmessage = e => {
            // console.log(e.data)
            this.socketNewMessage(e.data)
            // console.log('websocket sending')
        }

        this.socketRef.onerror = e =>{
            console.log(e)
           
        }

        this.socketRef.onclose =() => {
            console.log("closed") ;
            this.connect() ;

            ///this is reconnecting
        }

    }
}



    socketNewMessage(data) {
        const parsedata= JSON.parse(data) ;
        if(parsedata.message){
        // console.log(parsedata.message)
      
        const command = parsedata.message.command;
        // console.log("this is" ,command)
        // console.log(this.callback)
        

        //we will see if there is call or not 

        if(Object.keys(this.callback).length === 0) {
            return
        }
        
        if (command === 'messages'){
           
            this.callback[command](parsedata.messages)
        } 
        if (command === 'new_message'){
            console.log(parsedata.message['message'])
            this.callback[command](parsedata.message['message'])
        }}else{
            
        const command = parsedata.command;
        // console.log("this is" ,command)
        // console.log(this.callback)

        //we will see if there is call or not 

        if(Object.keys(this.callback).length === 0) {
            return
        }
        
        if (command === 'messages'){
            this.callback[command](parsedata.messages)
        } 
        if (command === 'new_message'){
            
            this.callback[command](parsedata.message['message'])

        }
    }
    }

        fetchMessages(username,id){
            this.sendMessage({command: 'fetch_messages',username:username,chatId:id})
        }

        newChatMessage(message){
            this.sendMessage({command: 'new_message',from:message.from,message: message.content,chatId:message.id})
        }

        addCallbacks(messagesCallback,newMessagecallback){
            this.callback['messages'] = messagesCallback ;
            this.callback['new_message'] = newMessagecallback ;
        }

        disconnect(){
            return this.socketRef.close() ;
        }


        sendMessage(data) {
            try{
                this.socketRef.send(JSON.stringify({...data}))

            }catch(err){
                console.log(err.message +"error")

            }
        }
       state(){
           return this.socketRef.readyState ;
       }

        //wait for connection to be steaty

        WaitForSocketConnection(callback) {
        const socket = this.socketRef ;
         const recursion = this.WaitForSocketConnection ;
         
         setTimeout(
             function(){
                if (socket.readyState === 1 ) {
                    console.log("connetion is secure") ;
                    if(callback != null) {
                        callback() ;
                    }
                    return ;
                }else {
                    console.log("waiting for connection ...")
                    recursion(callback) ;
                }

              
            }
         ,1) ;}
        
}


const WebscoketServiceInstance = WebscoketService.getInstance() ;


export default WebscoketServiceInstance ;

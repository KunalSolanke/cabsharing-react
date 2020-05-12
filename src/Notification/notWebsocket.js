
class NotWebscoketService {

    static instance = null ;
    static getInstance(){
        if(!NotWebscoketService.instance){
            NotWebscoketService.instance = new NotWebscoketService() ;
        }
        return NotWebscoketService.instance
    }


    callback = {}


    constructor(){
        this.socketRef = null
    }

    connect(){
       
           
        const path = `ws://127.0.0.1:8000/ws/notify_IIT/` ;
     
        this.socketRef = new WebSocket(path) ;
       

        this.socketRef.onopen = e => {
           console.log('not opened')
           
        }
      
        this.socketRef.onmessage = e => {
          
            this.socketNewMessage(e.data)
          
        }

        this.socketRef.onerror = e =>{
            console.log(e)
           
        }

        this.socketRef.onclose =() => {
            console.log("closed") ;
            this.connect() ;

          
        }

    }




    socketNewMessage(data) {
        const parsedata= JSON.parse(data) ;
        console.log(parsedata)
        if(parsedata.message){

        
        const command = parsedata.message.command;
       

        if(Object.keys(this.callback).length === 0) {
            return
        }
        
        if (command === 'notifications'){
           
           
            this.callback[command](parsedata.notifications)
        } 
        if (command === 'new_notification'){
            console.log(parsedata.message['notification'])
            this.callback[command](parsedata.message['notification'])
        }}else{
            
            
        const command = parsedata.command;
        

        if(Object.keys(this.callback).length === 0) {
            return
        }
        
        if (command === 'notifications'){
            
            this.callback[command](parsedata.notifications)
        } 
        if (command === 'new_notification'){
            
            this.callback[command](parsedata.notification['notification'])

        }
    }
    }

        fetchMessages(username){
            console.log('hi') ;
            this.sendMessage({command: 'fetch_notifications',username:username})
        }

        newChatMessage(notification){
            console.log(notification.from)
            this.sendMessage({command: 'new_notification',
            type:notification.type,
            from:notification.from,
            to:notification.to,
            notification:notification.notification,
            bookfromid:notification.bookfromid,
            booktoid : notification.booktoid
            })
        }

        addCallbacks(messagesCallback,newMessagecallback){
           
            this.callback['notifications'] = messagesCallback ;
            this.callback['new_notification'] = newMessagecallback ;
        }

        disconnect(){
            return this.socketRef.close() ;
        }


        sendMessage(data) {
            try{
                console.log(JSON.stringify({...data}))
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


const NotWebscoketServiceInstance = NotWebscoketService.getInstance() ;


export default NotWebscoketServiceInstance ;

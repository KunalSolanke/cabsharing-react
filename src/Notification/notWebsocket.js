import { DeviceUUID} from 'device-uuid'
import {store} from '../index';


class NotWebscoketService {

    static instance = null ;
    
    static getInstance(){
        if(!NotWebscoketService.instance){
            NotWebscoketService.instance = new NotWebscoketService() ;
        }
        return NotWebscoketService.instance
    }


    callback = {}
    reconnect = 1

    constructor(){
        this.socketRef = null
        this.counter = 0 
        this.did=new DeviceUUID().get()
    }

    connect(name){
       
           
                    const path = `ws://127.0.0.1:8000/ws/notify_IIT/` ;
                
                    this.socketRef = new WebSocket(path) ;
                    //console.log(this.socketRef)
                

                    this.socketRef.onopen = e => {
                        this.counter+=1 ;
                    //console.log('not opened')
                    const state =store.getState()
                    this.socketRef.send(JSON.stringify({
                        'command':'check_status',
                        'type':'connected',
                        'device_id':this.did,
                        'username':state.auth.username
                        

                    }))
                    //    while(this.state()){
                    //        setInterval(()=>{
                    //            this.socketRef.send(JSON.stringify({
                    //                'command':'check_status',
                    //                 'type':'check',
                    //                 'device_id':this.did,
                    //                 'username':name
                    //            }))
                    //        },5*1000*60)
                    //    }

                    if(this.counter===22){
                        this.destroy()
                    }
                    
                    }
                
                    this.socketRef.onmessage = e => {
                    
                        this.socketNewMessage(e.data)
                    
                    }

                    this.socketRef.onerror = e =>{
                        console.log(e)
                    
                    }

                    this.socketRef.onclose =(e) => {
                        //console.log("closed",this.reconnect) ;
                        //check this
                        if(this.reconnect){
                        this.connect() ;
                        }
                        this.reconnect=1

                    
                    }

    }



    check_statusloop(name){
             while(this.state()){
               setInterval(()=>{
                   this.socketRef.send(JSON.stringify({
                       'command':'check_status',
                        'type':'check',
                        'device_id':this.did,
                        'username':store.state.auth.username
                   }))
               },5*1000*60)
           }

    }



    //EVENTS
    

    fetchstatus(username){
        this.sendMessage({
            command:'fetch_status',
            device_id:this.did,
             username:username
        })
    }




    //RECEIVING MESSAGES


    socketNewMessage(data) {
                    const parsedata= JSON.parse(data) ;
                    //console.log(parsedata)
                    if(parsedata.message){

                    
                    const command = parsedata.message.command;
                

                    if(Object.keys(this.callback).length === 0) {
                        return
                    }
                    
                    if (command === 'notifications'){
                    
                    
                        this.callback[command](parsedata.notifications)
                    } 
                    if (command === 'new_notification'){
                       // console.log(parsedata.message['notification'])
                        this.callback[command](parsedata.message['notification'])
                    }
                    if(command==='status'){
                       // console.log(parsedata.message['status'])
                        this.callback[command](parsedata.message['status'])
                    }
                    if(command==='fetch_status'){
                        //console.log(parsedata.message['status'])
                        this.callback[command](parsedata.message['status'])
                    }
                    }else{
                        
                        
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
                    if(command==='fetch_status'){
                        this.callback[command](parsedata.status)
                    }
                }
    }









    fetchMessages(username){
           // console.log('hi') ;
            this.sendMessage({command: 'fetch_notifications',username:username})
    }

    setreadandfetch(username,id){
            this.sendMessage({command: 'fetch_notifications',username:username,id})
    }

    newChatMessage(notification){
            //console.log(notification.from)
            this.sendMessage({command: 'new_notification',
            type:notification.type,
            from:notification.from,
            to:notification.to,
            notification:notification.notification,
            bookfromid:notification.bookfromid,
            booktoid : notification.booktoid,
            typeb:notification.typeb
            })
    }






    addCallbacks(messagesCallback,newMessagecallback,statuscallback,fetchstatuscallback){
           
            this.callback['notifications'] = messagesCallback ;
            this.callback['new_notification'] = newMessagecallback ;
            this.callback['status']=statuscallback
            this.callback['fetch_status']=fetchstatuscallback
    }












   disconnect(){
            // if(this.counter==1){
                setTimeout(()=>{
            this.socketRef.send(JSON.stringify({
                'command':'check_status',
                'type':'aboutt0close',
                'device_id':this.did
            }))
        },100)
            // }
            this.counter-=1 ;
            return this.socketRef.close() ;
    }
        
    destroy(){
            this.reconnect=0
            this.counter-=1 ;
            
            this.socketRef.close(3443,"Force stop")
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
            ,100) ;
        }
        
}









const NotWebscoketServiceInstance = NotWebscoketService.getInstance() ;


export default NotWebscoketServiceInstance ;

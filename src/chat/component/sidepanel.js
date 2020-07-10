import React, { Component } from 'react'
import Contact from './Contact' ;
import {connect} from 'react-redux' ;
import {withRouter} from 'react-router-dom' ;
import * as navactions from '../../store/actions/nav' ;
import * as msgactions from '../../store/actions/notifcations' ;
import * as chatactions from '../../store/actions/messages' ;
import ADDChatModal from '../container/Popup'
import NotWebscoketServiceInstance from '../../Notification/notWebsocket'
//import WebscoketServiceInstance from '../WebsocketService';




//MAPPING THE PROPS FROM STORE
const  mapStatetoProps = state =>{
	
	return {
		token : state.auth.token,
		username : state.auth.username,
		showpopup : state.nav.showAddChatPopup,
		chats : state.message.chats,
		status_user:state.notification.username,
		status:state.notification.status,
		messages:state.message.messages

	}

} ;



// ADDING STORE METHODS TO PROPS
const mapDispatchToprops = dispatch => {
	return {
	   addChat : () => dispatch(navactions.open_chat_popup()),
	   closeaddchatpopup :() => dispatch(navactions.close_chat_popup()),
	   getuserchats : (username,token) => dispatch(chatactions.getuserchats(username,token)),
	   addmessage : (message) => dispatch(msgactions.add_message(message)),
	   setmessage : (messages) => dispatch(msgactions.set_messages(messages)),
	   status:(status)=>dispatch(msgactions.status(status)),
	   fetchstatus:(obj)=>dispatch(msgactions.fetchstatus(obj)),
	//    online:(username,type) => dispatch(msgactions.online(username,type)),
	//    typing:(username,type) => dispatch(msgactions.typing(username,type))


	}
} ;



export class Sidepanel extends Component {


	constructor(props) {
		super(props)
		//INTIALIZING THE BASE NOTIFICATION SOCKET IF NOT ALREADY PRESENT
		this.initializeNot()
		//ADDING EVENTS CALLBACKS
        NotWebscoketServiceInstance.addCallbacks(this.props.setmessage.bind(this),this.props.addmessage.bind(this),this.props.status.bind(this),this.props.fetchstatus.bind(this))
        this.state = {
			chats: []
			 
		}
	}
	


 initializeNot(){
		if (NotWebscoketServiceInstance.counter===0){
		    NotWebscoketServiceInstance.connect(this.props.username)
		   //THIS FN MAKES SURE CONNECTION IS SECURE
		    this.waitforSocketConnection(()=>{
		        NotWebscoketServiceInstance.fetchstatus(this.props.username)
		         NotWebscoketServiceInstance.fetchMessages(this.props.username);
		 
	          // NotWebscoketServiceInstance.check_statusloop(this.props.username)
	        })
	}
  }



    // WAITING FOR THE PROPS TO LOAD IT TAKES SOME TIME 
	waitforauthdetials(){
		const component =this ;
		setTimeout(function(){
			if(component.props.token !== null  &&
				component.props.token !== undefined){
					console.log('getting')
					component.props.getuserchats(component.props.username,component.props.token)
					return 

			} else {
					console.log("waiting")
					component.waitforauthdetials()
				}

		})
	}



	//MOUNT
	
	componentDidMount(){
		
		this.waitforauthdetials()
		//console.log(this.props.chats)
	}



	// RECURSIVE FN

	waitforSocketConnection(callback) {
        const component = this
        // const socket = this.socketRef ;
        //  const recursion = this.WaitForSocketConnection ;
         
         setTimeout(
             function(){
                if (NotWebscoketServiceInstance.state() === 1 ) {
                    console.log("connetion is secure") ;
                        callback() ;
                
                    return ;
                }else {
                    console.log("waiting for connection ...")
                    component.waitforSocketConnection(callback)
                    // recursion(callback) ;
                }

              
            }
		 ,100) ;
	}
		 


	//CHAT POPUP
        
	openaddchatpop =() =>{
		this.props.addChat() ;
	}



	
    render() {
		const activechats= this.props.chats.map(chat =>{
			var c=[];
		   var m = this.props.messages.filter(m=>parseInt(m.chatId)===parseInt(chat.id))
		   const x=[] 
			c=chat.participants.map(person=>{
				if(person!==this.props.username){
					x.push(person)

				}
				return
			})
			console.log(chat.participants,c,x)
			
			
			console.log(m)
		
			 return (<>
			<Contact id = {chat.id} number={parseInt(chat.id)!==parseInt(this.props.match.params.chatId)?m.length:0}
			
			author={x}/>
			
			</>
		)})
        return (
            <div className="col-sm-8 col-xs-8  col-md-4 col-xl-3 col-10 chat"><div className="card cardx mb-sm-3 mb-md-0 contacts_card">
					<div className="card-header cardx-header">
						<div className="input-group">
							<input type="text" placeholder="Search..." name="" className="form-control search" />
							<div className="input-group-prepend">
								<span className="input-group-text search_btn"><i className="fas fa-search"></i></span>
							</div>
						</div>
					</div>
					<div className="card-body cardx-body contacts_body">
						<ul className="contacts">
						{activechats}
						</ul>
					</div>
					<div className="card-footer cardx-footer">
						<ADDChatModal 
						isVisible={this.props.showpopup}
						close ={() => this.props.closeaddchatpopup()}/ >
					</div>
				</div></div>
        )
    } 
}

export default withRouter(connect(mapStatetoProps,mapDispatchToprops)(Sidepanel)) ;






























////// UNSAFE_componentWillUpdate(newProps) {
	// 	if(newProps.token !== null && newProps.username !=null){
		
	// 	if(newProps.token !== this.props.token  && newProps.username !=this.props.username ){
			
	// 		this.getuserchats(newProps.token,newProps.username)

	// 	}
	// }
	// }




	// getuserchats(token,username){
	// 	axios.defaults.headers = {
	// 		'Content-Type' : 'application/json',
	// 		'Authorization' : `Token ${token}`


	// 	}
	// 	axios.get(`http://127.0.0.1:8000/capi/${username}/chats/`)
	// 	.then(res => {
			
	// 		this.setState({
	// 			chats: res.data
	// 		})
	// 		console.log(this.state.chats)
	// 	})
	// }


	// if(this.props.token && this.props.username ){
		
		// 	this.getuserchats(this.props.token,this.props.username)

		// }
		






		
	// getchatsockets(){
	// 	const component =this ;
	// 	if(component.props.chats.length!==0){
	// 	setTimeout(()=>{
	// 		component.props.chats.map(c=>{
	// 			WebscoketServiceInstance.connect(c.id)
	
	// 		  component.waitforSocketConnection(() => {
	// 				// WebscoketServiceInstance.addCallbacks(this.setMessages.bind(this),
	// 				// this.addMessage.bind(this)) ;
	// 				WebscoketServiceInstance.fetchMessages(this.props.username,this.props.match.params.chatId)
	// 			})
	
	// 		})
	// 	})
	// 	return 
	// }else {
	// 	component.getchatsockets()
	// }
//	}










	// componentWillReceiveProps(np){
	// 	if(np!==this.props || np.chats !==this.props.chats){
	// 		//this.waitforauthdetials()
	// 	}
	// }
	// componentWillReceiveProps(np){
	// 	if(np.chats!==this.props.chats){
	// 		np.chats.map(c=>{
	// 			WebscoketServiceInstance.connect(c.id)
	
	// 		  this.waitforSocketConnection(c.id,() => {
	// 				// WebscoketServiceInstance.addCallbacks(this.setMessages.bind(this),
	// 				// this.addMessage.bind(this)) ;
	// 				WebscoketServiceInstance.fetchMessages(this.props.username,this.props.match.params.chatId)
	// 			})
	
	// 		})
	// 	}

	// }
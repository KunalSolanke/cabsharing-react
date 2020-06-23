import React, { Component } from 'react'
import './chat.css' ;
import Sidepanel from './component/sidepanel';
import WebscoketServiceInstance from './WebsocketService';
import {connect} from 'react-redux' ;
import {withRouter} from 'react-router-dom'
import * as msgactions from '../store/actions/messages'




export class Chat extends Component {
  state = {
          message : ''   
    }


    initializeCHat(){
        if(this.props.match.params.chatId){
           
        WebscoketServiceInstance.connect(this.props.match.params.chatId)
        this.waitforSocketConnection(() => {
            // WebscoketServiceInstance.addCallbacks(this.setMessages.bind(this),
            // this.addMessage.bind(this)) ;
            WebscoketServiceInstance.fetchMessages(this.props.username,this.props.match.params.chatId)
        })
    }

    }
    constructor(props) {

        super(props)
        this.initializeCHat()
        WebscoketServiceInstance.addCallbacks(this.props.setmessage.bind(this),this.props.addmessage.bind(this),this.props.online.bind(this),this.props.typing.bind(this))
    
       
       
       
    }

    
    renderMessages = (messages) =>{
        const currentUser =this.props.username ;
        return messages.map((message)=>{
            if(message.author===currentUser){
                return  (
            <div className= "d-flex justify-content-end mb-4">
                <div class="msg_cotainer_send" ><span>{message['content']}</span></div>
                <div className="img_cont_msg"><img className="rounded-circle user_img_msg" alt =""src="https://static.turbosquid.com/Preview/001292/481/WV/_D.jpg" /></div>
            </div>)
            }
            else{
                return (
                <div className="d-flex justify-content-start mb-4">
                    <div className="img_cont_msg"><img className="rounded-circle user_img_msg" alt=""src="https://static.turbosquid.com/Preview/001292/481/WV/_D.jpg" /></div>
                    <div class="msg_cotainer"><span>{message['content']}</span></div>
                    
                </div>
                )

          }}
          )
    
    } 



    waitforSocketConnection(callback) {
        const component = this
        // const socket = this.socketRef ;
        //  const recursion = this.WaitForSocketConnection ;
         
         setTimeout(
             function(){
                if (WebscoketServiceInstance.state() === 1 ) {
                    console.log("connetion is secure") ;
                        callback() ;
                
                    return ;
                }else {
                    console.log("waiting for connection ...")
                    component.waitforSocketConnection(callback)
                    // recursion(callback) ;
                }

              
            }
         ,100) ;}
         componentDidMount(){
            
         }
          UNSAFE_componentWillUpdate(newProps){
              console.log(newProps.typistlog)
              if(newProps !== this.props){    
              
              if(newProps.match.params.chatId){
                  if(newProps.match.params.chatId !== this.props.match.params.chatId){
                      
                WebscoketServiceInstance.disconnect()
                WebscoketServiceInstance.connect(newProps.match.params.chatId)
                this.waitforSocketConnection(() => {
                    
                    WebscoketServiceInstance.fetchMessages(newProps.username,newProps.match.params.chatId)
                    WebscoketServiceInstance.online(this.props.username)
                })}
            }
              
            
              }
              
          }

    submithandler = (event) => {
       
      
        
        event.preventDefault() ;
       
        const MessageObj = {
            from : this.props.username,
            content : this.state.message,
            id:this.props.match.params.chatId
        }
        WebscoketServiceInstance.newChatMessage(MessageObj) ;
        this.setState({
            message: ''
        })
        WebscoketServiceInstance.typing(this.props.username,'stop')

       

    }


    changehandler = (event) => {
        this.setState({
            message : event.target.value
        })
       
        if(this.state.message!== ''){
        WebscoketServiceInstance.typing(this.props.username,'start') ;
        }else{
            WebscoketServiceInstance.typing(this.props.username,'stop')
        }
        
    }
    
    render() {
    
        return (
            <div className="bdy container-fluid h-100">
			<div className="row justify-content-center h-100">
				<Sidepanel />
                {
                this.props.match.params.chatId ? 
				<div className="col-md-8 col-xl-6 chat">
					<div className="card cardx">
						<div className="card-header msg_head ">
							<div className="d-flex bd-highlight">
								<div className="img_cont">
									<img src="https://static.turbosquid.com/Preview/001292/481/WV/_D.jpg" alt="" className="rounded-circle user_img" />
									<span className="online_icon"></span>
								</div>
								<div className="user_info">
									<span>Chat</span>
								
								</div>
								<div className="video_cam">
									<span><i className="fas fa-video"></i></span>
									<span><i className="fas fa-phone"></i></span>
								</div>
							</div>
							<span id="action_menu_btn"><i className="fas fa-ellipsis-v"></i></span>
							<div className="action_menu">
								<ul>
									<li><i className="fas fa-user-circle"></i> View profile</li>
									<li><i className="fas fa-users"></i> Add to close friends</li>
									<li><i className="fas fa-plus"></i> Add to group</li>
									<li><i className="fas fa-ban"></i> Block</li>
								</ul>
							</div>
						</div>
						<div className="card-body cardx-body msg_card_body" id="chat-log">
                            {this.props.messages && this.renderMessages(this.props.messages)}
							
						</div>
                        <div className="d-flex flex-row-reverse typing">
                            
                            {
                            this.props.typistlog.map(t =>{
                                return t.name!==this.props.username?(
                                    <div className="py-2 type bx-2 border-4">
                                        {t.name} is typing.....
                                        </div>
                                ):<></> 
                            })}
                        </div>
						<div className="cardx-footer card-footer">
                            <form onSubmit ={this.submithandler} >
							<div className="input-group">
								<div className="input-group-append" >
									<span className="input-group-text attach_btn" ><i className="fas fa-paperclip"></i></span>
								</div>
								<textarea onChange={this.changehandler} name="" className="form-control type_msg" placeholder="Type your message..." id="chat-message-input" value={this.state.message}></textarea>
								<div className="input-group-append" >
									<button htmlType="submit" id="chat-message-submit" class="btn btn-primary" value="Send" >Submit
										</button>
                                          
								</div>
							</div>
                            </form>
						</div>
					</div>
                </div>
                : <></>}
			</div>
        </div>
		
        )
    }
}

const mapStateToprops = state => {
    return {
        username : state.auth.username,
        messages : state.message.messages,
        typistlog:state.message.typeusernames,
        online:state.message.onlineusernames
    }
}


const mapDispatchToprops = dispatch => {
    return {
        addmessage : (message) => dispatch(msgactions.add_message(message)),
        setmessage : (messages) => dispatch(msgactions.set_messages(messages)),
        online:(username,type) => dispatch(msgactions.online(username,type)),
        typing:(username,type) => dispatch(msgactions.typing(username,type)),
    }
}


export default withRouter(connect(mapStateToprops,mapDispatchToprops)(Chat))


// componentDidMount(){
    //     WebscoketServiceInstance.connect()
    // }

    // setMessages(messages){
    //     this.setState({
    //         messages : messages.reverse()
    //     })
       
    // }

    // addMessage(message) {
    //     console.log('added')
    //     this.setState({
    //         messages : [...this.state.messages,message.message ]
    //     })
    //     console.log(this.state.messages)
    // }

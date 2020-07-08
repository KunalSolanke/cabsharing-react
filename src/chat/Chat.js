import React, { Component } from 'react'
import './chat.css' ;
import Sidepanel from './component/sidepanel';
import WebscoketServiceInstance from './WebsocketService';
import {connect} from 'react-redux' ;
import {withRouter} from 'react-router-dom'
import * as msgactions from '../store/actions/messages'
import {chats as c} from './WebsocketService'




export class Chat extends Component {
  state = {
          message : '',
          currentchat:[]
    }

    


    // INTIALIZE THE CHAT 
    initializeCHat(){
        if(this.props.match.params.chatId){
           
       WebscoketServiceInstance.connect(this.props.match.params.chatId)
        this.waitforSocketConnection(() => {
            //WebscoketServiceInstance.addCallbacks(this.setMessages.bind(this),
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


            if(message.chatId===this.props.match.params.chatId){
            if(message.author===currentUser){
                return  (
            <div className= "d-flex justify-content-end mb-4">
                
                <div class="msg_cotainer_send px-1"  ><p style={{marginBottom:'0rem',fontSize:'10px'}}>You</p>
                    <div><span>{message['content']}</span></div>
                    </div>
                
                <div className="img_cont_msg"><img className="rounded-circle user_img_msg" alt =""src="https://static.turbosquid.com/Preview/001292/481/WV/_D.jpg" /></div>
            </div>)
            }
            else{
                return (
                <div className="d-flex justify-content-start mb-4">
                    <div className="img_cont_msg"><img className="rounded-circle user_img_msg" alt=""src="https://static.turbosquid.com/Preview/001292/481/WV/_D.jpg" /></div>
                    
                    <div class="msg_cotainer px-1">
                    <p style={{marginBottom:'0rem',fontSize:'10px'}}>{message.author}</p>
                        <span>{message['content']}</span></div>
                    
                    
                </div>
                )

          }}}
          )
    
    } 
    




    waitforSocketConnection(callback) {
        const component = this
        // const socket = this.socketRef ;
        //  const recursion = this.WaitForSocketConnection ;   
         setTimeout(
             function(){
                if (WebscoketServiceInstance.state(component.props.match.params.chatId) === 1 ) {
                    console.log("connetion is secure") ;
                        callback() ;
                
                    return ;
                }else if(c[`${component.props.match.params.chatId}`]!==undefined){
                    if(c[`${component.props.match.params.chatId}`].readyState===1){
                        return

                    }
                }else {
                    console.log("waiting for connection ...")
                    component.waitforSocketConnection(callback)
                    // recursion(callback) ;
                }

              
            }
         ,100) ;}
         componentDidMount(){
            
    }
    









    //MESSAGE SUBMIT HANDLER
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
        WebscoketServiceInstance.typing(this.props.username,'stop',this.props.match.params.chatId)

       

    }

    componentDidUpdate(){
        setTimeout(()=>{
          if(this.props.username==='' || this.props.token===null ){
            this.props.history.push('/login')
          }
        },200)
      }
    

     // INPUT BOX CHANGE HANDLER -USED TO FIRE TYING EVENT
    changehandler = (event) => {
        this.setState({
            message : event.target.value
        })
       
        if(this.state.message!== ''){
        WebscoketServiceInstance.typing(this.props.username,'start',this.props.match.params.chatId) ;
        }else{
            WebscoketServiceInstance.typing(this.props.username,'stop',this.props.match.params.chatId)
        }
        
    }


    
    render() {
    
        return (
            <div className="bdy container-fluid h-100 px-3">
			<div className="row justify-content-center h-100">
				<Sidepanel />
                {
                this.props.match.params.chatId ? 
				<div className="col-md-8 col-xl-6 col-sm-10 col-10 chat">
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
                                return t.name!==this.props.username && this.props.chats.filter(c=>c.id===parseInt(this.props.match.params.chatId))[0].participants.includes(t.name)?(
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
        online:state.message.onlineusernames,
        chats:state.message.chats
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










      //    UNSAFE_componentWillUpdate(newProps){
        //  // console.log( this.props.chats.filter(c=>c.id===parseInt(newProps.match.params.chatId)),this.props.chats,newProps.match.params.chatId)
    
        //       console.log(newProps.typistlog)
        //       if(newProps !== this.props){    
              
        //       if(newProps.match.params.chatId){
        //           if(newProps.match.params.chatId !== this.props.match.params.chatId){
                      
        //         WebscoketServiceInstance.disconnect()
        //         WebscoketServiceInstance.connect(newProps.match.params.chatId)
        //         this.waitforSocketConnection(() => {
                    
        //             WebscoketServiceInstance.fetchMessages(newProps.username,newProps.match.params.chatId)
        //            // WebscoketServiceInstance.online(this.props.username)
        //         })}
        //     }
              
            
        //       }
              
        //   }
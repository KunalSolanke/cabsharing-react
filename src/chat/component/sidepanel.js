import React, { Component } from 'react'
import Contact from './Contact' ;
import {connect} from 'react-redux' ;
import {withRouter} from 'react-router-dom' ;
import * as navactions from '../../store/actions/nav' ;
import * as msgactions from '../../store/actions/messages' ;
import ADDChatModal from '../container/Popup'


const  mapStatetoProps = state =>{
	
	return {
		token : state.auth.token,
		username : state.auth.username,
		showpopup : state.nav.showAddChatPopup,
		chats : state.message.chats

	}

} ;


const mapDispatchToprops = dispatch => {
	return {
	   addChat : () => dispatch(navactions.open_chat_popup()),
	   closeaddchatpopup :() => dispatch(navactions.close_chat_popup()),
	   getuserchats : (username,token) => dispatch(msgactions.getuserchats(username,token))


	}
} ;

export class Sidepanel extends Component {
	constructor(props) {
		super(props)
	
		this.state = {
			chats: []
			 
		}
	}

	waitforauthdetials(){
		const component =this ;
		setTimeout(function(){
			if(component.props.token !== null  &&
				component.props.token !== undefined){
					component.props.getuserchats(component.props.username,component.props.token)
					return 

				} else {
					console.log("waiting")
					component.waitforauthdetials()
				}

		})
	}
	componentDidMount(){
		this.waitforauthdetials()
		
		

	}
	
	openaddchatpop =() =>{
		this.props.addChat() ;
	}
    render() {
		const activechats= this.props.chats.map(chat =>{ return (
			<Contact id = {chat.id}
			author={chat.participants}/>
		)})
        return (
            <div className="col-md-4 col-xl-3 chat"><div className="card mb-sm-3 mb-md-0 contacts_card">
					<div className="card-header">
						<div className="input-group">
							<input type="text" placeholder="Search..." name="" className="form-control search" />
							<div className="input-group-prepend">
								<span className="input-group-text search_btn"><i className="fas fa-search"></i></span>
							</div>
						</div>
					</div>
					<div className="card-body contacts_body">
						<ui className="contacts">
						{activechats}
						</ui>
					</div>
					<div className="card-footer">
						<ADDChatModal 
						isVisible={this.props.showpopup}
						close ={() => this.props.closeaddchatpopup()}/ >
					</div>
				</div></div>
        )
    } 
}

export default withRouter(connect(mapStatetoProps,mapDispatchToprops)(Sidepanel)) ;



// UNSAFE_componentWillUpdate(newProps) {
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
		
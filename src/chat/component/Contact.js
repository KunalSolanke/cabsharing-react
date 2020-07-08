import React, { Component } from 'react' ;
import {NavLink} from 'react-router-dom' ;
import {connect} from 'react-redux'
import {withRouter} from 'react-router-dom'


//This is the contact card in the sidepanel of the chats .Each card mentions the people 
//Who are in the chat and their status online,offline and away
//Also once connected to socket we can get the number of unread messages


export class Contact extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
			 chatperson:[],
			 person_status:[]
        }
	}
	



	//on mount
	componentDidMount(){
		

		//mappping status to perosn in the contact card
		const arr=this.props.author.map(a=>{
			return  this.props.personstatus.filter(x => x.username===a)[0]
		 })
		 //console.log(arr,this.props.author,this.props.personstatus)
		this.setState({
		   chatperson:this.props.author,
		   person_status:arr
		})
	
		
	}


	//when component is about to update
	UNSAFE_componentWillReceiveProps(np){
		if(np.author !==this.state.chatperson || np.props1!==this.props){
			
			const arr=np.author.map(a=>{
				return np.personstatus.filter(x => x.username===a)[0]
			})
			//console.log(arr,np.author,np.personstatus)
             this.setState({
				 chatperson:np.author,
				 person_status:arr
			 })
			// console.log(np.author)
				 
		}

	}
    
    render() {
		 const {person_status}=this.state
		 console.log(person_status)
        return (
            <li className="active position-relative">
				<NavLink to ={`/users/chat/${this.props.id}`} >
					{this.props.number>0?(
					<div className="text-center  position-absolute" style={{width:'30px',height:'30px',borderRadius:'100%',backgroundColor:'yellow',color:'black',top:'30%',right:'20px',padding:'.1rem'}}>
                       {this.props.number}
					</div>):null }
							<div className="d-flex bd-highlight">
								<div className="img_cont">
									<img src="https://static.turbosquid.com/Preview/001292/481/WV/_D.jpg" alt="" className="rounded-circle user_img" />
									<span className="online_icon"></span>
								</div>
								<div className="user_info d-flex flex-row">
									{person_status.length>0 ? person_status.map((a,i)=>{
										console.log(a)
										if(i!==person_status.length-1 && a!==undefined){
											return (<div style={{marginRight:'10px'}}><div><span>{a.username} and</span></div><div><p style={{fontSize:'11px'}}>{a.status}</p></div>  </div>)
										}else if(a!==undefined){return (<div><div><span>{a.username}</span></div><div><p style={{fontSize:'11px'}}>{a.status}</p></div></div>)}
									}) : ''}
									 
								</div>
							</div>
							
                        </NavLink>
						</li>
				
           
        )
    }
}
const mapStateToprops = state =>{
	return {
		personstatus:state.notification.user_status
	}
}

export default withRouter(connect(mapStateToprops,null)(Contact))


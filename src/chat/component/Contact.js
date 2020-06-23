import React, { Component } from 'react' ;


import {NavLink} from 'react-router-dom' ;

export class Contact extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
             
        }
    }
    
    render() {
		this.props.author.pop()
        return (
            <li className="active">
				<NavLink to ={`/users/chat/${this.props.id}`} >
							<div className="d-flex bd-highlight">
								<div className="img_cont">
									<img src="https://static.turbosquid.com/Preview/001292/481/WV/_D.jpg" alt="" className="rounded-circle user_img" />
									<span className="online_icon"></span>
								</div>
								<div className="user_info">
									{this.props.author.map((a,i)=>{
										if(i!==this.props.author.length-1){
											return (<span>{a}&</span>)
										}else{return (<span>{a}</span>)}
									})}
									 
								</div>
							</div>
							
                        </NavLink>
						</li>
				
           
        )
    }
}

export default Contact

import React, { Component } from 'react' ;


import {NavLink} from 'react-router-dom' ;

export class Contact extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
             
        }
    }
    
    render() {
        return (
            <li className="active">
				<NavLink to ={`/users/chat/${this.props.id}`} >
							<div className="d-flex bd-highlight">
								<div className="img_cont">
									<img src="https://static.turbosquid.com/Preview/001292/481/WV/_D.jpg" alt="" className="rounded-circle user_img" />
									<span className="online_icon"></span>
								</div>
								<div className="user_info">
									<span>{this.props.author[0]}</span>
									<p>Akash is online</p>
								</div>
							</div>
							
                        </NavLink>
						</li>
				
           
        )
    }
}

export default Contact

import React, { Component } from 'react'
import Chat from './Chat'
import * as msgactions from '../store/actions/messages'
import {withRouter} from 'react-router-dom' ;
import {connect} from 'react-redux'

export class Index extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
             
        }
       
    }
    
    componentDidMount(){
        console.log("hi")
        
    }
    render() {
        return (
        
               <Chat /> 
    
        )
    }
}



const mapDispatchToprops = dispatch => {
    return {
        addmessage : (message) => dispatch(msgactions.add_message(message)),
        setmessage : (messages) => dispatch(msgactions.set_messages(messages))
    }
}

export default withRouter(connect(null,mapDispatchToprops)(Index)) ;

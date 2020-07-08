import React, { Component } from 'react'
import axios from 'axios' ;
import {Card,Form,Button} from 'antd' ;
import UserLayout from '../../../../../containers/userLayout';

import {connect} from 'react-redux' ;
import {withRouter} from 'react-router-dom' ;



class BookingsDetail extends Component {


    constructor(props) {
        super(props)
        this.handleSubmit = this.handleSubmit.bind(this) ;
        this.state = {
             booking: {}
        }
    }

    handleSubmit(e){
       
       if(this.props.token !== null) {
        axios.defaults.headers = {
            "Content-Type" : "application/json" ,
            Authorization :"Token "+ this.props.token
        }
    
        const bookid = this.props.match.params.bookid ;
        axios.delete(`/uapi/bookings/${bookid}/`)
        this.props.history.push('/users') ;
        this.forceUpdate() ;
    }else {
        console.log('your session is ended')
    }
    }
    
    componentWillReceiveProps(newProps){

        if(newProps.token){
            axios.defaults.headers = {
                "Content-Type" : "application/json" ,
                Authorization :"Token "+ newProps.token}

        const bookid = this.props.match.params.bookid ;
        
        
        axios.get(`/uapi/bookings/${bookid}/`)
           .then(res => {
               //console.log("hi",res)
               this.setState({
                   booking:res.data
               }) ;
                //console.log(res.data)
           }) ;
        }
        

    }
    render() {
        return (
            <UserLayout>
                <Card title={this.state.booking.priority}>
                    <p>{this.state.booking.place}</p>
                </Card>
                <form onSubmit = {this.handleSubmit}>
                <Form.Item label="Delete">
                    <Button type ="danger"  htmlType="submit">Delete</Button>
                </Form.Item>
                </form>
               
                
            </UserLayout>
        )
    }
}


const mapStatetoprops = (state) => {
    return {
      
        token : state.auth.token
    }
}

export default withRouter(connect(mapStatetoprops,null)(BookingsDetail))

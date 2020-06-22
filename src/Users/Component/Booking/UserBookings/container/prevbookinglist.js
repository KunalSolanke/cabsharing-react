import React, { Component } from 'react'
import Booking from '../booking' ;
import axios from 'axios' ;
//import CustomForm from '../../BookingForm/form';
import UserLayout from '../../../../../containers/userLayout';
import {connect}  from 'react-redux' ;
import {withRouter} from 'react-router-dom' ;
import Absolutewrapper from '../../../../../components/Absolutewrapper';



class PrevBookingslist extends Component {


    constructor(props) {
        super(props)
    
        this.state = {
             bookings: []
        }
    }
    
    componentWillReceiveProps(newProps){
      
        console.log(newProps.token)
        if(newProps.token){
        axios.defaults.headers = {
            "Content-Type" : "application/json" ,
            Authorization : "Token " +newProps.token
        }
        axios.get("http://127.0.0.1:8000/uapi/prev/userbookings/")
           .then(res => {
               this.setState({
                   bookings:res.data
               }) ;
            
           }) 
        }

    }
    componentDidMount(){
        var nav= document.querySelector('.main-nav') ;
        nav.style.display = 'none' ;
    }
    render() {
        return (
            <Absolutewrapper>
            <UserLayout>
                  <div className="row justify-content-center align-items-center mb-3 p-3">
                <div className="col-lg-8 col-sm-10 col-xs-12">
                <Booking data={this.state.bookings} name="delete"/>     
                </div>         
                </div>
            </UserLayout>
            </Absolutewrapper>
        )
    }
}



const mapStatetoprops = (state) => {
    return {
      
        token : state.auth.token
    }
}

export default withRouter(connect(mapStatetoprops,null)(PrevBookingslist))

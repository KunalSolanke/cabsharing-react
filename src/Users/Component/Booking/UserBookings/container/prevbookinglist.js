import React, { Component } from 'react'
import Booking from '../booking' ;
import { List, Avatar ,Button} from 'antd';
import { MessageOutlined, LikeOutlined, StarOutlined} from '@ant-design/icons';
import axios from 'axios' ;
//import CustomForm from '../../BookingForm/form';
import UserLayout from '../../../../../containers/userLayout';
import {connect}  from 'react-redux' ;
import {withRouter} from 'react-router-dom' ;
import Absolutewrapper from '../../../../../components/Absolutewrapper';

const IconText = ({ icon, text }) => (
    <span>
      {React.createElement(icon, { style: { marginRight: 8 } })}
      {text}
    </span>
  );
  

class PrevBookingslist extends Component {


    constructor(props) {
        super(props)
        this.clickhandler = this.clickhandler.bind(this)
        this.state = {
             bookings: []
        }
    }

    clickhandler (e,id){
        e.preventDefault() ;
    }
    
    componentWillReceiveProps(newProps){
      
        console.log(newProps.token)
        if(newProps.token){
        axios.defaults.headers = {
            "Content-Type" : "application/json" ,
            Authorization : "Token " +newProps.token
        }
        axios.get("http://127.0.0.1:8000/uapi/booked/")
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
                <List
    itemLayout="vertical"
    size="large"
    pagination={{
      onChange: page => {
        console.log(page);
      },
      pageSize: 3,
    }}l̥   
    dataSource={this.state.bookings}
    
    renderItem={item => (
      <List.Item
        key={item.place}
        className="mb-3 booking"
        style={{backgroundColor:'#ccab9793'}}
        actions={[
          <IconText icon={StarOutlined} text="156" key="list-vertical-star-o" />,
          <IconText icon={LikeOutlined} text="156" key="list-vertical-like-o" />,
          <IconText icon={MessageOutlined} text="2" key="list-vertical-message" />,
        ]}
        extra={
          <img
            className="align-items-center text-center justify-content-center"
            width={272}
            alt="logo"
            src="https://gw.alipayobjects.com/zos/rmsportal/mqaQswcyDLcXyDKnZfES.png"
          />
        }
      >
        <List.Item.Meta
          avatar={<Avatar src={item.avatar} />}
          title={<a href={`/users/booked/${item.id}`}>Trip to {item.bookings[0].place}</a>}
          description={<p>Desciption:{item.special_req}</p>}
        />
         <div>
                <h4>People Onboard:</h4>
                {item.users.map(u=>{
        console.log(u.username,u['username'])
        return (
          <p>{u.username}</p>
        )
      }) }
       
              </div>
              <div>
                <p>Place:{item.bookings[0].place}</p>
                <p>Total:{item.total}</p>
                <p>Date:{item.bookings[0].date}</p>
              </div>
        <p>Urgency:{item.prirority}</p>
        <Button  className="bx-2 px-3 border-darken-2 bg-primary"   onClick={(event) => this.clickhandler(event,item.id)}>Cancel</Button>
        <Button  className="bx-2 bg-success px-3 border-darken-2"   onClick={(event) => this.clickhandler(event,item.id)}>Chat</Button>


      </List.Item>
    )}
  />
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

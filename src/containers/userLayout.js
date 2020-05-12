import React from 'react' ;
import './userLayout.css' ;
import {  Button,notification } from 'antd';
import {
  PieChartOutlined,
  TeamOutlined,
  UserOutlined,
  SmileOutlined
} from '@ant-design/icons';
import {NavLink} from 'react-router-dom' ;
import ProfileDrawer from '../components/Update';
import Profile from '../components/profile';
import Notifications from '../Notification/notifications'
import {connect} from 'react-redux' ;
import {withRouter} from 'react-router-dom'
import NotWebscoketServiceInstance from '../Notification/notWebsocket';

class UserLayout extends React.Component {

  initializeCHat(){
    
    NotWebscoketServiceInstance.connect()
    
    this.waitforSocketConnection(()=>{NotWebscoketServiceInstance.fetchMessages(this.props.username)})
}  
   constructor(props) {
     super(props)
     this.initializeCHat()
     this.state = {
        
     }
   }
   
  state = {
    collapsed: false,
    visiblep:false,
    visibles: false,
    visiblen: false
  };
 

  showDrawer1 = (e) => {
    e.preventDefault() ;
    this.setState({
      visiblep: true
  
    });
  };
  showDrawer2 = (e) => {
    e.preventDefault() ;
    this.setState({
     
      visibles:true
    });
  };
  showDrawer3 = (e) => {
    e.preventDefault() ;
    this.setState({
     
      visiblen:true
    });
  };

  onClose1 = () => {
    this.setState({
      visiblep: false
     
    });
  };
  onClose2 = () => { 
    this.setState({
      visibles: false
      
    });
  };
  onClose3 = () => {
    this.setState({
      visiblen: false
     
    });
  };

  onCollapse = collapsed => {
    console.log(collapsed);
    this.setState({ collapsed });
  };




  notification_confirm(username,key,idfrom,idto){
    const NotifyObj = {
      command: 'new_notification',
      from : this.props.username,
      to:username ,
      bookfromid: idfrom,
      booktoid:idto,
      type:'confirm',
      notification: `hello there !!${this.props.username} have accepted your request to go to look the booked scetion`

   }
   NotWebscoketServiceInstance.newChatMessage(NotifyObj) ;
   notification.open({
     message: 'Notification Title',
     description:
      'Your Request Sent Successfully',
     icon: <SmileOutlined style={{ color: '#108ee9' }} />,
   });
   notification.close(key)
  }
  componentDidMount(){
    NotWebscoketServiceInstance.disconnect()
  }

   
  UNSAFE_componentWillUpdate(newProps){
    console.log(newProps.messages.length)
    
   
    
    if(newProps.messages.length> this.props.messages.length) {
      if(newProps.messages[newProps.messages.length-1].to === newProps.username){
        const key = `open${Date.now()}`;
        // const btn = (
        //   <Button type="primary" size="small" onClick={() =>this.notification_confirm(message.from,key)}>
        //     Confirm Ride
        //   </Button>)
        console.log(newProps.messages)
        newProps.messages.map((message,i) =>
        notification.open({
          message: 'Match Request',
          description:message.content,
          btn:message.type === 'request'?<Button type="primary" size="small" onClick={() =>this.notification_confirm(message.author,key,message.bookfromid,message.booktoid)}>
          Confirm Ride 
        </Button>:<Button type="primary" size="small" onClick= {() =>notification.close(key)} >
          Ok
        </Button>,
          key,
            
          icon: <SmileOutlined style={{ color: '#108ee9' }} />,
        }))


    

      }
      
    }

  }

  waitforSocketConnection(callback) {
    const component = this
   
     setTimeout(
         function(){
            if (NotWebscoketServiceInstance.state() === 1 ) {
                console.log("connetion is secure") ;
                    callback() ;
            
                return ;
            }else {
                console.log("waiting for connection ...")
                component.waitforSocketConnection(callback)
               
            }

          
        }
     ,100) ;}

  

  render() {
    return (<div className ="hi">
    <header class="user-head ">
        
        <div className="container-fluid mb-2">
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark text-white ">
          <div style={{ width:"50%"}}>
            <a className="navbar-brand text-white" href="/users"><h3><i className="fa fa-car fa-white" aria-hidden="true"></i>Humraahi</h3></a>
            </div>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon  text-white"></span>
            </button>
            <div style={{width:"50%"}} className="collapse navbar-collapse text-white justify-content-around" id="navbarSupportedContent">
                <ul className="navbar-nav   text-white align-items-right">
                   <li className="nav-itemtext-white justify-content-around" style={{listStyleType:"none"}}>
                  
              <span><NavLink to='/users' style={{textDecoration:"none"}}><PieChartOutlined />Explore</NavLink></span>
                   </li>
                 
                   <li className="nav-item dropdown">
                       <a className="nav-link dropdown-toggle text-white" href="/#" id="navbarDropdown"  data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                       <span>
                         <TeamOutlined />
                          <span>Bookings</span>
                        </span>
                        </a>
                       
                        <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                           <NavLink exact to ="/users/Book" activeClassName="bg-dark text-white" className="dropdown-item" href="/#" >Book Your Ride</NavLink><br />
                           <NavLink exact to ="/users/pastbookings" activeClassName="bg-dark text-white" className="dropdown-item" href="/#">Previous bookings</NavLink><br />
                           
                           <NavLink exact to ="/users/bookinglist" activeClassName="bg-dark text-white" className="dropdown-item" href="/#">Current Bookings</NavLink>
                       </div>
                    </li>
                    <li className="nav-item dropdown">
                       <a className="nav-link dropdown-toggle text-white"  id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" href="/#">
                       <span>
                  <UserOutlined />
                       <span>Profile</span>
                       </span>
                        </a>                      
                        <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                           <a activeClassName="bg-dark text-white" className="dropdown-item" onClick={(e)=>this.showDrawer1(e)} href="/users/#">Profile</a><br />
                           <Profile visible ={this.state.visiblep}
                               onClose ={this.onClose1} />
                           <a activeClassName="bg-dark text-white" className="dropdown-item" onClick={(e)=>this.showDrawer3(e)} href="/users/#">Notifications</a><br />
                           <Notifications visible ={this.state.visiblen} onClose ={this.onClose3} />
                          <a activeClassName="bg-dark text-white" className="dropdown-item"onClick={(e)=>this.showDrawer2(e)}  href="/#">Settings</a>
                           <ProfileDrawer visible ={this.state.visibles}
                             onClose ={this.onClose2} />
                       </div>
                    </li>
                    <li className="nav-item dropdown" style={{listStyleType:"none"}}>
                       <a className="nav-link dropdown-toggle text-white"  id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"  href="/#">
                            Chat
                        </a>
                       
                        <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                           <NavLink exact to ="/users/chat" activeClassName="bg-dark text-white" className="dropdown-item" style={{textDecoration:"none"}}>Friends</NavLink><br />
                           <NavLink exact to ="/users/globalchat" activeClassName="bg-dark text-white" className="dropdown-item" style={{textDecoration:"none"}}  >Global</NavLink><br />
                        </div>
                           
                    </li>
               </ul>
               
           </div>
        
        </nav>
        </div>
        
            </header>
            <div className="container-fluid">
              
              {this.props.children}
            
            </div>
          

      </div>
    );
  }
}


const mapStateToprops = state => {
    return {
        username : state.auth.username,
        messages : state.message.messages
    }
}


export default withRouter(connect(mapStateToprops,null)(UserLayout))



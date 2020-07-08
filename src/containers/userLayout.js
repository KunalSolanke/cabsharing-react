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
import * as actions from '../store/actions/auth'
import PassForm from '../components/changepassword'
import * as msgactions from '../store/actions/notifcations'








//NAV FOR THE USERS


class UserLayout extends React.Component {

  
   constructor(props) {
     super(props)
     this.readhandler=this.readhandler.bind(this)
     this.initializeCHat()
        NotWebscoketServiceInstance.addCallbacks(this.props.setmessage.bind(this),this.props.addmessage.bind(this),this.props.status.bind(this),this.props.fetchstatus.bind(this))
        this.state = {
        
     }
   }


  
  initializeCHat(){
    if (NotWebscoketServiceInstance.counter==0){
    NotWebscoketServiceInstance.connect(this.props.username)
    
    this.waitforSocketConnection(()=>{
      NotWebscoketServiceInstance.fetchstatus(this.props.username)
      NotWebscoketServiceInstance.fetchMessages(this.props.username);
     
   // NotWebscoketServiceInstance.check_statusloop(this.props.username)
  }

   )
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



  
  state = {
    collapsed: false,
    visiblep:false,
    visibles: false,
    visiblen: false,
    passvisible:false
  };
 


  changePassword=(e)=>
  {
    e.preventDefault()
    
    this.setState({
      passvisible:true
    })
  }


  changePassCancel=()=>{
    this.setState({
      passvisible:false
    })
  }


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




  notification_confirm(username,key,idfrom,idto,type){
    const NotifyObj = {
      command: 'new_notification',
      from : this.props.username,
      to:username ,
      bookfromid: idfrom,
      booktoid:idto,
      type:'confirm',
      typeb:type,
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
  readhandler(key,id){
    NotWebscoketServiceInstance.setreadandfetch(this.props.username,id)  
    notification.close(key)
  }
  componentDidMount(){
    setTimeout(()=>{
      if(this.props.username==='' || this.props.token===null ){
        this.props.history.push('/login')
      }
    },200)
  
  }
  
   
  UNSAFE_componentWillUpdate(newProps){
   // console.log(newProps.messages.length)
    
    if(newProps!== this.props) {
      if(newProps.messages!== this.props.messages){
        const key = `open${Date.now()}`;
        // const btn = (
        //   <Button type="primary" size="small" onClick={() =>this.notification_confirm(message.from,key)}>
        //     Confirm Ride
        //   </Button>)
        //console.log(newProps.messages)
        newProps.messages.map((message,i) =>{
        if(message.to.includes(newProps.username) && (new Date().getTime()-new Date(message.timestamp).getTime())<90){
       return ( notification.open({
          message: 'Match Request',
          description:message.content,
          btn:message.type === 'request'?<Button type="primary" size="small" onClick={() =>this.notification_confirm(message.author,key,message.bookfromid,message.booktoid,message.typeb)}>
          Confirm Ride 
        </Button>:<Button type="primary" size="small" onClick= {(key) =>this.readhandler(key,message.id)} >
          Mark Read
        </Button>,
          key,
            
          icon: <SmileOutlined style={{ color: '#108ee9' }} />,
        })
       )
      }else{
        return 
      }
      })
      
  }
}
}

componentDidUpdate(){
  setTimeout(()=>{
    if(this.props.username==='' || this.props.token===null ){
      this.props.history.push('/login')
    }
  },200)
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
     ,100) ;
}

  

  render() {
    return (<div className ="hi">
    <header class="user-head ">
        
        <div className="container-fluid mb-2">
        <nav className="navbar navbar-expand-lg navbar-toggleable-md navbar-light bg-faded  usernav text-white ">
          <div style={{ width:"50%"}}>
            <a className="navbar-brand text-white headera" href="/users"><h3 ><i className="fa fa-car fa-white" aria-hidden="true"></i>Humraahi</h3></a>
            </div>
            <button className="navbar-toggler navbar-toggler-right" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
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
                           <NavLink exact to ="/users/pastbookings" activeClassName="bg-dark text-white" className="dropdown-item" href="/#">Booked_rides</NavLink><br />
                           
                           <NavLink exact to ="/users/bookinglist" activeClassName="bg-dark text-white" className="dropdown-item" href="/#">Pending Bookings</NavLink>
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
                           <a activeClassName="bg-dark text-white" className="dropdown-item" onClick={(e)=>this.showDrawer1(e)} href="/users/#">Profile</a>
                           <Profile visible ={this.state.visiblep}
                               onClose ={this.onClose1} />
                           <a activeClassName="bg-dark text-white" className="dropdown-item" onClick={(e)=>this.showDrawer3(e)} href="/users/#">Notifications</a>
                           <Notifications visible ={this.state.visiblen} onClose ={this.onClose3} />
                          <a activeClassName="bg-dark text-white" className="dropdown-item"onClick={(e)=>this.showDrawer2(e)}  href="/#">Settings</a>
                           <ProfileDrawer visible ={this.state.visibles}
                             onClose ={this.onClose2} />
                           <a activeClassName='bg-dark text-white' className="dropdown-item" onClick={(e)=>this.changePassword(e)}>Change Password</a>
                           <PassForm visible={this.state.passvisible} cancel={this.changePassCancel} token={this.props.token}/>
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
        messages : state.notification.messages,
        token:state.auth.token
    }
}

const mapDispatchToprops = dispatch => {
  return {
      addmessage : (message) => dispatch(msgactions.add_message(message)),
      setmessage : (messages) => dispatch(msgactions.set_messages(messages)),
      status:(status)=>dispatch(msgactions.status(status)),
      fetchstatus:(obj)=>dispatch(msgactions.fetchstatus(obj))
  }
}


export default withRouter(connect(mapStateToprops,mapDispatchToprops)(UserLayout))


















  // shouldComponentUpdate(np){
  //   console.log( np.messages!==this.props.messages ||np.username!==this.props.username,np,this.props)
  //   return(
  //     np.messages!==this.props.messages  ||np.username!==this.props.username
    
  //   )
  // }
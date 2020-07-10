import React, { Component } from 'react' ;
import { List, Avatar ,Button,Card,notification,Modal} from 'antd';
import { SmileOutlined} from '@ant-design/icons';
import {connect} from 'react-redux' ;
import {withRouter} from 'react-router-dom'
import axios from 'axios' ;
import Taxipic from '../../../../assets/Taxipic.jpg'
import NotWebscoketServiceInstance from '../../../../Notification/notWebsocket';
import * as msgactions from '../../../../store/actions/messages'




class  Booking extends Component {


  constructor(props) {
    super(props)
     this.notify =this.notify.bind(this)
     this.onchat=this.onchat.bind(this)
     this.onchat1=this.onchat1.bind(this)
     this.handleclosemodal = this.handleclosemodal.bind(this)
  
    this.state = {
     load: false ,
     fetched : false ,
     matches : [],
     profiles: [],
     currbookid: 0,
     groupmatches:[],
     combinedusers:[],
     visible:false 
    
   
    }
    this.clickhandler = this.clickhandler.bind(this)
  }

  
  onchat(n){
    
    console.log("hi",this.props.token)
    let combinedusers =[]

      combinedusers=n.map(n=>n.username) ;
      combinedusers.push(this.props.username)
      
    

    console.log(combinedusers)
    
    axios.defaults.headers = {
      'Content-Type' : "application/json",
       'Authorization' : `Token ${this.props.token}`
    }
    console.log(this.state.combinedusers)
    axios.post(`/capi/${this.props.username}/chats/`,{
      messages: []   ,
      participants : combinedusers
    }).then(res => {
      this.props.history.push(`/users/chat/${res.data.id}`)
      
      this.props.getuserchats(this.props.username,this.props.token)
    }).catch(err => {
      this.setState({
        error : err
      }
      )
    })
  };

  onchat1(name){
    
    console.log("hi",this.props.token)
    let combinedusers =[name,this.props.username]

  
      
    

    console.log(combinedusers)
    
    axios.defaults.headers = {
      'Content-Type' : "application/json",
       'Authorization' : `Token ${this.props.token}`
    }
    console.log(this.state.combinedusers)
    axios.post(`/capi/${this.props.username}/chats/`,{
      messages: []   ,
      participants : combinedusers
    }).then(res => {
      this.props.history.push(`/users/chat/${res.data.id}`)
      
      this.props.getuserchats(this.props.username,this.props.token)
    }).catch(err => {
      this.setState({
        error : err
      }
      )
    })
  };

  async clickhandler(e,id) {
    this.setState(
      {load:true,
      currbookid: id}
    )
   
    switch(this.props.name) {
      case 'match' : 
      await this.setState({
        visible:true
      })
    
       await axios.get(`/uapi/matches/${id}/`)
             .then(res =>{
               this.setState({
                 matches : res.data 
               })
     
       })

       await axios.get(`/uapi/groupmatches/${id}/`)
             .then(res =>{
               this.setState({
                 groupmatches : res.data 
               })
     
       })
       
  
      var k = []
      const profiles = [...Array(this.state.matches.length)].map(async (_,index)=> {
       const response = await axios.get(`/uapi/${this.state.matches[index].user}/profile/`)
       console.log(response)
       k=[...k,response.data[0]]
       await this.setState({
        profiles : k
      })
      
       
       return response.data[0]
     
    }
  

   
      
       ) 
      

        break ;
      case 'delete' :console.log('delete') ;
                break 
      case 'Send Request':console.log('send message') ;
                      break
      default:break ;
    }
  }


  handleclosemodal= (e)=>{
    this.setState({
      visible:false
    })
  }

   notify (username,place,id,type) {
     console.log('hello')
    const NotifyObj = {
       command: 'new_notification',
       from : this.props.username,
       to:username ,
       type:'request',
       typeb:type,
       bookfromid:this.state.currbookid,
       booktoid:id,
      
       notification:`Hello there!!We have a news for You!.${this.props.username} Has sent You a request To join him for the trip to ${place}`

    }
    NotWebscoketServiceInstance.newChatMessage(NotifyObj) ;
    notification.open({
      message: 'Notification Title',
      description:
       'Your Request Sent Successfully',
      icon: <SmileOutlined style={{ color: '#108ee9' }} />,
    });
  }

   componentDidUpdate(){
     console.log(this.state.profiles)
   }


   fetchbookings(){
    if(this.props.token !== null){
      console.log('getting data')
  axios.defaults.headers = {
      "Content-Type" : "application/json" ,
      Authorization : "Token " +this.props.token
  }
  axios.get("/uapi/curr/userbookings/")
     .then(res => {
         this.setState({
             data:res.data
         }) ;
      
     }) 
  }

   }



   deletehandler(e,id){
     e.preventDefault() ;
     axios.defaults.headers = {
      "Content-Type" : "application/json" ,
      'Authorization' : "Token " +this.props.token
  }
     axios.delete(`/uapi/bookingcancel/${id}/`).then(
       res=>{
             this.fetchbookings()
       }
     )

   }


   componentDidMount(){
     this.setState({
       data:this.props.data
     })
     if(this.props.data.length==0){
       setTimeout(()=>{
       this.fetchbookings()
       },200)
     }
   }

   componentWillReceiveProps(np){
     if(np.data!==this.state.data || this.props.data!==np.data){
       this.setState({
         data:np.data
       })
     }
     if(np.data.length==0){
      setTimeout(()=>{
      this.fetchbookings()
      },200)
    }
   
   }


 




  
  render() {
        const matches = this.state.matches.map((match,index) => {
      
      if(this.state.profiles.length === this.state.matches.length){
       
      return (
        <Card>
          <div className = "row align-items-center justify-content-around">
          <div className="col-lg-4 col-sm-12">
              <img
             className="profile_pic"
            
            alt="logo"
            src={this.state.profiles[index].profile_pic}
          />
          </div>
            <div className = "col-lg-8 col-sm-12 col-xs-12">
              
              <p>
                User :{this.state.profiles[index].Name}<br />
                Going to: {match.place} and from :{match.from_place}<br/>
                on : {match.date}  and Time :{match.time}<br />
                friends onboard:{match.no_friends}  and   Type:{match.special_req}<br/>
               
              </p>
              
              <button onClick ={()=>this.onchat1(this.state.profiles[index].Name)}class="btn btn-primary" type='submit'>Chat</button><br/><br/>
              <button  onClick ={() => this.notify(this.state.profiles[index].Name,match.place,match.id,'individual')} class="btn btn-primary"type='submit'>Send Request</button><br/>
              
              

            </div>
           
          </div>
           </Card>

      )
      }
    })
    const {visible} = this.state
    const groupmatches = this.state.groupmatches.map((match,index) => {
      console.log(match.users)
      const users =  match.users.map(u=>{
        console.log(u.username,u['username'])
        return (
          <p>{u.username}</p>
        )
      })
     
    


    
      return (
        <Card>
              <div>
                <h4>People Onboard:</h4>
                {match.users.map(u=><p>{u.username}</p>)}
              </div>
              <div>
                <p>Place:{match.bookings[0].place}</p>
                <p>From :{match.bookings[0].from_place}</p>
                <p>Type : {match.bookings[0].special_req} and Total:{match.total}</p>
                <p>Date:{match.bookings[0].date} <span> and   </span>   Time :{match.bookings[0].time}</p>
              </div>
              
              <button onClick ={()=>this.onchat(match.users)} class="btn btn-primary" type='submit'>Chat</button><br/><br/>
              <button  onClick ={() => this.notify(match.users[0].username,match.bookings[0].place,match.id,'group')} class="btn btn-primary"type='submit'>Send Request</button><br/>
            
           </Card>

      )
      
    })
    return (
        <div>
            <List
    itemLayout="vertical"
    size="large"
    pagination={{
      onChange: page => {
        console.log(page);
      },
      pageSize: 3,
    }}l̥   
    dataSource={this.state.data}
    
    renderItem={item => (
      <List.Item
        key={item.place}
        className="mb-3 booking"
        style={{backgroundColor:'#b9faf8'}}
       
        extra={
          <img
            width={272}
            alt="logo"
            // className="img img-responsive"
            src={Taxipic}
          />
        }
      >
        <List.Item.Meta
          avatar={<Avatar src={item.avatar} />}
          title={<a href={`/users/booking/${item.id}`}>Trip to {item.place}</a>}
          
        />

        <br></br>
        
        <div>
          <p>From :{item.from_place}</p>
          <p>Friends   :  {item.no_friends} and    Type:{item.special_req}</p>
          <p>Date : {item.date}  and Time : {item.time || 0}</p>
        </div>
        <div>
          Description : {item.special_req}
        </div>
  

              
      {(this.props.name ==='match')?
         (<div>
           <div className="d-flex flex-row mr-4">
                  <button class ="btn bx mr-3" data-toggle="modal" data-target="#model" onClick={(event) => this.clickhandler(event,item.id)}>Find Matches</button>
                  <button class ="btn bx"  onClick={(event) => this.deletehandler(event,item.id)}>Delete Booking</button>
           </div>
           <Modal
                visible={visible}
                title="Available"
               
                onCancel={this.handleclosemodal}
                footer={[
                  <Button key="back" onClick={this.handleclosemodal}>
                    Return
                  </Button>,
                 
                ]}
              > 
              <div>
                <h1>Individuals</h1>
              {this.state.profiles && matches}
              <h1>Group</h1>
              {groupmatches}
                
              </div>
            
              </Modal>
  </div>
  
  ):( <button onClick ={()=>{alert('hi')}}class="btn btn-primary" type='submit'>Chat</button>)
              
    }

      </List.Item>
    )}
  />


            
        </div>
    )
}
}
const mapStateToprops = state => {
  return {
      username : state.auth.username,
      messages : state.message.messages,
      token:    state.auth.token
  }
}

const mapdispacttoprops  = dispatch => {
  return{
    getuserchats: (username,token) => dispatch(msgactions.getuserchats(username,token))
  }
}
export default withRouter(connect(mapStateToprops,mapdispacttoprops)(Booking))
 
 


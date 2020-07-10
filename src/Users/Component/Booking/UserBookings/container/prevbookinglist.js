import React, { Component } from 'react'
// import Booking from '../booking' ;
import { List, Avatar ,Button,notification,Modal,Card} from 'antd';
import { SmileOutlined} from '@ant-design/icons';
import axios from 'axios' ;
//import CustomForm from '../../BookingForm/form';
import UserLayout from '../../../../../containers/userLayout';
import {connect}  from 'react-redux' ;
import Taxipic from '../../../../../assets/Taxipic.jpg'
import {withRouter} from 'react-router-dom' ;
import Absolutewrapper from '../../../../../components/Absolutewrapper';
import NotWebscoketServiceInstance from '../../../../../Notification/notWebsocket'


  

class PrevBookingslist extends Component {


    constructor(props) {
        super(props)
        this.fetchbookings=this.fetchbookings.bind(this)
        this.cancelhandler=this.cancelhandler.bind(this)
        this.onchat=this.onchat.bind(this)
        this.notify=this.notify.bind(this)
        this.search = this.search.bind(this)
        this.handleclosemodal=this.handleclosemodal.bind(this)
        this.state = {
             bookings: [],
             matchedbookings:[],
             matchedgroups:[],
             profiles:[],
             modalvisible:false ,
             currbookid:''

        }
    }

  


    handleclosemodal = (e)=>{
      this.setState({
        visible:false
      })
    }
    fetchbookings(){
      if(this.props.token !== null){
        //console.log('getting data')
    axios.defaults.headers = {
        "Content-Type" : "application/json" ,
        Authorization : "Token " +this.props.token
    }
    axios.get("/uapi/booked/")
       .then(res => {
           this.setState({
               bookings:res.data
           }) ;
        
       }) 
    }
  
     }
  

   async  cancelhandler(e,item){
      e.preventDefault() ;
      axios.defaults.headers = {
       "Content-Type" : "application/json" ,
       'Authorization' : "Token " +this.props.token
   }
      await axios.delete(`/uapi/groupbookingcancel/${item.id}/`).then(
        res=>{
              this.fetchbookings()
        }
      )
      setTimeout(()=>{
      this.notify(item.users[0].username,item.bookings[0].place,item.id,'cancel','x',
      `Hello ${this.props.username} has left the group going to ${item.bookings[0].place}`)
      },200)
 
    
    }


    async search(event,id){
      // console.log(this.state.place,this.state.time,this.state.date)
      // console.log(event.target)
       event.preventDefault()
       // this.setState({
       //   friends:event.target.elements[0].value,
       //   allow_with:event.target.elements[1].value,
       //   special_req:event.target.elements[2].value
       // })

       this.setState({
         currbookid:id
       })
      
   
                    axios.defaults.headers = {
                         'Content-Type': 'application/json',
                         'Authorization': `Token ${this.props.token}`
                     }
                     axios.get(`/uapi/grouptoindividual/${id}/`).then(
                     async( res) => {
                         // console.log(res.data) 
                         await this.setState({
                           matchedbookings : res.data,
   
                         })
                       
                       var k = []
   
                       const profiles = [...Array(res.data.length)].map(async (_,index)=> {
                         console.log('hi')
                       const response = await axios.get(`/uapi/${res.data[index].user}/profile/`)
                       console.log(response)
                       k=[...k,response.data[0]]
                       await this.setState({
                         profiles : k
                       })
                       
                       
                       return response.data[0]
                       })
                       console.log(profiles)
                     }
                     
                     )



                     axios.get(`/uapi/grouptogroup/${id}/`).then(
                       res => {
                         // console.log(res.data) 
                         this.setState({
                           matchedgroups : res.data,
                          
                         })
                       }
                     
                     )
   
                     
                    this.setState({
                      visible:true
                    })
   
      
     }
   

  

     
  onchat(n){
    
    //console.log("hi",this.props.token)
    let combinedusers =[]

      combinedusers=n.map(n=>n.username) ;
      if(!combinedusers.includes(this.props.username)){
      combinedusers.push(this.props.username)
      }
      
    

    //console.log(combinedusers)
    
    axios.defaults.headers = {
      'Content-Type' : "application/json",
       'Authorization' : `Token ${this.props.token}`
    }
   // console.log(this.state.combinedusers)
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








  notify (username,place,id,type,typeb,note) {
    //console.log('hello')
   const NotifyObj = {
      command: 'new_notification',
      from : this.props.username,
      to:username ,
      type:type,
      typeb:typeb,
      bookfromid:this.state.currbookid,
      booktoid:id,
      
     
      notification:note

   }
   NotWebscoketServiceInstance.newChatMessage(NotifyObj) ;
   notification.open({
     message: 'Notification Title',
     description:
      'Your Request Sent Successfully',
     icon: <SmileOutlined style={{ color: '#108ee9' }} />,
   });
 }




    
    componentWillReceiveProps(newProps){
      
        //console.log(newProps.token)
        if(newProps.token){
        axios.defaults.headers = {
            "Content-Type" : "application/json" ,
            Authorization : "Token " +newProps.token
        }
        axios.get("/uapi/booked/")
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
      const {visible} = this.state;
      const matches = this.state.matchedbookings.map((match,index) => {
      
        if(this.state.profiles.length === this.state.matchedbookings.length){
         
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
                <h3>
                  {this.state.profiles[index].Name}
                </h3>
                <p>
                  Going to: {match.place}<br/>
                  From : {match.from_place}
                  on : {match.date}  <br />
                  friends:{match.no_friends}   and Type:{match.special_req}
                  Time:{match.no_friends}
                </p>
                
              
                <button  onClick ={() => this.notify(this.state.profiles[index].Name,match.place,match.id,'request','gti',
                `Hello ${this.props.username} has sent a join request to their group for trip to ${match.place}`)} class="btn btn-primary"type='submit'>Send Request</button><br/>
                
                
  
              </div>
             
            </div>
             </Card>
  
        )
        }
      })
      const groupmatches = this.state.matchedgroups.map((match,index) => {
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
                  {users}
                </div>
                <div>
                <p>Place:{match.bookings[0].place}</p>
                <p>From :{match.bookings[0].from_place}</p>
                <p>Type : {match.bookings[0].special_req} and Total:{match.total}</p>
                <p>Date:{match.bookings[0].date} <span>  and  </span>   Time :{match.bookings[0].time}</p>
                </div>
                <button  onClick ={() => this.notify(match.users[0].username,match.bookings[0].place,match.id,'request','gtg',
                `Hello !! ${this.props.username} has sent a group linking req for trip to ${match.bookings[0].place}`)} class="btn btn-primary"type='submit'>Send Request</button><br/>
              
             </Card>
  
        )
        
      })
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
        style={{backgroundColor:'#bff'}}
        
        extra={
          <img
            className="align-items-center text-center justify-content-center"
            width={272}
            alt="logo"
            src={Taxipic}
          />
        }
      >
        <List.Item.Meta
          avatar={<Avatar src={item.avatar} />}
          title={<a href={`/users/booked/${item.id}`}>Trip to {item.bookings[0].place}</a>}
          description={<p>Desciption:{item.special_req}</p>}
        />
         <div>
                <h6>People Onboard:</h6>
                <ul>
                {item.users.map(u=>{
      //  console.log(u.username,u['username'])
        return (
          <li>{u.username}</li>
        )
      }) }
      </ul>
       
           </div>
           <br ></br>
              <div>
                <p>Place   :    {item.bookings[0].place}</p>
                <p>Total   :    {item.total}</p>
                <p>Date    :    {item.bookings[0].date} and Time    : {item.bookings[0].time}</p>
              </div>
       
        <Button  className="bx-2 btn px-3 border-darken-2 bg-primary mr-2"   onClick={(event) => this.cancelhandler(event,item)}>Cancel</Button>
        <Button  className="bx-2 btn bg-success px-3 border-darken-2 mr-2"   onClick ={(e)=>this.onchat(item.users)}>Chat</Button>
        <Button  className="bx-2 btn bg-success px-3 border-darken-2 bg-info"   onClick ={(e)=>this.search(e,item.id)}>Add</Button>
        {/* <Button  className="bx-2 bg-success px-3 border-darken-2  bg-olive  "   onClick ={(e)=>this.onchat(item.users)}>Link</Button> */}

      </List.Item>
    )}
  />
                </div>         
                </div>






                <Modal
                visible={visible}
                title="Available"
                onOk={this.handleOk}
                onCancel={this.handleclosemodal}
                footer={[
                  <Button key="back" onClick={this.handleclosemodal}>
                    Return
                  </Button>,
                 
                ]}
              > 
               <h1>Individuals</h1>
   {this.state.profiles && matches}
   <h1>Group</h1>
   {groupmatches}</Modal>
            </UserLayout>
            </Absolutewrapper>
        )
    }
}



const mapStatetoprops = (state) => {
    return {
      
        token : state.auth.token,
        username:state.auth.username
    }
}

export default withRouter(connect(mapStatetoprops,null)(PrevBookingslist))

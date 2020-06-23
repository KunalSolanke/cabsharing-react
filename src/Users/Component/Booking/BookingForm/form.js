import React from 'react';
import {
  DatePicker,
  TimePicker,
  Spin
} from 'antd';
import { List, Avatar ,Button,Card,notification} from 'antd';
import { MessageOutlined, LikeOutlined, StarOutlined,SmileOutlined} from '@ant-design/icons';
import UserLayout from '../../../../containers/userLayout';
import Booking from '../UserBookings/booking' ;
import './form.css'
import {connect }  from 'react-redux' ;
import {withRouter} from 'react-router-dom' ;
import NotWebscoketServiceInstance from '../../../../Notification/notWebsocket';
import axios from 'axios'





const IconText = ({ icon, text }) => (
  <span>
    {React.createElement(icon, { style: { marginRight: 8 } })}
    {text}
  </span>
);
class CustomForm extends React.Component {

  constructor(props) {
    super(props)
    //this.handleFormSubmit =this.handleFormSubmit.bind(this) ;
    this.formsub1 =this.formsub1.bind(this)
    this.formsub2=this.formsub2.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.handleChange1 = this.handleChange.bind(this)
    this.handleChange2 = this.handleChange.bind(this)
    this.notify =this.notify.bind(this)
     this.onchat=this.onchat.bind(this)
     this.onchat1=this.onchat1.bind(this)
    this.state = {
      special_req: "None",
      load : false ,
      fetched : false ,
      matchedbookings : [],
      place:'',
      friends:0,
      allow_with:0,
      matchedgroups:[],
      booking :{},
      profiles:[]

      
       
    }
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
    axios.post(`http://127.0.0.1:8000/capi/${this.props.username}/chats/`,{
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
    axios.post(`http://127.0.0.1:8000/capi/${this.props.username}/chats/`,{
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

  notify (username,place,id) {
     console.log('hello')
    const NotifyObj = {
       command: 'new_notification',
       from : this.props.username,
       to:username ,
       type:'request',
       bookfromid:this.state.booking.id,
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
  

  
  handleChange (event){
    this.setState({
      special_req : event.target.value
    }) ;
  }

  handleChange1 (event){
    this.setState({
      allow_with : event.target.value
    }) ;
  }

  handleChange2 (event){
    console.log("changed")
    this.setState({
      friends : event.target.value
    }) ;
  }
  


 

  form1(){
  
      var form=document.querySelector('.form1')
       var formx=document.querySelector('.form2')
       formx.classList.remove('form2-active');
      formx.classList.add('form2-inactive');
      form.classList.remove('form1-inactive');
      form.classList.add('form1-active');
  
   
  }

  form2(){
    var form=document.querySelector('.form1')
    var formx=document.querySelector('.form2')
    form.classList.remove('form1-active');
      form.classList.add('form1-inactive');
      formx.classList.remove('form2-inactive');
      formx.classList.add('form2-active');
      console.log('h1')
      


  }

  formsub1=(event)=>{
    console.log(event.target)

    event.preventDefault()
    this.setState({
      place:event.target.elements[0].value,
      date:event.target.elements[1].value,
      time:event.target.elements[2].value
    })
   
    var form=document.querySelector('.form1')
    var formx=document.querySelector('.form2')
    form.classList.remove('form1-active');
      form.classList.add('form1-inactive');
      formx.classList.remove('form2-inactive');
      formx.classList.add('form2-active');
      console.log('h1')
      
  }
  async formsub2(event){
    console.log(this.state.place,this.state.time,this.state.date)
    console.log(event.target)
    event.preventDefault()
    // this.setState({
    //   friends:event.target.elements[0].value,
    //   allow_with:event.target.elements[1].value,
    //   special_req:event.target.elements[2].value
    // })
    axios.defaults.headers = {
      'Content-Type': 'application/json',
      'Authorization': `Token ${this.props.token}`
  }
   axios.post(" http://127.0.0.1:8000/uapi/curr/userbookings/",
    {
      place: this.state.place,
      no_friends: this.state.friends ,
      date: this.state.date,
      time:this.state.time,
      allow_with : this.state.allow_with,
      special_req :this.state.special_req,
      user : 1,
     
      
      
    }).then(res =>{
      this.setState({
        load : true,
        booking:res.data
      })


      axios.defaults.headers = {
        'Content-Type': 'application/json',
        'Authorization': `Token ${this.props.token}`
    }
    axios.get("http://127.0.0.1:8000/uapi/matches/0/").then(
     async( res) => {
        // console.log(res.data) 
        await this.setState({
          matchedbookings : res.data,

        })
      
      var k = []

      const profiles = [...Array(res.data.length)].map(async (_,index)=> {
        console.log('hi')
       const response = await axios.get(`http://127.0.0.1:8000/uapi/${res.data[index].user}/profile/`)
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
    axios.get("http://127.0.0.1:8000/uapi/groupmatches/0/").then(
      res => {
        // console.log(res.data) 
        this.setState({
          matchedgroups : res.data,
          load : false ,
          fetched : true ,

        })
      }
     
    )

    
    }) ;

     
    
      
  }
  componentDidMount(){
    var form=document.querySelector('.form1')
    var formx=document.querySelector('.form2')
  
    form.classList.add('.form1-active') ;
    formx.style.opacity=0 ;
    formx.style.pointerEvents= 'none' ;

    axios.defaults.headers = {
      "Content-Type" : "application/json" ,
      Authorization : "Token "+this.props.token
  }

    
  }

  
 
render() {
  console.log(this.state.matchedbookings,this.state.profiles)
    const matches = this.state.matchedbookings.map((match,index) => {
      
      if(this.state.profiles.length === this.state.matchedbookings.length){
       
      return (
        <Card>
          <div className = "row align-items-center justify-content-around w-100 mb-2 p-3">
          <div className="col-lg-4 col-sm-6 col-xs-12">
              <img
             className="profile_pic"
            
            alt="logo"
            src={this.state.profiles[index].profile_pic}
          />
          </div>
            <div className = "col-lg-8 col-sm-6 col-xs-12 text-center">
              <h3>
                {this.state.profiles[index].Name}
              </h3>
              <p>
                Going to: {match.place}<br/>
                on : {match.date} <br />
                friends:{match.allow_with}
              </p>
              
              <button onClick ={()=>this.onchat1(this.state.profiles[index].Name)}class="btn btn-primary" type='submit'>Chat</button><br/><br/>
              <button  onClick ={() => this.notify(this.state.profiles[index].Name,match.place,match.id)} class="btn btn-primary"type='submit'>Send Request</button><br/>
              
            </div>
           
          </div>
           </Card>

      )
      }
    })
  if(this.state.load === true) {
   return ( 
  

     <div style ={{ height : "100%"}} className = "row justify-content-space-evenly align-items-center" >

      <Spin size="large" />
      </div>
         
          
    
   
   
   ) }
  else if ( this.state.fetched === true){

    return (
           <>
           <div className="col-12">
           <div className = "row justify-content-space-evenly align-items-center">
                    <div className="col-12">
                        <h1>Individuals</h1>
                     </div>
                      <div  className="col-12">
                              {matches}
                      </div>
          </div>
          </div>
          <div className="col-12">
          <div className = "row justify-content-space-evenly align-items-center">
                     <div className="col-12">
                      <h1>Groups</h1>
                      </div>
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
    dataSource={this.state.matchesgroups}
    
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
            width={272}
            alt="logo"
            src="https://gw.alipayobjects.com/zos/rmsportal/mqaQswcyDLcXyDKnZfES.png"
          />
        }
      >
        <List.Item.Meta
          avatar={<Avatar src={item.avatar} />}
          title={<a href={`/users/booked/${item.id}`}>Trip to {item.place}</a>}
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
        
        <button onClick ={()=>this.onchat(item.users)} class="btn btn-primary" type='submit'>Chat</button><br/><br/>
        <button  onClick ={() => this.notify(item.users[0].username,item.bookings[0].place,item.id)} class="btn btn-primary"type='submit'>Send Request</button><br/>
            

      </List.Item>
    )}
  />
                      </div>

          </div>
          </div>
          </>
    
  )
  }
  else {
  return (

<div>
<div className="col-12 form-toggle">
<div className="row justify-content-center align-items-center mb-3 circs ">
          <div className="col-3 ">
          <div class="row justify-content-center align-items-center form-1">
            
          <button className="f1" onClick={()=>this.form1()} >1</button>
           
            </div>
          </div>

         <div className="col-3">
         <div class="row justify-content-center  align-items-center form-2">
          
         <button className='f2' onClick={()=>this.form2()} >2</button>
        </div>
          </div>
  </div>
</div>
<div className="form-container">
<div className="row justify-content-center align-items-center form1 ">
       
<form onSubmit={this.formsub1}>
<div class="form-group row">
<label for="colFormLabel" class="col-sm-10 col-form-label col-form-label">Place</label>
<div class="col-sm-10">
<input type="text" className="form-control form-control-sm selx" id="colFormLabel" />
</div>
</div>
<div class="form-group row">
<label for="colFormLabel" class="col-sm-10 col-form-label col-form-label">Date</label>
<div class="col-sm-10">
<DatePicker className="selx" name="date" />
</div>
</div>
<div class="form-group row">
<label for="colFormLabel" class="col-sm-10 col-form-label col-form-label">Time</label>
<div class="col-sm-10">
<TimePicker className="selx" name="time" />
</div>
</div>
<button htmType="submit" class="btn bx" >Next <span><i class="fa fa-arrow-right" aria-hidden="true"></i></span></button>
</form>
</div>



<div className="row justify-content-center align-items-center form2 ">
<form   onSubmit={this.formsub2}>
<div class="form-group row">
<label for="colFormLabel" class="col-sm-10 col-form-label col-form-label">No of Friends</label>

  <select class="form-control sel" name="" id="" onChange={(e)=>this.handleChange2(e)}>
    <option>0</option>
    <option>1</option>
    <option>2</option>
  </select>
</div>

<div class="form-group row">
<label for="colFormLabel" class="col-sm-10 col-form-label col-form-label">How many to share With ?</label>

  <select class="form-control sel" name="" id="" onChange={(e)=>this.handleChange1(e)}>
    <option>1</option>
    <option>2</option>
    <option>3</option>
  </select>

</div>

<div class="form-group row">
<label for="colFormLabel" class="col-sm-10 col-form-label col-form-label">Emmergency</label>

<select  onChange={(e)=>this.handleChange(e)}  className='sel'>
            <option value="None">None</option>
            <option value="Medical">Medical Emmergency</option>
            <option value="Family">Family</option>
          </select>
</div>

<button type="submit" class="btn bx">Hit the road</button>
</form>
</div>
</div>
</div>
   
  );
  }
};
}


const mapStatetoprops = (state) => {
  return {
    
      token : state.auth.token,
      username : state.auth.username
  }
}


export default withRouter(connect(mapStatetoprops)(CustomForm));







   
    
   
     
// <form
      //   onSubmit ={this.handleFormSubmit} >
        
      
      //   <Form.Item style ={{justifyContent:'center'}} label="Place">
      //     <Input name="place" style ={{width : "40vw"}}/>
      //   </Form.Item>
      //   <Form.Item style ={{justifyContent:'center'}} label="Special Request of type" name="req">
      //     <select  onChange={this.handleChange} >
      //       <option value="None">None</option>
      //       <option value="Medical">Medical Emmergency</option>
      //       <option value="Family">Family</option>
      //     </select>
      //   </Form.Item>
      //   <Form.Item style ={{justifyContent:'center'}} label="Date">
      //     <DatePicker name="date" />
      //   </Form.Item>
      //   <Form.Item label="Time">
      //     <TimePicker name="time" />
      //   </Form.Item>
      //   <Form.Item label="No of Friends">
      //     <InputNumber name="no_friends" />
      //   </Form.Item>
      //   <Form.Item label="Max People in Cab">
      //     <InputNumber name="allow_with" />
      //   </Form.Item>
       
      //   <Form.Item label="Book Ride">
      //     <Button type="primary" htmlType="submit">Book</Button>
      //     {/* <button class="btn btn-danger" type="submit"></button> */}
      //   </Form.Item>
      // </form>
     

      // handleFormSubmit (event) {

    
      //   event.preventDefault() ;
      //   console.log("Hi") ;
      //   const place = event.target.elements.place.value ;
      //   const date = event.target.elements.date.value ;
      //   const time = event.target.elements.time.value ;
      //   const no_friends = event.target.elements.no_friends.value ;
      //   const allow_with = event.target.elements.allow_with.value ;
      //   const req = this.state.special_req ;
      //   console.log(req) ;
       
      //   //console.log( sessionStorage.getItem('userdata').data.id)
    
        
      //   axios.defaults.headers = {
      //     "Content-Type" : "application/json" ,
      //     Authorization : "Token "+this.props.token
      // }
     
    
      //   axios.post(" http://127.0.0.1:8000/uapi/curr/userbookings/",
      //   {
      //     place: place,
      //     no_friends: no_friends ,
      //     date: date,
      //     time:time,
      //     allow_with : allow_with,
      //     special_req : req,
      //     user : 2,
      //     time:'',
      //     date:''
          
          
      //   }).then(res =>{
      //     this.setState({
      //       load : true
      //     })
          
      //   axios.get("http://127.0.0.1:8000/uapi/matches/0/").then(
      //     res => {
      //       // console.log(res.data) 
      //       this.setState({
      //         matchedbookings : res.data,
      //         load : false ,
      //         fetched : true ,
    
      //       })
      //     }
         
      //   )
      
      //   }) ;
    
      // //   this.setState({
      // //     load : true
      // //   })
    
      // //   axios.defaults.headers = {
      // //     "Content-Type" : "application/json" ,
      // //     Authorization : "Token "+this.props.token
      // // }
    
      // //   axios.get("http://127.0.0.1:8000/uapi/matches/0/").then(
      // //     res => {
      // //       // console.log(res.data) 
      // //       this.setState({
      // //         matchedbookings : res.data,
      // //         load : false ,
      // //         fetched : true 
      // //       })
      // //     }
         
      // //   )
    
      
    
      // }
import React from 'react';
import {
  DatePicker,
  TimePicker,
  Spin
} from 'antd';
import UserLayout from '../../../../containers/userLayout';
import Booking from '../UserBookings/booking' ;
import './form.css'
import {connect }  from 'react-redux' ;
import {withRouter} from 'react-router-dom' ;

import axios from 'axios'






class CustomForm extends React.Component {

  constructor(props) {
    super(props)
    //this.handleFormSubmit =this.handleFormSubmit.bind(this) ;
    this.formsub1 =this.formsub1.bind(this)
    this.formsub2=this.formsub2.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.handleChange1 = this.handleChange.bind(this)
    this.handleChange2 = this.handleChange.bind(this)
    this.state = {
      special_req: "None",
      load : false ,
      fetched : false ,
      matchedbookings : [],
      place:'',
      friends:0,
      allow_with:0,
      
       
    }
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
  formsub2=(event)=>{
    console.log(this.state.place,this.state.time,this.state.date)
    console.log(event.target)
    event.preventDefault()
    this.setState({
      friends:event.target.elements[0].value,
      allow_with:event.target.elements[1].value,
      special_req:event.target.elements[2].value
    })
   
    axios.post(" http://127.0.0.1:8000/uapi/curr/userbookings/",
    {
      place: this.state.place,
      no_friends: this.state.friends ,
      date: this.state.date,
      time:this.state.time,
      allow_with : this.state.allow_with,
      special_req :this.state.special_req,
      user : 2,
     
      
      
    }).then(res =>{
      this.setState({
        load : true
      })
      
    axios.get("http://127.0.0.1:8000/uapi/matches/0/").then(
      res => {
        // console.log(res.data) 
        this.setState({
          matchedbookings : res.data,
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
  if(this.state.load === true) {
   return ( 
   <UserLayout>

     <div style ={{ height : "100%"}} className = "row justify-content-space-evenly align-items-center" >

      <Spin size="large" />
      </div>
         
          
      </UserLayout>
   
   
   ) }
  else if ( this.state.fetched === true){

    return (
      <UserLayout>



          <Booking data={this.state.matchedbookings} name = 'Send Request'/>
         
          
      </UserLayout>
  )
  }
  else {
  return (

<>
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

  <select class="form-control sel" name="" id="" onChange={this.handleChange2}>
    <option>0</option>
    <option>1</option>
    <option>2</option>
  </select>
</div>

<div class="form-group row">
<label for="colFormLabel" class="col-sm-10 col-form-label col-form-label">How many to share With ?</label>

  <select class="form-control sel" name="" id="" onChange={this.handleChange1}>
    <option>1</option>
    <option>2</option>
    <option>3</option>
  </select>

</div>

<div class="form-group row">
<label for="colFormLabel" class="col-sm-10 col-form-label col-form-label">Emmergency</label>

<select  onChange={this.handleChange}  className='sel'>
            <option value="None">None</option>
            <option value="Medical">Medical Emmergency</option>
            <option value="Family">Family</option>
          </select>
</div>

<button type="submit" class="btn bx">Hit the road</button>
</form>
</div>
</div>
</>
   
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
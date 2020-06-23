import React, { Component } from 'react' ;
import './register.css' ;
import { Spin } from 'antd';
import regman from './regassets/regman.png' ;
import avatar from './regassets/avatar.png' ;
import { GoogleLogin } from 'react-google-login';
import {connect} from 'react-redux' ;
import * as actions from '../../../../store/actions/auth' ;
import Absolutewrapper from '../../../../components/Absolutewrapper';
import GitHubLogin from 'react-github-login' ;
import config from '../../../../config.json';
import axios from 'axios' ;

class Register extends Component {

  onSuccess = response => {console.log(response);
     
     
      
    axios.post("http://localhost:8000/rapi/check/",{
      "token" : response.code}
).then(res =>{
      console.log(res)
    })
 
    this.props.onSocialAuth(response,"github",'http://localhost:3000/users') ;
    this.props.history.push('/users') }

    
     onFailure = response => console.error("fail",response);
    googleResponse = (response) => {
   
 
    axios.post("http://localhost:8000/rapi/check/",{
      "token" : response.code}
).then(res =>{
      console.log(res)
    })
    this.props.onSocialAuth(response,"google-oauth2",'postmessage') ;
    this.props.history.push('/users')
    
    }



  onFinishFailed = errorInfo => {
    console.log('Failed:', errorInfo);
  };

   handlesubmit = event => { 
    event.preventDefault() ;
   
    const username=event.target.elements[0].value ;
    const email= event.target.elements[1].value ;
    const password =event.target.elements[2].value;
    const cnf_pass=event.target.elements[3].value;
  
    this.props.onAuth(username,email,password,cnf_pass) ;


    console.log(username,email, password,cnf_pass)
    if(this.props.error === null || !this.props.loading) {
      this.props.history.push("/users") ;
    }
  }
   
  componentDidMount(){
    var nav= document.querySelector('.main-nav') ;
  if(nav.style.display ==='none' ){
      nav.style.display='contents';
  }
}



    render() {
      let error = null ;
        if(this.props.error){
            error= (
                <p>{this.props.error.message}</p>
            )
        }
        return (
          <Absolutewrapper>
              {error}
              { (this.props.loading) ?  <Spin size="large" /> :(
            
                <div className="container-fluid">
                  
<div className="row box justify-content-center align-items-center">
    <div className="col-lg-6 col-sm-12 p-2  svg">
        <img  src={regman} alt=""></img>
    </div>
    <div className="col-lg-6 col-sm-12 p-3  form justify-content-between align-center">
    
    <div className="d-flex flex-column justify-content-between align-center look">
        <div className=" flex-row img justify-content-center align-center">
            <img src={avatar} alt="" className="face"></img><br/>
        </div>

        { (this.props.loading) ?  <Spin size="large" /> :
        <div className="flex-column justify-content-between align-center log">

        <form onSubmit={this.handlesubmit} className=" flex-row justify-content-between align-center form-group" >
        
           <div className="form-group">
             <label htmlFor="username">Username</label>
             <input htmltype="text" name="username"  className="form-control" />
           </div>
           <div className="form-group">
             <label htmlFor="email">Email</label>
             <input type="email" name="email"  className="form-control"  />
           </div>
           <div className="form-group">
             <label >Password</label>
             <input type="password" name="password" id="" className="form-control"  />
           </div>
           <div className="form-group">
             <label >Confirm-Password</label>
             <input type="password" name="cnf_pass" id="" className="form-control" />
           </div>
          
           <button htmltype="submit" className="btn btn-success b3">Submit</button><br/>
           <h2 className="align-center">--OR--</h2>
           <div className="d-flex flex-column">
    <GoogleLogin
                         clientId={config.GOOGLE_CLIENT_ID}
                         buttonText="Login"
                         onSuccess={this.googleResponse}
                         className="google-button"
                         onFailure={this.onFailure}
                         responseType = "code"
                         
                        type="dark"
                         ></GoogleLogin>
      <br/>
     <GitHubLogin clientId="ba6fbdc2d5def8fd295a"
       redirectUri= ''
       responseType='code'
       className="github-button"
     onSuccess={this.onSuccess}
     onFailure={this.onFailure}>
       <i className="fa fa-github g-log" widht="10px" aria-hidden="true"></i>Github
       </GitHubLogin>
       <br/>
    </div>
           
         </form>
         </div>
    }
         </div>
         </div>
      </div>
    </div>)}
    </Absolutewrapper>
    
                
        )
    }
}

const mapStatetoprops = (state) => {
  return {
      loading : state.auth.loading,
      error : state.auth.error
  }
}

const mapDispatchtoprops = dispatch =>{
  return {
      onAuth :(username,email,password,cnf_pass) => dispatch(actions.authSignUp(username,email,password,cnf_pass))

  }
}


export default connect(mapStatetoprops,mapDispatchtoprops)(Register ) ;

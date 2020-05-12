import React from 'react' ;
// import TwitterLogin from 'react-twitter-auth';
// import FacebookLogin from 'react-facebook-login';
import { GoogleLogin } from 'react-google-login';
import config from '../../../../config.json';
import axios from 'axios' ;
import GitHubLogin from 'react-github-login' ;


class LoginForm extends React.Component {

     onSuccess = response => {console.log(response);
     
      
    axios.post("http://localhost:8000/rapi/check/",{
      "token" : response.code}
).then(res =>{
      console.log(res)
    })
 
    this.props.onSocialAuth(response,"github",'http://localhost:3000/users') ;
    this.props.history.push('/users') 
  }
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
    const password= event.target.elements[1].value ;
    this.props.onAuth(username,password) ;
    if(this.props.error === null) {
      this.props.history.push("/users") ;
    }

   
  }

  
 render() {
  return (
    <form onSubmit={this.handlesubmit} className=" flex-row justify-content-between align-center form-group" >

    <div className="form-group">
      <label htmlFor="username">Username</label>
      <input type="text" name="username"  className="form-control" />
    </div>
   
    <div className="form-group">
      <label >Email</label>
      <input type="password" name="password" id="" className="form-control"  />
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

  );
};

}



export default LoginForm ;




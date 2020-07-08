import React from 'react' ;
// import TwitterLogin from 'react-twitter-auth';
// import FacebookLogin from 'react-facebook-login';
import { GoogleLogin } from 'react-google-login';
//import config from '../../../../config.json';
import axios from 'axios' ;
import GitHubLogin from 'react-github-login' ;
import {PassForm} from '../../../../components/resetpassword'

class LoginForm extends React.Component {


     constructor(props) {
       super(props)
     
       this.state = {
          loading :false ,
          username:null,
          error:null
       }
     }
     




     //CHECK AUTH STATE
     //GITHUB
     onSuccess = response => {
       //console.log(response);
              axios.post("http://localhost:8000/rapi/check/",{
                "token" : response.code}
              ).then(res =>{
                //console.log(res)
              })
          
              this.props.onSocialAuth(response,"github",'http://localhost:3000/users') ;
              
       }
            

      onFailure = response => console.error("fail",response);



      //GOOGLE METHOD FROM STORE
      googleResponse = (response) => {
            
          
              axios.post("http://localhost:8000/rapi/check/",{
                "token" : response.code}
              ).then(res =>{
                //console.log(res)
              })
              this.props.onSocialAuth(response,"google-oauth2",'postmessage') ;
              
  }



  onFinishFailed = errorInfo => {
    console.log('Failed:', errorInfo);
  };



  handlesubmit = (event)=> {
  
    event.preventDefault() ;
    
    const username=event.target.elements[0].value ;
    const password= event.target.elements[1].value ;
    this.props.onAuth(username,password) ;
    console.log(this.state)

    // if(this.state.error === null && !this.state.loading &&this.state.username!==null) {
    //   console.log(this.state)
    //   this.props.history.push("/users") ;
    //   console.log('hi')
    // }
   
  }

  componentWillReceiveProps(newProps){
    //console.log(newProps,newProps.loading!==this.state.loading,newProps.error!==this.state.error,newProps.username!==this.state.username,this.state)
    if(newProps.loading!==this.state.loading||newProps.error!==this.state.error||newProps.username!==this.state.username){
    this.setState({
      loading:newProps.loading,
      error:newProps.error,
      username:newProps.username
    })
    if(newProps.token!==null &&newProps.error===null){
      this.props.history.push('/users')
    }
  }
    
  }
   
  


  
 render() {
  return (
    <form onSubmit={this.handlesubmit} className=" flex-row justify-content-between align-center form-group" >
     <div>{this.props.error?"Invalid/credentials":""}</div>
    <div className="form-group">
      <label htmlFor="username">Username</label>
      <input type="text" name="username"  className="form-control" />
    </div>
  
   
    <div className="form-group">
      <label >Password</label>
      <input type="password" name="password" id="" className="form-control"  />
    </div>
    
    
   
    <button htmltype="submit" className="btn btn-success b3">Login</button>
    <a href="/accounts/reset/" style={{padding:'0rem 1rem',fontSize:'15px'}}>Forgot Password?</a><br></br>
    <br></br>
    <h4 className="align-center">OR </h4>
    <div className="d-flex flex-column">
    <GoogleLogin
                         clientId={process.env.GOOGLE_KEY}
                         buttonText="Login"
                         onSuccess={()=>this.googleResponse}
                         className="google-button"
                         onFailure={()=>this.onFailure}
                         responseType = "code"
                         
                        type="dark"
                         ></GoogleLogin>
      <br/>
     <GitHubLogin clientId={process.env.GITHUB_KEY}
       redirectUri= ''
       responseType='code'
       className="github-button"
     onSuccess={()=>this.onSuccess}
     onFailure={()=>this.onFailure}>
       <i className="fa fa-github g-log" widht="10px" aria-hidden="true"></i>Github
       </GitHubLogin>
       <br/>
    </div>
    
  </form>

  );
};

}



export default LoginForm ;




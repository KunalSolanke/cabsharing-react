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
import {withRouter} from 'react-router-dom' ;
import {Popover} from 'antd'
import {InfoCircleOutlined} from '@ant-design/icons'




const content = (
  <div>
    <p>Password Should be more than 8 words</p>
    <p>Password should have atleast one digit</p>
    <p>Password should have  atlesst one aplhabet
    </p>
    <p>Password should have atleast one special character </p>
    
  </div>
);
const content4=(
  <div>Should Match Password above</div>
)
const content2 =(
  <div>
    <p>Username should be unique</p>
    <p>Username must not be blank</p>
  </div>
)
const content3 =(
  <div>
    <p>Email should be unique</p>
    <p>Email should be valid and active</p>
  </div>
)
const text=<h4>Password</h4>
const text2=(<h4>Username</h4>)
const text3=(<h4>Email</h4>)
const text4=<h4>Confirm Password</h4>





class Register extends Component {


  //GITHUB
  onSuccess = response => {console.log(response);   
        axios.post("http://localhost:8000/rapi/check/",{
          "token" : response.code}
          ).then(res =>{
          //console.log(res)
        })
    
        this.props.onSocialAuth(response,"github",'http://localhost:3000/users') ;
  }

    
  onFailure = response => console.error("fail",response);


  //GOOGLE
  googleResponse = (response) => {
   
 
          axios.post("http://localhost:8000/rapi/check/",{
            "token" : response.code}
      ).then(res =>{
           // console.log(res)
          })
          this.props.onSocialAuth(response,"google-oauth2",'postmessage') ;
  
    
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


          //console.log(username,email, password,cnf_pass)
          // if(this.props.error === null || !this.props.loading) {
          //   this.props.history.push("/users") ;
    // }
  }
   
  componentDidMount(){
          var nav= document.querySelector('.main-nav') ;
        if(nav.style.display ==='none' ){
            nav.style.display='contents';
        }
      }
      UNSAFE_componentWillReceiveProps(np){
      if(np.token!==this.props.token||np.error!==this.props.error||np.username!==this.props.username)
        if(np.token!==null &&np.error===null){
         // console.log(np.token,np.error)
        this.props.history.push('/users')
      }
}



render() {
      // let error1=null ;
      const {error}=this.props
        // if(this.props.error){
        //     error1= (
        //         <p>{this.props.error.username[0]}</p>
        //     )
        // }
        return (
          <Absolutewrapper>
              {/* <div style={{color:'red'}}> {error1}</div> */}
              { (this.props.loading) ?  <Spin size="large" /> :(
            
                <div className="container-fluid reg">
                  
                  <div className="row regbox justify-content-center align-items-center">
                      <div className="col-lg-6 col-sm-12 p-2  svg">
                          <img  src={regman} alt=""></img>
                        
                      </div>
                      <div className="col-lg-6 col-sm-12 p-3  form justify-content-between align-center">
                      
                      <div className="d-flex flex-column justify-content-between align-center look">
                          <div className=" flex-row img justify-content-center align-center">
                              <img src={avatar} alt="" className="face"></img><br/>
                              <h3>Register</h3>
                          </div>

                          { (this.props.loading) ?  <Spin size="large" /> :
                          <div className="flex-column justify-content-between align-center log">

                          <form onSubmit={(e)=>this.handlesubmit(e)} className=" flex-row justify-content-between align-center form-group" >
                          
                            <div className="form-group">
                              <label htmlFor="username">Username</label>
                              <div className="d-flex flex-row align-items-center ">
                              <input htmltype="text" name="username"  className="form-control mr-2" /><Popover content={content2} title={text2} trigger='hover'>
                                <InfoCircleOutlined />
                              </Popover>
                              </div>
                              {error &&error.username?(<ul>{error.username.map((i)=>(<li style={{color:'red'}}>{i}</li>))}</ul>):null}
                            </div>
                            <div className="form-group">
                              <label htmlFor="email">Email</label>
                              <div className="d-flex flex-row align-items-center">
                              <input type="email" name="email"  className="form-control mr-2"  /><Popover content={content3} title={text3} trigger='hover'>
                                <InfoCircleOutlined />
                              </Popover>
                              </div>
                              {error &&error.email?(<ul>{error.email.map(i=><li style={{color:'red'}}>{i}</li>)}</ul>):null}
                            </div>
                            <div className="form-group">
                              <label >Password</label>
                              <div className="d-flex flex-row align-items-center">
                              <input type="password" name="password" id="" className="form-control mr-2"  /><Popover content={content} title={text} trigger='hover'>
                                <InfoCircleOutlined />
                              </Popover>
                              </div>
                              {error&&error.password1?(<ul>{error.password1.map(i=><li style={{color:'red'}}>{i}</li>)}</ul>):null}
                            </div>
                            <div className="form-group">
                              <label >Confirm-Password</label>
                              <div className="d-flex flex-row align-items-center">
                              <input type="password" name="cnf_pass" id="" className="form-control mr-2" /><Popover content={content4} title={text4} trigger='hover'>
                                <InfoCircleOutlined />
                              </Popover>
                              </div>
                              {error&&error.password2?(<ul>{error.password2.map(i=><li style={{color:'red'}}>{i}</li>)}</ul>):null}
                            </div>
                            
                            <button htmltype="submit" className="btn btn-success b3">SignUp</button><br/>
                            <h2 className="align-center">--OR--</h2>
                            <div className="d-flex flex-column">
                      <GoogleLogin
                                          clientId={config.GOOGLE_KEY}
                                          buttonText="Login"
                                          onSuccess={this.googleResponse}
                                          className="google-button"
                                          onFailure={this.onFailure}
                                          responseType = "code"
                                          
                                          type="dark"
                                          ></GoogleLogin>
                        <br/>
                      <GitHubLogin clientId={config.GITHUB_KEY}
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
      error : state.auth.error,
      token:state.auth.token
  }
}

const mapDispatchtoprops = dispatch =>{
  return {
      onAuth :(username,email,password,cnf_pass) => dispatch(actions.authSignUp(username,email,password,cnf_pass)),
      onSocialAuth:(res,provider,uri)=>dispatch(actions.socialLogin(res,provider,uri))

  }
}


export default withRouter(connect(mapStatetoprops,mapDispatchtoprops)(Register ));

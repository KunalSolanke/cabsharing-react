import React, { Component } from 'react' ;
import './login.css' ;
import loginman from './logassets/loginman.png' ;
import avatar from './logassets/avatar.png' ;
import { Spin } from 'antd';
import {connect} from 'react-redux' ;
import * as actions from '../../../../store/actions/auth' ;
import LoginForm from './LoginForm';
import Absolutewrapper from '../../../../components/Absolutewrapper';


  
   
   
   
  
  




class Login extends Component {


    
    componentDidMount(){
        var nav= document.querySelector('.main-nav') ;
      if(nav.style.display ==='none' ){
          nav.style.display='contents';
      }
    }

   componentWillReceiveProps(newProps){
       if(this.props!== newProps){
       this.props=newProps ;
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
            <div>
                <div className="container-fluid">
    <div className="row box justify-content-center align-items-center">
       <div className="col-lg-6 col-sm-12 p-2  svg">
            <img  src={loginman} alt=""></img>
       </div>
       <div className="col-lg-6 col-sm-12 p-3  form ">
    
           <div className="d-flex flex-column justify-content-center align-center look">
              <div className=" flex-row img justify-content-center align-center">
                    <img src={avatar} alt="" className="face"></img><br />
              </div>
              {error}
              { (this.props.loading) ?  <Spin size="large" /> :
             <div className="row justify-content-between align-center log">
                 <LoginForm {...this.props} />
                              
             </div> 
    }     
           </div>
         </div>
      </div>
</div>  

                
</div>
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
        onAuth :(username,password) => dispatch(actions.authLogin(username,password)),
        onSocialAuth :  (response,provider,redirect) => dispatch(actions.socialLogin(response,provider,redirect))

    }
}



export default connect(mapStatetoprops,mapDispatchtoprops)(Login) 

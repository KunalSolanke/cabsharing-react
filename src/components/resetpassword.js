import React from 'react'

import { Modal, Button,Popover ,Input} from 'antd';
import { UserOutlined,QuestionOutlined, LockOutlined } from '@ant-design/icons';
import axios from 'axios';

const text=(<div><h6>Password Format</h6></div>)
const content = (
    <div>
      <p>Password Should be more than 8 words</p>
      <p>Password should have atleast one digit</p>
      <p>Password should have  atlesst one aplhabet
      </p>
      <p>Password should have atleast one special character </p>
    </div>
  );

class PassForm extends React.Component {
  state = {
    loading: false,
    email:null,
    sent:false,
    newpass1:'',
    newpass2:'',
    changed:false,
    visible:false ,
    token:null,
    key:'',
    uid:''
  };


  handleOk = () => {
      
   axios.defaults.headers={
       'Content-Type':'application/json',
       'Authorization':`Token ${this.state.token}`
   } 
   axios.post('/rest-auth/password/reset/confirm',{
       new_password1:this.state.newpass1,
       new_password2:this.state.newpass2,
       
   }).then(res=>{
       this.props.cancel()
   })
  };
  
  chnage1=(e)=>{
      this.setState({
          email:e.target.value
      })
  }
  change2=(e)=>{
    this.setState({
        newpass1:e.target.value
    })

}
change3=(e)=>{
    this.setState({
        newpass2:e.target.value
    })

}
change4=e=>{
    this.setState({
        key:e.target.value
    })
}
change5=e=>{
    this.setState({
        uid:e.target.value
    })
}
send=e=>{
    axios.defaults.headers={
        'Content-Type':'application/json',
        'Authorization':`Token ${this.state.token}`
    } 
    axios.post('http://127.0.0.1:8000/password/reset/',{
        email:this.state.email
    }).then(res=>
    this.setState({
        sent:true
    })
    )
}

componentDidMount(){
    this.setState({
        visible:this.props.visible,
        token:this.props.token

    })
}
UNSAFE_componentWillReceiveProps(n){
    if(n!==this.props){
    this.setState({
        visible:n.visible,
        token:n.token

    }) 
    console.log(n.visible)
}
}
 

  render() {
    const { visible, loading } = this.state;
    
    return (
      <div>
        <Modal
          visible={visible}
          title="Reset Password"
          onOk={this.handleOk}
          onCancel={this.props.cancel}
          footer={[
            <Button key="back" onClick={this.props.cancel}>
              Return
            </Button>,
            <Button key="submit" type="primary" loading={loading} onClick={this.handleOk}>
              Submit
            </Button>,
          ]}
        >
        { this.state.sent?(
            <>
            <div class="d-flex flex-row-reverse mb-1" style={{height:'50px',width:'50px',borderRadius:'100%',padding:'1rem',backgroundColor:'pink',textAlign:'center',float:'right'}}>
                <Popover placement="topLeft" content={content} trigger='hover' title={text}>
                <QuestionOutlined />
                </Popover>
            </div>
            <Input
            prefix={<UserOutlined className="site-form-item-icon pb-1" />}
            type="text"
            placeholder="Email"
            style={{marginBottom:'1rem'}}
            onChange={this.change1}/>
            <Input
            prefix={<UserOutlined className="site-form-item-icon pb-1" />}
            type="text"
            placeholder="Email"
            style={{marginBottom:'1rem'}}
            onChange={this.change1}/>
         <Input
          prefix={<LockOutlined className="site-form-item-icon pb-1" />}
          type="password"
          placeholder="NewPassword"
          style={{marginBottom:'1rem'}}
          onChange={this.change2}
        />
         <Input
          prefix={<LockOutlined className="site-form-item-icon pb-1" />}
          type="password"
          placeholder="NewPassword_confirm"
          style={{marginBottom:'1rem'}}
          onChange={this.change3}
        /></>)
        :(<><Input
            prefix={<UserOutlined className="site-form-item-icon pb-1" />}
            type="Email"
            placeholder="Email"
            style={{marginBottom:'1rem'}}
            onChange={this.change1}/>
            <button type="submit" style={{padding:".2rem 1.5rem",backgroundColor:'pink'}} onClick={this.send}>Send Mail</button></>)}
        </Modal>
      </div>
    );
  }
}



export default PassForm
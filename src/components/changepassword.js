import React from 'react'

import { Modal, Button,Popover ,Input} from 'antd';
import { QuestionOutlined, LockOutlined } from '@ant-design/icons';
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


// USING ANT-D STYLES 

class PassForm extends React.Component {


  state = {
    loading: false,
    oldpass:'',
    newpass1:'',
    newpass2:'',
    changed:false,
    visible:false ,
    token:null
  };

 

  //HANDLE SUBMISSION
  handleOk = () => {
   

   // API END POINT FOR CHANGE 
   axios.defaults.headers={
       'Content-Type':'application/json',
       'Authorization':`Token ${this.state.token}`
   } 
   axios.post('/rest-auth/password/change/',{
       new_password1:this.state.newpass1,
       new_password2:this.state.newpass2,
       old_password:this.state.oldpass
   }).then(res=>{
       this.props.cancel()
   })
  };

  //HANFLING THE INPUT CHANGES

  change1=(e)=>{
      this.setState({
          oldpass:e.target.value
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

///MOUNT
componentDidMount(){
    this.setState({
        visible:this.props.visible,
        token:this.props.token

    })
}


//UPDATE
UNSAFE_componentWillReceiveProps(n){
    if(n!==this.props){
    this.setState({
        visible:n.visible,
        token:n.token

    }) 
   // console.log(n.visible)
}
}
 

  render() {
    const { visible, loading } = this.state;
    
    return (
      <div>
        <Modal
                visible={visible}
                title="Password Change"
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
                
                  <div class="d-flex flex-row-reverse mb-1" style={{height:'50px',width:'50px',borderRadius:'100%',padding:'1rem',backgroundColor:'pink',textAlign:'center',float:'right'}}>
                          <Popover placement="topLeft" content={content} trigger='hover' title={text}>
                          <QuestionOutlined />
                          </Popover>
                  </div>

                  <Input
                    prefix={<LockOutlined className="site-form-item-icon pb-xl-1" />}
                    type="password"
                    placeholder="Old Password"
                    onChange={this.change1}
                    style={{marginBottom:'1rem'}}
                  />

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
                  />     
        </Modal>
      </div>
    );
  }
}



export default PassForm
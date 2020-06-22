import React from 'react';
import { Form ,Button,Select } from 'antd';
// import { UserOutlined, LockOutlined } from '@ant-design/icons';
import axios from 'axios'
import {connect} from 'react-redux'
import {withRouter} from 'react-router-dom'
import * as navactions from '../../store/actions/nav'
import * as msgactions from '../../store/actions/messages'

class AddchatForm extends React.Component {
    state = {
        usernames:[],
        error: null
    }
 

  onFinish = values => {
    console.log('Finish:', values);
    const {usernames } =this.state
    const combinedusers = [...usernames,this.props.username]
    console.log(combinedusers)
    axios.defaults.headers = {
      'Content-Type' : "application/json",
       'Authorization' : `Token ${this.props.token}`
    }
    axios.post(`http://127.0.0.1:8000/capi/${this.props.username}/chats/`,{
      messages: []   ,
      participants : combinedusers
    }).then(res => {
      this.props.history.push(`/users/chat/${res.data.id}`)
      console.log('hello')
      this.props.closeaddchatpopup()
      this.props.getuserchats(this.props.username,this.props.token)
    }).catch(err => {
      this.setState({
        error : err
      }
      )
    })
  };

  change= value =>{
      this.setState({
          usernames: value
      })
  }

render(){
  return (
    
    <Form name="horizontal_login" layout="inline" onFinish={this.onFinish}>
      {this.state.error ?   `${this.state.error}`: null }
      <Form.Item
        name="username"
        rules={[
          {
            required: true,
            message: 'Please input your username!',
          },
        ]}
      >
          <Select
          mode = "tags"
          palceholder="Add a Friend"
          style ={{ width: "100%" }}
          onChange = {this.change}>{[]}</Select>
        
      </Form.Item>
      
      <Form.Item shouldUpdate>
        {() => (
          <Button
            type="primary"
            htmlType="submit"
            // disabled={
            //   !form.isFieldsTouched(true) ||
            //   form.getFieldsError().filter(({ errors }) => errors.length).length
            // }
          >
            Start a CHat
          </Button>
        )}
      </Form.Item>
    </Form>
  );
};
}
const mapstateToprops = state => {
  return {
    username : state.auth.username,
    token : state.auth.token
  }
}

const mapdispacttoprops  = dispatch => {
  return {
    closeaddchatpopup : () => dispatch(navactions.close_chat_popup()) ,
    getuserchats: (username,token) => dispatch(msgactions.getuserchats(username,token))
  }
}


export default withRouter(connect(mapstateToprops,mapdispacttoprops)(AddchatForm)) ;

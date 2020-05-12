import React, { Component } from 'react' ;
import { List, Avatar ,Button,Card,notification} from 'antd';
import { MessageOutlined, LikeOutlined, StarOutlined,SmileOutlined} from '@ant-design/icons';
import {connect} from 'react-redux' ;
import {withRouter} from 'react-router-dom'
import axios from 'axios' ;
import NotWebscoketServiceInstance from '../../../../Notification/notWebsocket';
import * as msgactions from '../../../../store/actions/messages'

const IconText = ({ icon, text }) => (
  <span>
    {React.createElement(icon, { style: { marginRight: 8 } })}
    {text}
  </span>
);


class  Booking extends Component {

  onFinish = name => {
    
    
    const combinedusers = [name,this.props.username]
    axios.defaults.headers = {
      'Content-Type' : "application/json",
       'Authorization' : `Token ${this.props.token}`
    }
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


  constructor(props) {
    super(props)
     this.notify =this.notify.bind(this)
  
    this.state = {
     load: false ,
     fetched : false ,
     matches : [],
     profiles: [],
     currbookid: 0
    
   
    }
    this.clickhandler = this.clickhandler.bind(this)
  }

  async clickhandler(e,id) {
    this.setState(
      {load:true,
      currbookid: id}
    )
   
    switch(this.props.name) {
      case 'match' : 
    
       await axios.get(`http://127.0.0.1:8000/uapi/matches/${id}/`)
             .then(res =>{
               this.setState({
                 matches : res.data 
               })
     
       })
  
      var k = []
      const profiles = [...Array(this.state.matches.length)].map(async (_,index)=> {
       const response = await axios.get(`http://127.0.0.1:8000/uapi/${this.state.matches[index].user}/profile/`)
       console.log(response)
       k=[...k,response.data[0]]
       await this.setState({
        profiles : k
      })
      
       
       return response.data[0]
     
    }
      
       ) 
        break ;
      case 'delete' :console.log('delete') ;
                break 
      case 'Send Request':console.log('send message') ;
                      break
      default:break ;
    }
  }


   notify (username,place,id) {
    const NotifyObj = {
       command: 'new_notification',
       from : this.props.username,
       to:username ,
       type:'request',
       bookfromid:this.state.currbookid,
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

   componentDidUpdate(){
     console.log(this.state.profiles)
   }
    
  render() {
        const matches = this.state.matches.map((match,index) => {
      
      if(this.state.profiles.length === this.state.matches.length){
       
      return (
        <Card>
          <div class = "row">
            <div class = "col-lg-6">
              <h3>
                {this.state.profiles[index].Name}
              </h3>
              <p>
                Going to<br/>: {match.place}<br/>
                on : {match.date} <br />
                friends:{match.allow_with}
              </p>
              
              <button onCLick ={()=>this.onFinish(this.state.profiles[index].Name)}class="btn btn-primary" type='submit'>Chat</button><br/><br/>
              <button  onClick ={() => this.notify(this.state.profiles[index].Name,match.place,match.id)} class="btn btn-primary"type='submit'>Send Request</button><br/>
              
              

            </div>
            <div class="col-lg-6">
              <img
            width={200}
            
            alt="logo"
            src={this.state.profiles[index].profile_pic}
          />
          </div>
          </div>
           </Card>

      )
      }
    })
    return (
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
    dataSource={this.props.data}
    
    renderItem={item => (
      <List.Item
        key={item.place}
        className="mb-3"
        style={{backgroundColor:'#43c7d8'}}
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
          title={<a href={`/users/booking/${item.id}`}>{item.place}</a>}
          description={item.special_req}
        />
        {item.prirority}
        { this.props.name === 'match' ?
        <div>
          <button class ="btn btn-primary" data-toggle="modal" data-target="#model" onClick={(event) => this.clickhandler(event,item.id)}>Find Matches</button>
          <div  class="modal fade" id="model" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
 <div style = {{ width : '60vw'}} class="modal-dialog modal-dialog-centered" role="document">
 <div style = {{ width : '60vw'}} class="modal-content">
 <div class="modal-header">
 <h5 class="modal-title" id="exampleModalLabel">Available</h5>
 <button type="button" class="close" data-dismiss="modal" aria-label="Close">
 <span aria-hidden="true">&times;</span>
 </button>
 </div>
 <div class="modal-body">
  {this.state.profiles && matches}
   
  
 ...
 </div>
 <div class="modal-footer">
 <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
 {/* <button type="button" class="btn btn-Close">Save changes</button> */}
 </div>
 </div>
 </div>
 </div>
        </div>
        :<Button type="primary"   onClick={(event) => this.clickhandler(event,item.id)}>{this.props.name}</Button>}


      </List.Item>
    )}
  />


            
        </div>
    )
}
}
const mapStateToprops = state => {
  return {
      username : state.auth.username,
      messages : state.message.messages
  }
}

const mapdispacttoprops  = dispatch => {
  return{
    getuserchats: (username,token) => dispatch(msgactions.getuserchats(username,token))
  }
}
export default withRouter(connect(mapStateToprops,mapdispacttoprops)(Booking))
 
 
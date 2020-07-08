import React, { Component } from 'react'
import { Button} from 'antd';
import NotWebscoketServiceInstance from  './notWebsocket'
import { Drawer, Row ,Card} from 'antd';
import {connect} from 'react-redux' ;
import {withRouter} from 'react-router-dom' ;






export class Notifications extends Component {

    constructor(props) {
        super(props)
        NotWebscoketServiceInstance.fetchMessages(this.props.username)
        this.state = {
          
        }
  }

  //NOTIFIVATION CONFIRM HANDLER 
  confirmhandler(username,idfrom,idto,type,id){
          const NotifyObj = {
            command: 'new_notification',
            from : this.props.username,
            to:username ,
            bookfromid: idfrom,
            booktoid:idto,
            type:'confirm',
            typeb:type,
            notification: `hello there !!${this.props.username} have accepted your request to go to look the booked scetion`
      
        }
        NotWebscoketServiceInstance.newChatMessage(NotifyObj) ;
        NotWebscoketServiceInstance.setreadandfetch(this.props.username,id)
    }




    readhandler(id){
      NotWebscoketServiceInstance.setreadandfetch(this.props.username,id)  
    }



    renderNotifications(notifications) {
     // console.log('Hi') ;
          return this.props.messages.map(message => {
            return (
              <Row style ={{ paddingTop: '2vh'}}>
                <Card title='New Notification'>
                  <p>{message.content}</p><br />
                  <p>Time:{message.timestamp}</p>
                  { message.type === 'request' ?
                  <>
                  <Button style ={{ left: '2vw'}} type="primary" size="small" onClick={()=>this.confirmhandler(message.author,message.bookfromid,message.booktoid,message.typeb,message.id)}>
              Confirm Ride 
                  </Button>
                  <Button style ={{ left: '5vw'}} type="primary" size="small" onClick={()=>this.readhandler(message.id)}>Mark Read</Button>
                   </> :<Button style ={{ left: '2vw'}} type="primary" size="small" onClick={()=>this.readhandler(message.id)}>
              Mark read
            </Button> }
                  
                </Card>
              </Row>
            )
          })
    }


    
  drawwidth(){
      var width=window.innerWidth ;
      if(width>750){
        return '40vw'
      }else if(width<500){
        return '100vw'
      }else{
        return '70vw'
      }
    }
    
      
    render() {
      
        return (
        <div>    
        <Drawer
          width={this.drawwidth()}
          drawerStyle={{ backgroundColor:'#007991'}}
          placement="right"
          closable={false}
          onClose={this.props.onClose}
          visible={this.props.visible}
        >
              <div className='profile-drawer'>
                  <h3><p className="site-description-item-profile-p">
                      Notifications
                    </p></h3>
                    {this.renderNotifications(this.state.messages)}
              </div>
              <button className="btn  btn-danger" onClick={this.props.onClose}>close</button>
        </Drawer>
      </div>
        )
    }
}
const mapStateToprops = state => {
    return {
        username : state.auth.username,
        messages : state.notification.messages
    }
}


export default withRouter(connect(mapStateToprops,null)(Notifications))



   
    
  

  


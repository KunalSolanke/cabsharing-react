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
    
    renderNotifications(notifications) {
      console.log('Hi') ;
      return this.props.messages.map(message => {
        return (
          <Row style ={{ paddingTop: '2vh'}}>
            <Card title='New Notification'>
              <p>{message.content}</p><br />
              { message.type === 'request' ?
              <Button style ={{ left: '2vw'}} type="primary" size="small" >
          Confirm Ride
               </Button> :<Button style ={{ left: '2vw'}} type="primary" size="small" >
          Ok
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
          drawerStyle={{ backgroundColor:'#e8ffe8'}}
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
        messages : state.message.messages
    }
}


export default withRouter(connect(mapStateToprops,null)(Notifications))



   
    
  

  


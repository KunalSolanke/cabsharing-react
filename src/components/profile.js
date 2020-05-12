import { Drawer,  Divider, Col, Row } from 'antd';
import React from 'react' ;
import axios from 'axios' ;
import {connect} from 'react-redux' ;
import {withRouter} from 'react-router-dom' ;
import './profile.css' ;
const pStyle = {
  fontSize: 16,
  lineHeight: '24px',
  display: 'block',
  marginBottom: 16,
};

const DescriptionItem = ({ title, content }) => (
  <div
    className="site-description-item-profile-wrapper"
    style={{
      fontSize: 14,
      lineHeight: '22px',
      marginBottom: 7,
    }}
  >
    <p
      className="site-description-item-profile-p"
      style={{
        marginRight: 0,
        display: 'inline-block',
      }}
    >
      {title}:
    </p>
    {content}
  </div>
);

class Profile extends React.Component {
    constructor(props) {
        super(props)
    
        this.state = {
            profile : {}
             
        }
    }

    componentDidMount(){
     
        console.log("mounted")
        if(this.props.token) {
            axios.defaults.headers = {
                'Content-Type': 'application/json',
                'Authorization': `Token ${this.props.token}`
            }

            axios.get("http://127.0.0.1:8000/uapi/0/profile/").then
            (res => {
               this.setState({
                   profile: res.data[0]
                  
               })
               console.log(this.state.profile)

            })
        }
    }
    componentWillUpdate(newProps) {
       
            console.log("mounted")
            if(newProps.token && newProps.token !== this.props.token) {
                axios.defaults.headers = {
                    'Content-Type': 'application/json',
                    'Authorization': `Token ${newProps.token}`
                }
    
                axios.get("http://127.0.0.1:8000/uapi/0/profile/").then
                (res => {
                   this.setState({
                       profile: res.data[0]
                      
                   })
                   
                })
            }
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
           drawerStyle={{ backgroundColor:'#e8ffe8'}}
          width={this.drawwidth()}
          placement="right"
          closable={false}
          onClose={this.props.onClose}
          visible={this.props.visible}
        >
          <div className="profile-drawer">
          <h3><p className="site-description-item-profile-p" style={{ ...pStyle, marginBottom: 24 }}>
            User Profile
          </p></h3>
         
          <Row style = {{ height : '25vh' ,alignItems:'center',
        justifyContent:'center',display:'flex'}}>

               <div >
                   <img class="img img-responsive img-circle face" alt=""src={this.state.profile.profile_pic}></img>
                   <h4>{this.state.profile.Info}</h4>
               </div>
              
              
          </Row>
          <Divider />

          <p className="site-description-item-profile-p" style={pStyle}>
            Personal
          </p>
          <Row >
            <Col span={12}>
              <DescriptionItem title="Name" content={this.props.username} />
            </Col>
            <Col span={12}>
              <DescriptionItem title="College" content="IIT_Guwahti" />
            </Col>
          </Row>
          <Row>
            <Col span={12}>
              <DescriptionItem title="City" content="Guwahati,Assam" />
            </Col>
            
          </Row>
        
          



          <Divider />
          <p className="site-description-item-profile-p" style={pStyle}>
            Additional
          </p>
          <Row>
            <Col span={12}>
              <DescriptionItem title="Year" content={this.state.profile.Year} />
            </Col>

          </Row>
          <Divider />
          <p className="site-description-item-profile-p" style={pStyle}>
            Contacts
          </p>
          <Row>
           
            <Col span={12}>
              <DescriptionItem title="Phone Number" content={this.state.profile.contact} />
            </Col>
          </Row>
        
          <button className="btn  btn-success" onClick={this.props.onClose}>close</button>
        </div></Drawer>
      </div>
    );
  }
}

const mapStatetpprops = state => {
    return {
        username : state.auth.username,
        token : state.auth.token
    }
}

export default withRouter(connect(mapStatetpprops,null)(Profile)) ;
import { Drawer,  Divider, Col, Row } from 'antd';
import React from 'react' ;
import axios from 'axios' ;
import {connect} from 'react-redux' ;
import ProfileImage from './profileimg' ;
import {withRouter} from 'react-router-dom' ;
import './profile.css' ;
import * as actions from '../store/actions/auth'

//CSS-IN-JS
const pStyle = {
  fontSize: 22,
  lineHeight: '26px',
  display: 'block',
  marginBottom: 16,
  color:'white',
  
};

const inputstyle={
  padding:'.3rem .1rem',
  backgroundColor:'rgba(227, 66, 142, 0.8)',
  borderRadius:'20px',
 
  marginRight:'.6rem',
  outline:'none',
  width:'95%',
  color:'white',
  textAlign:'center',
  fontweight:300,
  fontsize:17,
  marginBottom:'1rem'


}

// const DescriptionItem = ({ title, content }) => (

//   <div
//     className="site-description-item-profile-wrapper"
//     style={{
//       fontSize: 14,
//       lineHeight: '22px',
//       marginBottom: 7,
//       color:'black'
//     }}
//   >
//     <p
//       className="site-description-item-profile-p"
//       style={{
//         marginRight: 0,
//         display: 'inline-block',
//       }}
//     >
//       {title}:
//     </p>
//     {content}
//   </div>
// );



class Profile extends React.PureComponent {
    constructor(props) {
        super(props)
        this.biochange=this.biochange.bind(this)
        this.contactChange=this.contactChange.bind(this)
        this.namechange=this.namechange.bind(this)
        this.hostelchange=this.hostelchange.bind(this)
        this.citychange=this.citychange.bind(this)
        this.profileChange=this.profileChange.bind(this)
        this.collegechange=this.collegechange.bind(this)
        this.yearchange=this.yearchange.bind(this)
        this.logout=this.logout.bind(this)
        this.state = {
            profile : {},
            contact:null,
            year:null,
            Info:null,
            Name:null,
            hostel:null,
            city:null,
            college:null
             
        }
    }
    


    //LOGOUT HANDLER
    logout(){
     // console.log('Start logout')
      this.props.logout(this.props.token)
     // console.log(this.props.error,this.props.token)
      this.props.history.push("/login")
      
    }



    //UPDATING THE PROFILE 

    profileChange(){

      //ENDPOINT
      axios.defaults.headers={
        'Content-Type':'application/json',
        'Authorization':`Token ${this.props.token}`
      }
      axios.put('/rest-auth/user/',{
        username:this.props.username,
        Name:this.state.Name,
        city:this.state.city,
        college:this.state.college,
        hostel:this.state.hostel,
        Info:this.state.Info,
        contact:this.state.contact,
        Year:this.state.year
      }).then(res=>{
        console.log(res.data)
        this.setState({
         profile:res.data,
         
        })
      })
    }


    //INPUT CHANGE HANDLERS
   biochange(e){
     this.setState({
       Info:e.target.value
     })
   }
   citychange(e){
    this.setState({
      City:e.target.value
    })
  }
  collegechange(e){
    this.setState({
      college:e.target.value
    })
  }
  hostelchange(e){
    this.setState({
      hostel:e.target.value
    })
  }
  namechange(e){
    this.setState({
      Name:e.target.value
    })
  }
  contactChange(e){
    this.setState({
      contact:e.target.value
    })
  }
  yearchange(e){
    this.setState({
      year:e.target.value
    })
 }




  
  
   //MOUNT
  componentDidMount(){
     
        //console.log("mounted")
        if(this.props.token) {

          //FETCH THE PROFILE
            axios.defaults.headers = {
                'Content-Type': 'application/json',
                'Authorization': `Token ${this.props.token}`
            }

            axios.get("/uapi/0/profile/").then
            (res => {
               this.setState({
                   profile: res.data[0],
                   year:res.data[0].Year,
                   Info:res.data[0].Info,
                   contact:res.data[0].contact,
                   Name:res.data[0].Name
                  
               })
               //console.log(this.state.profile)

            })
        }
  }


    //UPDATE
  componentWillUpdate(newProps) {
       
           // console.log("will update")
            if(newProps.token && newProps.token !== this.props.token) {
                axios.defaults.headers = {
                    'Content-Type': 'application/json',
                    'Authorization': `Token ${newProps.token}`
                }
    
                axios.get("/uapi/0/profile/").then
                (res => {
                   this.setState({
                       profile: res.data[0]  ,
                       year:res.data[0].Year,
                       Info:res.data[0].Info,
                       contact:res.data[0].contact,
                       Name:res.data[0].Name
                   })
                   
                })
            }
  }


    //MAKING RESONSIVE
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





  //PROFILE DRAWER

  render() {
     

    return (
      <div>
        <Drawer
           drawerStyle={{ backgroundColor:'rgba(227, 66, 142, 0.60)'}}
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
                <div class="Logout">
                  <button style={{borderRadius:'30px',backgroundColor:'pink',padding:'.1rem 2rem',marginBottom:'2rem'}} onClick={()=>this.logout()}>Logout</button>
                 </div>
                  
                    <Row style = {{ height : '25vh' ,alignItems:'center',
                          justifyContent:'center',display:'flex'}}>

                        <Col span={24} style={{justifyContent:'center',textAlign:'center'}}>
                              <ProfileImage name={this.state.profile.profile_pic} token={this.props.token} username={this.props.username}/>
                            <h1 style={{color:'white'}}>{this.props.username}</h1>
                        </Col>    
                    </Row>
                    <Divider />

                    <p className="site-description-item-profile-p" style={pStyle}>
                      Personal
                    </p>
                    <Row >
                          <Col span={12}>
                            <h6 style={{color:'white',marginBottom:'1rem'}}>Name:</h6><input type="text" value={this.state.Name} onChange={(e)=>this.namechange(e)} style={inputstyle}></input>
                          </Col>
                            
                          <Col span={12}>
                            <h6 style={{color:'white',marginBottom:'1rem'}}>College:</h6><input type="text" style={inputstyle}value={this.state.college||'IIT GUWAHATI'} onChange={(e)=>this.collegechange(e)}></input>
                          </Col>
                          <Col span={24}>
                              <h6 style={{color:'white'}}>Bio:</h6><textarea row="5" value={this.state.Info} onChange={(e)=>this.biochange(e)} style={inputstyle}></textarea> 
                          </Col>
                          </Row>
                          <Row>     
                    </Row>
                  
                    <Divider />
                    <p className="site-description-item-profile-p" style={pStyle}>
                      Additional
                    </p>
                    <Row>
                      <Col span={12}>
                      <h6 style={{color:'white'}}>Year:</h6><input type="text" style={inputstyle} value={this.state.year} onChange={(e)=>this.yearchange(e)}></input>
                      </Col>

                    </Row>
                    <Divider />
                    <p className="site-description-item-profile-p mb-3" style={pStyle}>
                      Contacts
                    </p>
                    <Row>
                      <Col span={12}>
                        <h6 style={{color:'white',marginBottom:'1rem'}}>Contact</h6>
                        <input type="text"style={inputstyle} value={this.state.contact} onChange={(e)=>this.contactChange(e)}></input>
                      </Col>
                      <Col span={12}>
                        <h6 style={{color:'white',marginBottom:'1rem'}}>Email:{this.props.email}</h6>
                      </Col>
                    </Row>
                    <Row>
                    <Col span={12}>
                      <button className="btn  btn-success" onClick={this.profileChange} style={{margin:'1rem 0rem',backgroundColor:'pink'}}>SaveChanges</button>
                    </Col>
                      <Col span={12}>
                    <button className="btn  btn-success" onClick={this.props.onClose} style={{margin:'1rem 0rem',backgroundColor:'pink'}}>close</button>
                    </Col>
                    </Row>
                </div>
            </Drawer>
      </div>
    );
  }
}

const mapStatetpprops = state => {
    return {
        username : state.auth.username,
        email:state.auth.email,
        token : state.auth.token,
        error:state.auth.error
    }
}

const mapDispatchToprops=dispatch=>{
  return {
  logout:(key)=>dispatch(actions.authlogout(key))
  }
}

export default withRouter(connect(mapStatetpprops,mapDispatchToprops)(Profile)) ;
























// shouldComponentUpdate(np){
  //   console.log( np.visible!==this.props.visible || np.token!==this.props.token ||np.username!==this.props.username||
  //     np.email!==this.props.email,np,this.props)
  //   return(
  //     np.visible!==this.props.visible || np.token!==this.props.token ||np.username!==this.props.username||
  //     np.email!==this.props.email
  //   )
  // }
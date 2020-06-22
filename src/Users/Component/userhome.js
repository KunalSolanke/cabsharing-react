import React, { Component } from 'react' ;
import UserLayout from '../../containers/userLayout' ;
import PlaceCarousel from './userHome/explorecarousel';
import {connect} from 'react-redux' ;
import {withRouter} from 'react-router-dom'
import * as msgactions from '../../store/actions/messages'
import NotWebscoketServiceInstance from '../../Notification/notWebsocket';
import mpstyles from './Profile/container/maps' ;
import PlacesList from './userHome/explaceslist' ;

import { compose, withProps } from "recompose"
import { withScriptjs, withGoogleMap, GoogleMap, Marker } from "react-google-maps"
import Loadsvg from '../../components/loadsvg';
var ldx=0 ;
const MyMapComponent = compose(
  withProps({
    googleMapURL: "https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=AIzaSyBVCvT-6bmb0KQx8GOaAzHDf9upNZdbcxk",
    loadingElement: <div style={{ height: `100%` }} />,
    containerElement: <div style={{ height: `90vh` }} />,
    mapElement: <div style={{ height: `100%` }} />,
  }),
  withScriptjs,
  withGoogleMap
)((props) =>
  <GoogleMap
    defaultZoom={8}
    defaultCenter={{ lat:26.144518, lng: 91.736237}}
    defaultOptions={{styles:mpstyles}}
  >
    {props.isMarkerShown && <Marker position={{ lat: 26.144518, lng: 91.736237 }} />}
  </GoogleMap>
) ;

//import Bookingslist from './Booking/UserBookings/container/bookingslist';

class Userhome extends Component {
  initializeCHat(){
    
    NotWebscoketServiceInstance.connect()
    
    this.waitforSocketConnection(()=>{NotWebscoketServiceInstance.fetchMessages(this.props.username)})
} 
    state = {
    isMarkerShown: false,
  }

  

  delayedShowMarker = () => {
    setTimeout(() => {
      this.setState({ isMarkerShown: true })
    }, 3000)
  }

  handleMarkerClick = () => {
    this.setState({ isMarkerShown: false })
    this.delayedShowMarker()
  }

    constructor(props) {
        super(props)
        this.initializeCHat()
        NotWebscoketServiceInstance.addCallbacks(this.props.setmessage.bind(this),this.props.addmessage.bind(this))
        this.state = {
             load:true,
             ldcount:0
        }
    }
    
    waitforSocketConnection(callback) {
      const component = this
     
       setTimeout(
           function(){
              if (NotWebscoketServiceInstance.state() === 1 ) {
                  console.log("connetion is secure") ;
                      callback() ;
              
                  return ;
              }else {
                  console.log("waiting for connection ...")
                  component.waitforSocketConnection(callback)
                 
              }
  
            
          }
       ,100) ;}


  
    componentDidMount(){
      if(NotWebscoketServiceInstance.state === 1){
        NotWebscoketServiceInstance.disconnect() ;
      }
      this.delayedShowMarker()
      var nav= document.querySelector('.main-nav') ;
      nav.style.display = 'none' ;
      setTimeout( ()=>{
        if(!ldx){
        var ldout = document.querySelector('.load')
         ldout.classList.add('load-inactive')
        }
        
        this.setState({
          load:false
        })
        ldx+=1
      
    },4000)
    }

    render() {
        return !(this.state.load) || ldx? (
            <div>
                
                <UserLayout>
                    <div className="row justify-content-center align-items-center">
                      <div className="col-lg-8 col-sm-10 col-xs-12">
                        <PlaceCarousel />
                      </div>
                    </div>
                    <div class="row justify-content-center mb-5 p-5 mr-2 ml-2"> 
                    <div>
                    <h1>Welcome {this.props.username}</h1>
                    <p>Here are top places to visit in Guwahati</p>
                    </div></div>
                    <div class ="row justify-content-around align-items-center rounded">
                   
                    <div class="col-lg-6 col-sm-10 col-xs-12">
                    {/* <PlaceCarousel /> */}
                    <PlacesList />
                    </div>
                    <div class="col-lg-6 col-sm-10 col-xs-12">
                    <MyMapComponent   isMarkerShown={this.state.isMarkerShown}
        onMarkerClick={this.handleMarkerClick}
      />
                    </div>
                    </div>
                   
      
                    
                </UserLayout>
                
        
                
                
            </div>
        ):(<Loadsvg />)
    }
}
const mapStateToprops = state => {
    return {
        username : state.auth.username,
        messages : state.message.messages
    }
}
const mapDispatchToprops = dispatch => {
    return {
        addmessage : (message) => dispatch(msgactions.add_message(message)),
        setmessage : (messages) => dispatch(msgactions.set_messages(messages))
    }
}


export default withRouter(connect(mapStateToprops,mapDispatchToprops)(Userhome))
// initializeCHat(){
    //     NotWebscoketServiceInstance.connect(this.props.match.params.chatId)
    //     this.waitforSocketConnection(() => {
           
            
    //     })
    // }
    // waitforSocketConnection(callback) {
    //     const component = this
       
    //      setTimeout(
    //          function(){
    //             if (NotWebscoketServiceInstance.state() === 1 ) {
    //                 console.log("connetion is secure") ;
    //                     callback() ;
                
    //                 return ;
    //             }else {
    //                 console.log("waiting for connection ...")
    //                 component.waitforSocketConnection(callback)
                   
    //             }

              
    //         }
    //      ,100) ;}
import { Carousel} from 'antd';
import React from 'react'
import axios from 'axios' ;
import {connect} from 'react-redux' ;
import {withRouter} from 'react-router-dom' ;

class PlaceCarousel extends React.Component {
  state = {
    places : []
   
  };
  componentDidMount(){
   
   
    if(this.props.token !==null && this.props.token !== undefined) {
    axios.defaults.headers = {
      'Content-Type' : 'application/json' ,
      'Authorization' : `Token ${this.props.token}`
    }
    axios.get("http://127.0.0.1:8000/uapi/places/").then(
      res => {
      this.setState({
        places : res.data
      })
      console.log("hi",this.state.places)
    }
    )
      
    
  }
}

componentWillUpdate(newProps) {
 
  if(newProps.token !==null && newProps.token !== undefined && newProps.token !==this.props.token) {
    axios.defaults.headers = {
      'Content-Type' : 'application/json' ,
      'Authorization' : `Token ${newProps.token}`
    }
    axios.get("http://127.0.0.1:8000/uapi/places/").then(
      res => {
        console.log(res.data)
      this.setState({
        places : res.data
      })
      console.log(this.state.places)
    }
    )
      
    
  }

}


  render() {
    const places = this.state.places.map(
      place=> {
        return (
          <div className="row justify-content-center align-items-center p-4 ml-3" style ={{ height : 'auto'}}>
            <div className="col-lg-2 col-sm-2"></div>
            <div classdName="col-lg-10 col-sm-10">
              
              <img className="mb-2 img-responsive"src={place.image} alt=""style={{ width:'70vw',height:'60vh' ,objectFit:'cover'}}></img>            
              <div className="mb-3">
                 <h3 style={{color:"#000"}}>{place.name}</h3>
                 <p>{place.palce_info}</p>
             </div>
           </div>

          </div>
        )
      }
    )
   
    return (
      <div>
       
        <Carousel autoplay dotPosition='right' className="mb-3">
          {places}
          {/* <div>
            <h3>1</h3>
          </div>
          <div>
            <h3>2</h3>
          </div>
          <div>
            <h3>3</h3>
          </div>
          <div>
            <h3>4</h3>
          </div> */}
        </Carousel>
      </div>
    );
  }
}

const mapStatetoprops = state => 
{
  return {
    username : state.auth.username,
    token : state.auth.token
  }
}

export default withRouter(connect(mapStatetoprops,null)(PlaceCarousel)) ;

import React from 'react'
import axios from 'axios' ;
import {connect} from 'react-redux' ;
import {withRouter} from 'react-router-dom' ;

class PlaceList extends React.Component {
  state = {
    places : []
   
  };
  componentDidMount(){
   
   
    if(this.props.token !==null && this.props.token !== undefined) {
    axios.defaults.headers = {
      'Content-Type' : 'application/json' ,
      'Authorization' : `Token ${this.props.token}`
    }
    axios.get("/uapi/places/").then(
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
    axios.get("/uapi/places/").then(
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
          <div className="row justify-content-between align-items-center  place b-4  p-2 mb-3 rounded" style={{height:'auto',borderBottom:'rgba(0, 161, 206, 1)',borderRadius:'20px'}} >
       
            <div className = "col-lg-7 col-sm-12">
                <div>
            <h3 className="text-dark" style={{color:"#000"}}>{place.name}</h3>
            <p>{place.palce_info}</p>
            </div>
            </div>
            <div  className = "col-lg-5 col-sm-12" >
              <img className="img img-responsive img-rounded" src={place.image} alt=""style={{ height:'18vh',width:'100%',objectFit:'contain',overflow:'hidden'}}></img>
            </div>           
        </div>

            

         
        )
      }
    )
   
    return (
      <div style={{height:'90vh',overflow:'scroll'}} className="new_scroll mb-5 p-4">
       {places}
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

export default withRouter(connect(mapStatetoprops,null)(PlaceList)) ;
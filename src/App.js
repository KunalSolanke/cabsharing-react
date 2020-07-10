import React, { Component } from 'react' ;
import {BrowserRouter as Router} from 'react-router-dom' ;
import BaseRouter from './route' ;
// import {connect } from 'react-redux' ;
// import * as actions from './store/actions/auth' ;







export class App extends Component {

   

    componentDidMount() {
       // this.props.onTryAutoSignUp() ;
       
    }
    render() {
        return (
            <div>
                 <Router>
                     {/* <Nav /> */}
                     <main {...this.props}>
                          <BaseRouter />
                        
                    </main>
                 </Router>
                

            </div>
        )
    }
}

// const mapStatetoProps = state => {
//     return {
//         isAuthenticate : state.auth.token !==null 
//     }
// }

// const mapDispatchToprops = dispatch => {
//     return {
//         onTryAutoSignUp : () =>dispatch(actions.authCheckState())
//     }
// }

export default   App;


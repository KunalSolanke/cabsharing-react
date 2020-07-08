import React, { Component } from 'react' ;
import {NavLink} from 'react-router-dom' ;

export class Nav extends Component {
    render() {
        return (
            <div className="container-fluid  main-nav">
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark text-white">
                <a className="navbar-brand text-white text-center mx-3 headera" href="/"><h3><i className="fa fa-car fa-white mx-1" aria-hidden="true"></i>Humraahi</h3></a>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon  text-white"></span>
                </button>
                <div className="collapse navbar-collapse text-white" id="navbarSupportedContent">
                    <ul className="navbar-nav mr-auto text-white">
                       <li className="nav-item  text-center text-white mx-3">
                           <NavLink exact to="/" className="text-white text-center" activeClassName=" text-white">Home</NavLink>
                       </li>
                       <li className="nav-item mx-3 text-center">
                           {/* <a className="nav-link text-white" href="#">About Us</a> */}
                           <NavLink exact to ="/about" className="text-white text-center py-auto" activeClassName=" text-white">About</NavLink><br />

                       </li>
                       <li className="nav-item dropdown mx-3 text-center">
                           <a className="dropdown-toggle text-white" href="/#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="false" aria-expanded="false">
                                Join Us
                            </a>
                           
                            <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                               <NavLink exact to ="/login" activeClassName="bg-dark text-white" className="dropdown-item" href="/#" >login</NavLink><br />
                               <NavLink exact to ="/register" activeClassName="bg-dark text-white" className="dropdown-item"  href="/#">Register</NavLink><br />
                               <div className="dropdown-divider"></div>
                               <NavLink exact to ="/contact" activeClassName="bg-dark text-white"className="dropdown-item" href="/#" >Contact Us</NavLink>
                           </div>
                        </li>
                   </ul>
                   <form className="form-inline my-2 my-lg-0">
                        <input className="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search" />
                        <button className="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
                   </form>
               </div>
          
        </nav>
        </div>
        )
    }
}

export default Nav

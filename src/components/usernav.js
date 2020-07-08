import React from 'react'

import {NavLink}from 'react-router-dom' ;

function Usernav() {
    return (
       
        <header class="user-head">
        
<div className="container-fluid mb-2">
<nav className="navbar navbar-expand-lg navbar-toggleable usernav text-white ">
    <a className="navbar-brand text-white" href="#"><h3><i className="fa fa-car fa-white" aria-hidden="true"></i>Humraahi</h3></a>
    <button className="navbar-toggler navbar-toggler-right" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon  text-white"></span>
    </button>
    <div className="collapse navbar-collapse text-white " id="navbarSupportedContent">
        <ul className="navbar-nav   text-white align-items-right" style={{position:'absolute',right:"5%"}}>
           <li className="nav-item active text-white">
               <NavLink exact to="/users" className="nav-link text-white hello" >Explore </NavLink>
           </li>
         
           <li className="nav-item dropdown">
               <a className="nav-link dropdown-toggle text-white"  id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    Bookings
                </a>
               
                <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                   <NavLink exact to ="/users/Book"><a activeClassName="dropdown-item text-white" >Book Your Ride</a></NavLink><br />
                   <NavLink exact to ="/users/"><a activeClassName="dropdown-item text-white" >Previous bookings</a></NavLink><br />
                   
                   <NavLink exact to ="/contact"><a activeClassName="dropdown-item text-white" >Current Bookings</a></NavLink>
               </div>
            </li>
            <li className="nav-item dropdown">
               <a className="nav-link dropdown-toggle text-white"  id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    Profile
                </a>
               
                <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                   <NavLink exact to ="/login"><a activeClassName="dropdown-item" >Profile</a></NavLink><br />
                   <NavLink exact to ="/register"><a activeClassName="dropdown-item" >Notifications</a></NavLink><br />
                   
                   <NavLink exact to ="/contact"><a activeClassName="dropdown-item" >Settings</a></NavLink>
               </div>
            </li>
            <li className="nav-item dropdown" style={{listStyleType:"none"}}>
               <a className="nav-link dropdown-toggle text-white"  id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    Chat
                </a>
               
                <div className="dropdown-menu bg-dark" aria-labelledby="navbarDropdown">
                   <NavLink exact to ="/users/chat"><a activeClassName="dropdown-item" style={{textDecoration:"none"}} >Friends</a></NavLink><br />
                   <NavLink exact to ="/users/globalchat"><a activeClassName="dropdown-item" style={{textDecoration:"none"}} >Global</a></NavLink><br />
                </div>
                   
            </li>
       </ul>
       
   </div>

</nav>
</div>

    </header>
  
  
    )
}

export default Usernav





import React,{useContext} from 'react' ;
import {Switch,Route,__RouterContext} from 'react-router-dom' ;
import Bookingslist from './Users/Component/Booking/UserBookings/container/bookingslist';
import BookingsDetail from './Users/Component/Booking/UserBookings/container/bookdetail';
import BookForm from './Users/Component/Booking/UserBookings/container/Bookform';
import Home from './Home/Component/Home/Home';
import Register from './Home/Component/Signup/Register/register';
import Login from './Home/Component/Signup/Login/login';
import Userhome from './Users/Component/userhome';
import prevbookinglist from './Users/Component/Booking/UserBookings/container/prevbookinglist';
import Chat from './chat/Chat';
import Index from './chat/Index';
import { useTransition,animated } from 'react-spring';
//import { animated } from 'react-spring/renderprops-universal';
import Nav from './components/nav'
import About from './components/About';
import Contact from './components/Contact';



const BaseRouter =() => {
    const {location} = useContext(__RouterContext) ;
    console.log(location) ;
    const transitions = useTransition(location,location=> location.pathname,{
        from:{opacity:0,transform:"translateX(100%)"},
        enter:{opacity:1,transform:"translateX(0%)"},
        leave:{opacity:0,transform:"translateX(-50%)"},
        config:{duration:750}
       
       
    })
    console.log(transitions.length) ;
    
    return(
        <>
        <Nav style={{display:'None',opacity:'0'}}/>
        {transitions.map(({item,props,key})=>(
            
            
           <animated.div style ={props} key={key}>
        <Switch location={item}>
            
        
        <Route exact path='/login'  component ={Login} />
        <Route exact path='/register' component ={Register} />
        <Route exact path='/'  component ={Home} />
        <Route exact path='/users' component ={Userhome} />
        <Route exact path='/users/Book' component ={BookForm} />
        <Route exact path='/users/bookinglist' component ={Bookingslist} />
        <Route exact path='/users/booking/:bookid' component ={BookingsDetail} />
        <Route exact path='/users/pastbookings' component ={prevbookinglist} />
        <Route exact path='/users/chat' component ={Index} />
        <Route exact path='/users/chat/:chatId' component ={Chat} />   
        <Route exact path='/about' component ={About} >

        </Route>
        <Route exact path='/contact' component ={Contact} />
            
        
         
         </Switch>

           </animated.div>

        ))}
        {/* <Switch> 
        <Route exact path='/login'  component ={Login} />
        <Route exact path='/register' component ={Register} />
        <Route exact path='/'  component ={Home} />
         
        <Route exact path='/users' component ={Userhome} />
        <Route exact path='/users/Book' component ={BookForm} />
        <Route exact path='/users/bookinglist' component ={Bookingslist} />
        <Route exact path='/users/booking/:bookid' component ={BookingsDetail} />
        <Route exact path='/users/pastbookings' component ={prevbookinglist} />
        <Route exact path='/users/chat' component ={Index} />
        <Route exact path='/users/chat/:chatId' component ={Chat} />   
        </Switch>   */}
       
        </>
    )
} ;

export default BaseRouter ;
import React ,{useState,useEffect}from 'react';
import car1 from './Homeassets/carousel/car1.jpg' ;
import car2 from './Homeassets/carousel/car2.jpg' ;
import car3 from './Homeassets/carousel/car3.jpeg' ;
import card1 from './Homeassets/card1.jpg' ;
import card2 from './Homeassets/card2.jpg' ;
import card3 from './Homeassets/card3.webp' ;
import './App.css';
import {useSpring ,animated} from 'react-spring' ;

import Absolutewrapper from '../../../components/Absolutewrapper';
import Loadsvg from '../../../components/loadsvg';

var ld=0;
const   Home  = ()=>{
   
    const action = useSpring({
        from: {
            height:'0%',
            opacity:0 
            
        },
        to:{ height:'100%',
        opacity:1
       
        
          } ,
        config: {duration:3000}
    })
    const [load, setLoad] = useState(true) ;
    
    useEffect(()=>{  
       setTimeout( ()=>{
           if(!ld){
           var ldout = document.querySelector('.load')
            ldout.classList.add('load-inactive')
           }
           setLoad(false)
           ld+=1
         
       },4000)
       var nav= document.querySelector('.main-nav') ;
      if(nav.style.display ==='none' ){
          nav.style.display='contents';
      }
    
},[])

 

   
  return !(load) || ld?(
      
      <Absolutewrapper >
    <div className="container-fluid hello mb-3" id="body"  >
        
        <div className="container-fluid p-2 mb-2 ">
          <div className="row justify-content-center">
          <div className="container-fluid">
    <div className="container mb-5">
        <div className="row p-4 mb-3 bg-white justify-content-center" >
            <div className="col-lg-10 col-sm-12 justify-content-between">
                <div id="carouselId" className="carousel slide" data-ride="carousel">
                    <ol className="carousel-indicators">
                        <li data-target="#carouselId" data-slide-to="0" className="active"></li>
                        <li data-target="#carouselId" data-slide-to="1"></li>
                        <li data-target="#carouselId" data-slide-to="2"></li>
                    </ol>
                    <div className="carousel-inner" role="listbox">
                        <div className="carousel-item bg-white active">
                            <img src= {car1} alt="First slide" className="im img-responsive" width="100%" height="100%"/>
                            <div className="carousel-caption d-none d-md-block">
                              
                            </div>
                        </div>

                        <div className="carousel-item bg-white justify-content-center">
                            <img src={car3} alt="Second slide" className="im img-responsive" width="100%"/>
                            <div className="carousel-caption d-none d-md-block">
                               
                            </div>
                        </div>
                        <div className="carousel-item bg-white justify-content-center" >
                            <img src={car2} alt="Third slide"
                            className="img-responsive" width="100%" />
                            <div className="carousel-caption d-none d-md-block">
                               
                            </div>
                        </div>
                    </div>
                    <a className="carousel-control-prev" href="#carouselId" role="button" data-slide="prev">
                        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                        <span className="sr-only">Previous</span>
                    </a>
                    <a className="carousel-control-next" href="#carouselId" role="button" data-slide="next">
                        <span className="carousel-control-next-icon" aria-hidden="true"></span>
                        <span className="sr-only">Next</span>
                    </a>
                </div>
            </div>
        </div>
    </div>
<div className="container p-3">
      <div className="row justify-content-center align-center">
        <h2>LE' DETOR TO THE SITE </h2>
         </div>
</div>
<div className="container-fluid">
    <div className="row p-3 mb-2 justify-content-center align-items-center"> 
        <div className='col-lg-12  col-sm-10 justify-content-center  align-center p-3'> 
            <div className="card pr-2" >
            <div className="row align-items-center">
            <div className="col-lg-4 col-sm-6 align-items-center">
                 <animated.img src={card1} alt="" className="im img-responsive" style={action} width="100%"></animated.img>
            </div>
            <div className="col-lg-8 col-sm-6 justify-content-center p-2">
            <div className="card-body justify-content-between">
            <h3 className="row card-title justify-content-center text-dark">What Is Humraahi ?</h3>
            <p className="row card-text p-1  justify-content-center">Humrahi  
               is the person who stays by your side for your life .<b>Humraahi</b> is not less a Friend for IITG campus ,which probably will be deployed on IITG website .Humraahi is Cab Shaaring website Based on the previous requests we will find You a Match who can travel with you.You can chat with the person before you travel With them and enjoy the trip to city. </p>
            <div className="row  justify-content-center">
            <button className=" btn btn-primary">Learn more</button>
            </div>
            </div>
            </div>
            
            </div>      
        </div>
    </div>
</div>
</div>

<div className="container-fluid">
    <div className="row p-3 mb-2 justify-content-center align-center">
       
        <div className='col-lg-12  col-sm-10 justify-content-center bg-white align-center p-3'> 
            <div className="card bg-white pr-2">
            <div className="row align-items-center">
            <div className="col-lg-8 col-sm-6 justify-content-center p-3">
            <animated.div className="card-body justify-content-between" >
            <h3 className="row card-title justify-content-center text-dark">How to get Started?</h3>
            <animated.p className="row card-text p-1  justify-content-center" style={action}><b>Sounds Interesting ??</b>
            To get started with your First Ride On Humraahi ,Signup on the websiste And link Your account with Your outlook(For security purposes only).Update with your Profile,if you want .Explore where you want to go from the Recomendations Section if you want to try something new.And Just Tell us When's And Where's ,We will get you a partner for the ride .
            </animated.p>
            <div className="row  justify-content-center">
            <button className=" btn btn-primary">Learn More</button>
            </div>
            </animated.div>
            </div>
            <div className="col-lg-4 col-sm-6 align-items-center">
                 <img src={card2} alt="" className="im img-responsive" width="100%"></img>
            </div>
            </div>
        </div>
    </div>
</div>
</div>
<div className="container-fluid">
    <div className="row p-3 mb-2 justify-content-center align-center">
            
       
        <div className='col-lg-12  col-sm-10 justify-content-center  align-center p-3'> 
            <div className="card pr-2" >
            <div className="row align-items-center">
            <div className="col-lg-4 col-sm-6 align-items-center">
                 <img src={card3} alt="" className="im img-responsive" width="100%"></img>
            </div>
            <div className="col-lg-8 col-sm-6 justify-content-center p-3">
            <div className="card-body justify-content-between">
            <h3 className="row card-title justify-content-center text-dark">Our Goals</h3>
            <p className="row card-text p-1  justify-content-center">We Aim to help every visitor on the site ,the Best we can .Make The the Humraahi Community bigger.Because the more the merrier And It will increase the User experience .We want to create safe environment on the site So Stricts Provisons will be made if any misbehaviour occurred.(Don't Worry I didn't Know what to Write).Also To make something Like the adjacent UI  </p>
            <div className="row  justify-content-center">
            <button className=" btn btn-primary">Learn more</button>
            </div>
            </div>
            </div>
            
            </div>
             
        </div>
    </div>
</div>
</div>

</div>
          </div>
        </div>



    </div>
    </Absolutewrapper> 





  ):(<Loadsvg />) ;
}



export default Home ;

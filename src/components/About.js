import React from 'react'
import aboutsvg from '../assets/orangesvg.png' ;
import './about.css'
import kunal from '../assets/kunal.jpg'
import codeclub from '../assets/codeclub.png'

function About() {
    return (
        <div className="abt-bdy">
<div className="container-fluid about mb-5 p-2 ">
    <div className="row no-gutters justify-content-between align-items-center h-100">
     <div className="col-lg-6 col-sm-10 col-xs-12 about-svg h-100">
        <div>
            <img src={aboutsvg} alt=" " className="about-im img-responsive" />
             </div>
         </div>
         <div className="col-lg-6 col-sm-10 col-xs-12 about-content h-100">
             <div className="row align-items-center about-inner">
                <div className="mb-2 p-2">
                    <h1 className="about-head">Humraahi</h1>
                    <p className="about-context">-Cabsharing Hub of IITG</p>
                    <p>Humraahi is a  Platform where anyone can just book  a cab with random people 
                        Have chat with them before the trip.Humrrahi Aims to makes the process of sharing cab 
                        easier for campus students .
                    </p>
                    
                </div>
             </div>
         </div>            
    </div>
     
</div>
<div className="container-fluid">
    <div className="row justify-content-center align-items-center about-team-head mb-5 p-5">
        <div>
            <h1>
                Our Team
            </h1>
        </div>
    </div>
    <div className="row justify-content-center align-items-center about-team-head">
    <div className="card-deck">
    <div className="card">
        <img className="card-img-top" src={codeclub} alt="" />
        <div className="card-body">
            <h4 className="card-title">Coding Club</h4>
            <p className="card-text">As project organizer</p>
            <p>
                Coding club ,IITg is acting as a organizer of Cabsharing project
            </p>
            <p>Club  constantly supports the students to get through the project
                        with weekly updates
            </p>
        </div>
    </div>
    <div className="card">
        <img className="card-img-top" src={kunal} alt="" />
        <div className="card-body p-3">
            <h4 className="card-title">Kunal </h4>
            <p className="card-text">as Team member</p>
           
            <p>
                I am mostly a backend developer,I code that I can see working in real life
                And I suck at designing
            </p>
        </div>
        

    </div>
</div>
        
    </div>

</div>
</div>
    )
}

export default About




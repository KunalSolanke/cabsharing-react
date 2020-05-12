import Highway from '@dogstudio/highway' ;

import {TimelineLite} from 'gsap' ;


class Fade extends Highway.Transition{
    //page coming in
    //from-the page going out 
    //to -where we are going 
    //done-to tell always ehrn animation is done
    in({from,to,done}){
        const tl=new TimelineLite() ;
        tl.fromTo(to,0.5,{left:'-100%',top:'50%'},{left:'0%'})
        .fromTo(to,0.5,{height:'2vh'},{height:'80vh',top:'20%',onComplete:function(){
            done ;
        }});
        
        

    }
    //page going out 
    out({from,done}){
        done() ; //now this goes into in

    }
}
export default Fade ;
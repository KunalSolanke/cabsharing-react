import React from 'react'
import contactsvg from '../assets/contact.svg' ;
import './contact.css'


function Contact() {
    return (
        <div className="container-fluid contact">
            
           <div className="row justify-content-center align-items-center">
               <div className="col-lg-6 col-sm-10 col-xs-12 svg-sec">
                   <div className="row-cols-12 justify-content-between align-items-center">
                       <div>
                           <img src={contactsvg} className="contact-im img-responsive" alt="" />
                       </div>
                   </div>
               </div>
               <div className="col-lg-6 col-sm-10 col-xs-12 p-3 form-sec">
                   <div className="row-cols-10 justify-content-between align-items-center mb-2 p-3">
                        <div>
                            <h1>
                                Contact Us
                            </h1>
                            <p className="w-60">We are always welcome for anyone
                                or You can Just visit the global chat someone will be there
                            </p>
                        </div>
                   </div>
                   <div className="row-cols-10 justify-content-between align-items-center mb-3 p-3">
                     <form>
                         <div className="form-group row">
                             <label htmlFor="colFormLabel" className="col-sm-2 col-lg-12 col-form-label col-form-label">Name</label><br />
                             <div className="col-sm-10 col-lg-8">
                                   <input htmltype="text" className="form-control form-control-sm" id="colFormLabel" placeholder="Who the heck are you?" />
                             </div>
                          </div>
                          <div className="form-group row">
                             <label htmlFor="colFormLabel" className="col-sm-2 col-lg-10 col-form-label col-form-label">Email</label><br />
                             <div className="col-sm-10 col-lg-8">
                                   <input htmltype="email" className="form-control form-control-sm" id="colFormLabel" placeholder="Email please" />
                             </div>
                          </div>
                          <div className="form-group row">
                             <label htmlFor="colFormLabel" className="col-sm-2 col-lg-12 col-form-label col-form-label">Message</label><br />
                             <div className="col-sm-10 col-lg-8">
                             <textarea className="form-control" name="" id="" rows="3" placeholder="Tell us something new"></textarea>
                             </div>
                          </div>
                      </form>

                   </div>
                   <div className="row justify-content-around align-items-center p-5">
                       <div className="col-4">
                       <div className="row cicon justify-content-center align-items-center">
                           <i className="fa fa-git" aria-hidden="true"></i>
                           </div>
                       </div>
                       <div className="col-4">
                       <div className="row cicon justify-content-center align-items-center">
                           <i className="fa fa-google" aria-hidden="true"></i>
                           </div>


                       </div>
                       <div className="col-4">
                              <div className="row cicon justify-content-center align-items-center">
                               <i  className="fa fa-facebook" aria-hidden="true"></i>
                               </div>
                            
                       </div>


                   </div>
                   
                </div>
           </div>

            
        </div>
    )
}

export default Contact


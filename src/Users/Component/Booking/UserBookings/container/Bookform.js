import React, { Component } from 'react'
//import Form from 'antd/lib/form/Form';
import CustomForm from '../../BookingForm/form' ;
import UserLayout from '../../../../../containers/userLayout';
import Taxisvg from '../../../../../components/Taxisvg';
import AbsoluteWrapper from '../../../../../components/Absolutewrapper';

export class Bookform extends Component {

    componentDidMount(){      
        var nav= document.querySelector('.main-nav') ;
        nav.style.display = 'none' ;
       
    } 
    render() {
        return (
            <AbsoluteWrapper >
            <UserLayout>
                <div className="row justify-content-center align-items-center p-3 mb-3">
                        <div className="col-lg-6 col-sm-10 col-xs-12 p-2">
                            <Taxisvg />
                      
                        </div>
                        <div className="col-lg-6 col-sm-10 col-xs-12 ">
                            <div className="row justify-content-center align-items-center">
                            <CustomForm > </CustomForm>
                            </div>
                        </div>
                </div>
            </UserLayout>
            </AbsoluteWrapper>
        )
    }
}

export default Bookform

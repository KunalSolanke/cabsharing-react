import React from 'react' ;
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom'

import { Modal} from 'antd';
import AddChatForm from '../component/Form';
import * as navactions from '../../store/actions/nav' ;

class ADDChatModal extends React.Component {
  

    openaddchatpop =() =>{
        
		this.props.addChat() ;
	}

  render() {
    return (
      <div>
        <button class="btn btn-primary" onClick={this.openaddchatpop}>
         Add chat
        </button>
        <Modal
          
          centered
          visible={this.props.isVisible}
          onCancel={this.props.close}
          footer ={null}

        >
         <AddChatForm />
        </Modal>
      </div>
    );
  }
}

const mapDispatchToprops = dispatch => {
	return {
	   addChat : () => dispatch(navactions.open_chat_popup())

	}
}

export default withRouter(connect(null,mapDispatchToprops)(ADDChatModal));


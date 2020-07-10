import React, { useState } from 'react';
import { Upload ,Modal} from 'antd';
import ImgCrop from 'antd-img-crop';

import axios from 'axios' ;
import { set } from 'animejs';












//PREVIEW OF THE IMAGE AND UPLOAD
const ProfileImage = (props) => {
  const [fileList, setFileList] = useState([
    {
      uid: '-1',
      name: 'profile',
      status: 'done',
      url: props.name,
    },
   ]
  );
  const [upload,setUpload]= useState('')
  const [previewImage,setpreviewImage]=useState('')
  const [previewVisible,setpreviewVisible]=useState(false) ;
  const [previewTitle,setPreviewTitle]=useState('') ;
  const handleCancel= () => setpreviewVisible(false);

  const onChange = ({ fileList:newFileList }) => {
    console.log(newFileList)
      const new_Profile = newFileList.pop();
     
      setFileList(Array(new_Profile));
     
  };

  const onPreview = async file => {
    if (!file.url && !file.preview) {
        file.preview = await getBase64(file.originFileObj);
      }
      setpreviewImage(file.url||file.preview) ;
      setpreviewVisible(true)
      setPreviewTitle(file.name ||file.url.substring(file.url.lastIndexOf('/')+1))
    //   this.setState({
    //     previewImage: file.url || file.preview,
    //     previewVisible: true,
    //     previewTitle: file.name || file.url.substring(file.url.lastIndexOf('/') + 1),
    //   });
  };



  return (
      <>
    <ImgCrop rotate>
      <Upload
        action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
        listType="picture-card"
        fileList={fileList}
        onChange={onChange}
        onPreview={onPreview}
      >
        {fileList.length < 5 && '+ Upload'}
      </Upload>
      
    </ImgCrop>
    <Modal
    visible={previewVisible}
    title={previewTitle}
    footer={null}
    onCancel={handleCancel}
  >
    <img alt="example" style={{ width: '100%' }} src={previewImage} />
  </Modal>
  </>
  );
};



export default ProfileImage






// import { Upload, Modal } from 'antd';
// import { PlusOutlined } from '@ant-design/icons';

function getBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
  });
}































// class PicturesWall extends React.Component {
//   state = {
//     previewVisible: false,
//     previewImage: '',
//     previewTitle: '',
//     fileList: [
//       {
//         uid: '-1',
//         name: 'image.png',
//         status: 'done',
//         url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
//       },
//       {
//         uid: '-2',
//         name: 'image.png',
//         status: 'done',
//         url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
//       },
//       {
//         uid: '-3',
//         name: 'image.png',
//         status: 'done',
//         url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
//       },
//       {
//         uid: '-4',
//         name: 'image.png',
//         status: 'done',
//         url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
//       },
//       {
//         uid: '-5',
//         name: 'image.png',
//         status: 'error',
//       },
//     ],
//   };

//   handleCancel = () => this.setState({ previewVisible: false });

//   handlePreview = async file => {
//     if (!file.url && !file.preview) {
//       file.preview = await getBase64(file.originFileObj);
//     }

//     this.setState({
//       previewImage: file.url || file.preview,
//       previewVisible: true,
//       previewTitle: file.name || file.url.substring(file.url.lastIndexOf('/') + 1),
//     });
//   };

//   handleChange = ({ fileList }) => this.setState({ fileList });

//   render() {
//     const { previewVisible, previewImage, fileList, previewTitle } = this.state;
//     const uploadButton = (
//       <div>
//         <PlusOutlined />
//         <div className="ant-upload-text">Upload</div>
//       </div>
//     );
//     return (
//       <div className="clearfix">
//         <Upload
//           action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
//           listType="picture-card"
//           fileList={fileList}
//           onPreview={this.handlePreview}
//           onChange={this.handleChange}
//         >
//           {fileList.length >= 8 ? null : uploadButton}
//         </Upload>
        
//       </div>
//     );
//   }
// }

// ReactDOM.render(<PicturesWall />, mountNode);





 //console.log(newFileList[1].thumbUrl)
      //setUpload(newFileList[1].thumbUrl)
      
     // console.log(new_Profile.url)
      // axios.defaults.headers={
      //   'Content-Type':'application/json',
      //   'Authorization':`Token ${props.token}`
      // }
      // axios.put('http://127.0.0.1:8000/rest-auth/user/',{
      //   profile_pic:upload,
      //   username:props.username
      // }).then(res=>{
      //  // console.log(res.data)
      //   // setFileList([ {
      //   //   uid: '-1',
      //   //   name: res.data.profile_pic,
      //   //   status: 'done',
      //   //   url: props.name,
      //   // },])
      // })
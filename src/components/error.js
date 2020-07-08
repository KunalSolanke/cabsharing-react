import React from 'react' ;
import { Result, Button } from 'antd';



// BASED ON REST-API RESPONSES

export const Error_403=()=>{
 return (
  <Result
    status="403"
    title="403"
    subTitle="Sorry, you are not authorized to access this page."
    extra={<Button type="primary">Back Home</Button>}
  />)
}


export const Error_505=()=>{
    return (
        <Result
        status="500"
        title="500"
        subTitle="Sorry, something went wrong."
        extra={<Button type="primary">Back Home</Button>}
      />)
   }


   export const Error_404=()=>{
    return (
        <Result
        status="404"
        title="404"
        subTitle="Sorry, the page you visited does not exist."
      
      />)
   }
# FrontEnd Directory

Here File structure is not great but self explainatory .
Just have to follow the imports carefully .

Just a overall how are things in place in this directory :


## Dirs 
  
  - Components 
     <p>All js files in this directory are either part of a differnt page or a staic page itself like contact page or about page
     </p>

 - Containers 
      <p>It has only one file and that is the homepage for users and all functions that will happen like notifications is intiated here </p>
    
  - Home 
      <p> This directory contains the landing page of the website ,the login page and the signup page which uses redux store for authentication of users</p>
    
  -  Users 
      <p> All the user realted tasks are in this file that is booking ride ,prev bookings ,current bookings and actions for them .
      </p>
    
  - Notifications 
     <p> Our notification websocket and panel lies in this dir</p>

  - Chat 
      <p> Out chat websocket and page lies here</p>

 - store 
     <p>This is redux store which handles notifications,chat messages ,getting user chats and authentication.
     I should have added bookings here too .As it would have made handling state easier 
     </p>


 - index.js 
     <p>Entry point of the react application.</p>
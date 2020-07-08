//          console.log(this.state.matches[0])
      //  const profiles =[...Array(this.state.matches.length)].map(async (_,index)=> await axios.get(`http://127.0.0.1:8000/uapi/${this.state.matches[index].user}/profile/`).then(
      //   res =>  res.data[0] )
      
      // )
      // console.log(profiles)
      // this.setState({
      //   profiles : profiles
      // })












 onSuccess = response => {console.log(response);
     
      console.log("hi",response.redirect_uri)
      console.log(window.location.href)
       
      console.log(response) ;
      
    axios.post("http://localhost:8000/rapi/check/",{
      "token" : response.code}
).then(res =>{
      console.log(res)
    })
    // axios.post("http://localhost:8000/api/login/social/token_user/github",{
    //   "method" : "POST",
    //   "mode" : "cors" ,
    //   "code" :response.code,
    //    "redirect_uri" : 'http://localhost:3000/users',
    //   "provider" : "github"
    // }
    //   ).then(res =>{
    //   console.log(res) ;
    // })}
    this.props.onSocialAuth(response,"github",'http://localhost:3000/users') ;
    this.props.history.push('/users') }
     onFailure = response => console.error("fail",response);





    googleResponse = (response) => {
      console.log(response.code) ;
      // console.log(response.Ca) ;
       //const code = JSON.parse(atob(response.signedRequest.split(".")[1])).code ;
      // console.log(code) ;
    //   const tokenBlob = new Blob([JSON.stringify({access_token: response.accessToken}, null, 2)], {type : 'application/json'});
    //   const options = {
    //     method: 'POST',
    //     body: JSON.stringify({code: response.code,
    //       redirect_uri: "http://localhost:3000/",
    //       provider : "google",
    //       redirectUri : "http://localhost:3000/"
       
    //   }),
      
    //     mode: 'cors',
    //     //  
    // };
    // console.log("Hi") ;
    // console.log(response.accessToken) ;
    // console.log("hi") ;
    // console.log(response) ;
    axios.post("http://localhost:8000/rapi/check/",{
      "token" : response.code}
).then(res =>{
      console.log(res)
    })
    this.props.onSocialAuth(response,"google-oauth2",'postmessage') ;
    this.props.history.push('/users')
    // axios.post("http://localhost:8000/api/login/social/token_user/google",{
    //   "method" : "POST",
    //   "mode" : "cors" ,
    //  "code" :response.code,
    //   "redirect_uri" : "postmessage",
    //   "provider" : "google-oauth2" 
    // }).then(res =>{
    //   console.log(res) ;
    //   this.props.history.push('/users') ;
    // })
      
    }

//     facebookResponse = (response) => {
//       console.log(response.redirect_uri)
//       console.log(window.location.href)
       
//       console.log(response) ;
//       // console.log(response.Ca) ;
//       const code = JSON.parse(atob(response.signedRequest.split(".")[1])).code ;
//       console.log("codeis:",code)
//       console.log(code) ;
//       // console.log(code) ;
//       const tokenBlob = new Blob([JSON.stringify({
       
//         "code" :code,
//         "redirect_uri" : window.location.href,
//         "provider" : "facebook"
//       }, null, 2)], {type : 'application/json'});
//       const options = {
//         method: 'POST',
//         body: tokenBlob,
      
//         mode: 'cors',
//         //  
//     };
//     // console.log("Hi") ;
//     // console.log(response.accessToken) ;
//     // console.log("hi") ;
//     // console.log(response) ;
//     axios.post("http://localhost:8000/rapi/check/",{
//       "token" : code}
// ).then(res =>{
//       console.log(res)
//     })
//     axios.post("http://localhost:8000/api/login/social/token_user/facebook",options
//       ).then(res =>{
//       console.log(res) ;
//     })
//     }
   
   


  // onFinish = values => {
  //   // console.log('Success:', values);
  //   // console.log("working") ;
  //   const username=values.username ;
  //   const password = values.password ;
  //   console.log(username,password) ;
  //   this.props.onAuth(username,password) ;
  //   if(this.props.error === null) {
  //     this.props.history.push("/users") ;
  //   }
  // };
      




# DATABASES = {
#     'default': {
#         #'ENGINE': 'django.db.backends.sqlite3',
#         #'NAME': os.path.join(BASE_DIR, 'db.sqlite3'),
#         'ENGINE': 'django.db.backends.postgresql',
#         'NAME': 'd5694qn4pfsgnb',
#         'USER' : 'pkozjzangfvkux' ,
#         'PASSWORD': '95932083794db167040e65833aca9d7a96eefe691df7e330d649f483d49749bd' ,
        
#         # 'TEST': {
#         #     'NAME': 'chattests'
#         # },
#         'HOST':'ec2-54-175-117-212.compute-1.amazonaws.com'
#     }
# }

DATABASES = {
    #  'default': {
    #     #'ENGINE': 'django.db.backends.sqlite3',
    #     #'NAME': os.path.join(BASE_DIR, 'db.sqlite3'),
    #     'ENGINE': 'django.db.backends.postgresql',
    #     # 'NAME': 'd5694qn4pfsgnb',
    #     'NAME':'cabsharing',
    #     # 'USER' : 'pkozjzangfvkux' ,
    #     'USER':'postgres',
    #     # 'PASSWORD': '95932083794db167040e65833aca9d7a96eefe691df7e330d649f483d49749bd' ,
    #     'PASSWORD':'1234',
        
    #     # 'TEST': {
    #     #     'NAME': 'chattests'
    #     # },
    #     # 'HOST':'ec2-54-175-117-212.compute-1.amazonaws.com'
    #     'HOST':'localhost'
    # }
}
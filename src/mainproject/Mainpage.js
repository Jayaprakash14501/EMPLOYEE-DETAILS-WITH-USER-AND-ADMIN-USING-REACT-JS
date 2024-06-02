import React from "react";
import './mainpage.css';
export default function Mainpage(){
  function Login(){
    window.location.href="/login";
  }
  function Login1(){
    window.location.href="/adminlogin";
  }
    return(
      <div className="backim">
        <div className="mainpage">
          <center><img src="https://cdn.pixabay.com/photo/2017/02/18/19/20/logo-2078018_1280.png" className="logo"></img></center>
        <center><h1> TECH SOURCE</h1> </center> 
        </div>
       <div className="maindiv1">
       <img src=" https://cdn.pixabay.com/photo/2017/10/07/01/36/businesswoman-2825242_1280.png" alt="Admin" className="mainimg1"></img>
        <div  className="mainsubdiv1">
        <div><button onClick={Login1}className="mainbutton1">Admin</button></div>
        </div>
       </div>
      
       <div className="maindiv2">
       <img src="https://cdn.pixabay.com/photo/2024/05/19/11/57/ai-generated-8772402_1280.png" alt="employees" className="mainimg2"></img>
        <div className="mainsubdiv2">
       <div><button onClick={Login} className="mainbutton2">User</button></div>
        </div>
        </div>
      </div>
        
    )
}
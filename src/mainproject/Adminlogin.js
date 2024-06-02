import React  ,{useState}from "react";
import { Link } from "react-router-dom";
import { FaFacebook, FaGoogle, FaTwitter } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { MdContactMail } from "react-icons/md";
import { RiLockPasswordLine } from "react-icons/ri";
import './login.css';
export default function Login(){
const[newdatas,setNewdatas]=useState("");
function validate(){

    if(newdatas.user==="Admin@123"){
        if(newdatas.password==="Prakash@1"){
           
            return true;
        }
       
        else{
            alert("please enter valid password");
        }}
        else{
            alert("please enter valid user admin");
        }
                }
                

const handleChange=(e)=>{
    var name=e.target.name;
    var value=e.target.value;
    setNewdatas(values=>({...values,[name]:value}));
}
const handleSubmit=(e)=>{
    e.preventDefault();
    if(validate(true)){
       
        alert("login successfully");
       window.location.href="/admin/Registered";
        setNewdatas({user:"",password:""})
    }
}
return(
        <div class="main">
            <div class="submain">
                <center><img src="https://cdn.pixabay.com/photo/2017/02/18/19/20/logo-2078018_1280.png" className="logo"></img></center>
                    <h1>ADMIN LOGIN</h1><br></br>
                    <MdContactMail class="comp" autoFocus/> <input type="text" class="box" placeholder="Enter user Admin" autoFocus name="user" value={newdatas.user} onChange={handleChange}></input><br></br><br></br><br></br>
                   <RiLockPasswordLine class="comp" autoFocus/><input type="password" placeholder="Enter Password" autoFocus class="box" name="password" value={newdatas.password} onChange={handleChange}></input><br></br><br></br><br></br>
                    <button onClick={handleSubmit} className="loginbutton">log in</button><br></br><br></br>
                   
                    <h2><Link to="https://www.facebook.com/login/"><FaFacebook /></Link></h2>
                        <h2><Link to="https://www.instagram.com/accounts/login/?hl=en"><FaInstagram /></Link></h2>
                        <h2><Link to="https://x.com/i/flow/login"><FaTwitter /></Link></h2>
                        <h2><Link to="https://www.google.co.in/"><FaGoogle /></Link></h2>
    </div>
</div>
    )
}
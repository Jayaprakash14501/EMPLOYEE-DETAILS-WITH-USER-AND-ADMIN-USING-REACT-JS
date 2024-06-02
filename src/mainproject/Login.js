import React  ,{useEffect, useState}from "react";
import { Link } from "react-router-dom";
import { FaFacebook, FaGoogle, FaTwitter } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { MdContactMail } from "react-icons/md";
import { RiLockPasswordLine } from "react-icons/ri";
import './login.css';
export default function Login(){
    const API_URL='http://localhost:8000/login';
const[datas,setDatas]=useState([]);
const[newdatas,setNewdatas]=useState("");
function validate(){
    var det=datas;
    if(/[a-z0-9]+@[a-z0-9]+[.][com]{3}/.test(newdatas.mail)){
        if(/[A-Z][a-z]+[@#$&]?[0-9]?/.test(newdatas.password)){
            if(det && det.find(data=>data.mail===newdatas.mail && data.password===newdatas.password)){
            return true;
        }
        else{
            alert("Invalid mail or password");
        }}
        else{
            alert("please enter valid password");
        }}
        else{
            alert("please enter valid mail");
        }
                }
                useEffect(()=>{
                    const fetchItems=async()=>{
                      const response=await fetch (API_URL);
                        console.log(response);
                        if(!response.ok) throw Error("data not received");
                        const listItems=await response.json();
                        setDatas(listItems);
                       
                     
                    }
                    setTimeout(()=>{
                    (async () => await fetchItems())()
                    },1000)
                 } ,[]);

const handleChange=(e)=>{
    var name=e.target.name;
    var value=e.target.value;
    setNewdatas(values=>({...values,[name]:value}));
}
const handleSubmit=(e)=>{
    e.preventDefault();
    if(validate(true)){
       
        alert("login successfully");
        const det=datas.find(data=>data.mail===newdatas.mail);
        
        window.location.href="/updateyourself";
        localStorage.setItem("dataid",JSON.stringify(det.id));
        localStorage.setItem("dataname",JSON.stringify(det.firstname));
        localStorage.setItem("dataphone",JSON.stringify(det.phone));
        localStorage.setItem("datamail",JSON.stringify(det.mail));
        localStorage.setItem("datapassword",JSON.stringify(det.password));

        setNewdatas({mail:"",password:""});
    }
}
return(
        <div class="main">
            <div class="submain">
            <img src="https://cdn.pixabay.com/photo/2017/02/18/19/20/logo-2078018_1280.png" className="logo"></img>
                    <h1>LOGIN</h1><br></br>
                    <MdContactMail class="comp" autoFocus/> <input type="text" class="box" placeholder="Enter Mail Id" autoFocus name="mail" value={newdatas.mail} onChange={handleChange}></input><br></br><br></br><br></br>
                   <RiLockPasswordLine class="comp" autoFocus/><input type="password" placeholder="Enter Password" autoFocus class="box" name="password" value={newdatas.password} onChange={handleChange}></input><br></br><br></br><br></br>
                    <button onClick={handleSubmit} className="loginbutton">log in</button><br></br><br></br>
                    didn't have any account? <br></br><Link to='/signup'>Create Account</Link><br></br><br></br>
                    <h2><Link to="https://www.facebook.com/login/"><FaFacebook /></Link></h2>
                        <h2><Link to="https://www.instagram.com/accounts/login/?hl=en"><FaInstagram /></Link></h2>
                        <h2><Link to="https://x.com/i/flow/login"><FaTwitter /></Link></h2>
                        <h2><Link to="https://www.google.co.in/"><FaGoogle /></Link></h2>
    </div>
</div>
    )
}
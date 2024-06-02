import React ,{useState,useEffect}from "react";
import { Link } from "react-router-dom";
import { FaFacebook, FaGoogle, FaTwitter } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import apiRequest from './apiRequest';



import "./login.css"

export default function Signup(){
    const API_URL='http://localhost:8000/login';
    const [datas,setDatas]=useState([]);
    const [newdatas,setNewdatas]=useState({firstname:"",phone:"",mail:"",password:"",confirm:"",photo:"",description:""});
    function validate(){
       if(/^[a-zA-Z-,]+(\s{0,1}[a-zA-Z-, ])*$/.test(newdatas.firstname)){
            if(/^[6-9][0-9]{9}$/.test(newdatas.phone)){
                 if(/[a-z0-9]+@[a-z0-9]+[.][com]{3}/.test(newdatas.mail)){
                      if(/[A-Z][a-z]+[@#$&]?[0-9]?/.test(newdatas.password)){
                        if(/[A-Z][a-z]+[@#$&]?[0-9]?/.test(newdatas.confirm)){
                           if(newdatas.password===newdatas.confirm){
                            if (!datas.find(datas => datas.mail === newdatas.mail && datas.phone === newdatas.phone)) {
                            return true;
                        }
                        else{
                            alert("data already exist");
                        }}
                        else
                        {
                          alert("password mismatch");
                        }}
                        else{
                            alert("confirm password is incorrect");
                        }}
                        else{
                            alert("password is incorrect");
                        } }
                        else{
                            alert("mailid is invalid");
                        }}
                        else{
                            alert("phone number is invalid");
                        }} 
                       
                        else{
                            alert("name is invalid");
                            return false;
                           }
    }
     const handleChange=(e)=>{
        var name=e.target.name;
        var value=e.target.value;
        setNewdatas(values=>({...values,[name]:value}));
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
    
    const addNew=async(item)=>{
        const id=datas.length?datas[datas.length-1].id+1:1;
        const obj={id:id,...item};
        const list=[...datas,obj];
        setDatas(list);
    
    const postOptions ={
        method:'POST',
        headers:{
          'Content-Type':'application/json'
        },
        body:JSON.stringify(obj)
       }
       const result = await apiRequest(API_URL,postOptions)
      
   }

    const handleSubmit=(e)=>{
    e.preventDefault();
        if(validate(true)){
            alert("registered succesfully");
            window.location.href="/login";
           if(!newdatas)return;
           addNew(newdatas);
           setNewdatas({firstname:"",phone:"",mail:"",password:"",confirm:"",photo:"",description:""});
           };
    }
return(
        <div class="main1">
             <div class="submain">
             <img src="https://cdn.pixabay.com/photo/2017/02/18/19/20/logo-2078018_1280.png" className="logo"></img>
                    <h1>SIGN UP</h1>
                    <input type="text" class="box" placeholder="Enter Your Name" required autoFocus name="firstname" value={newdatas.firstname} onChange={handleChange} ></input><br></br><br></br><br></br>
                   
                    <input type="text" class="box" placeholder="Enter Mail Id" required autoFocus name="mail" value={newdatas.mail} onChange={handleChange} ></input><br></br><br></br><br></br>
                    <input type="text" class="box" placeholder="Enter Phone Number" required autoFocus name="phone" value={newdatas.phone} onChange={handleChange} ></input><br></br><br></br><br></br>
                   <input type="text" class="box" placeholder="Enter Password" autoFocus  required name="password" value={newdatas.password} onChange={handleChange}></input><br></br><br></br><br></br>
                    <input type="text" class="box" placeholder="Enter Confirm Password" required autoFocus name="confirm" value={newdatas.confirm} onChange={handleChange} ></input><br></br><br></br><br></br>
                  

                   <button onClick={handleSubmit} class="loginbutton">Register</button><br></br><br></br>
                    
                    Already have any account? <br></br><Link to='/login'>Log in</Link><br></br><br></br>
                    <h2><Link to="https://www.facebook.com/login/"><FaFacebook /></Link></h2>
                        <h2><Link to="https://www.instagram.com/accounts/login/?hl=en"><FaInstagram /></Link></h2>
                        <h2><Link to="https://x.com/i/flow/login"><FaTwitter /></Link></h2>
                        <h2><Link to="https://www.google.co.in/"><FaGoogle /></Link></h2>
    </div>
 </div>
    )
}
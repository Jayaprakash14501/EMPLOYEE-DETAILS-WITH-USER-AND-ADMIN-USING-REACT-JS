import "./update.css";
import React ,{ useState, useEffect } from 'react';

export default function Update2() {

    const store = JSON.parse(localStorage.getItem("dataid"));
    
    const [Data, setData] = useState({
        firstname: '',
        phone: '',
        mail: '',
        comments: '',
        photo:""
        
    });
   
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [edit, setEdit] = useState({
        firstname: false,
        phone: false,
        mail: false,
        comments: false,
        photo:""
    });

    useEffect(() => {
        const fetchUserData=async()=> {
            try {
                const response = await fetch(`http://localhost:8000/login/${store}`);
                console.log(response);
                if (!response.ok) throw Error("Failed to fetch user data");
                const data = await response.json();
                setData({
                    firstname: data.firstname,
                    phone: data.phone,
                    mail: data.mail,
                    comments: data.description,
                    photo:""
                });
                setIsLoading(false);
            } catch (error) {
                setError(error.message);
                setIsLoading(false);
            }
        }
        fetchUserData()
    }, [store]);
    
  
   
        


    function validate() {
        if (/^[6-9][0-9]{9}$/.test(Data.phone)) {
          if (/^[a-zA-Z-,]+(\s{0,1}[a-zA-Z-, ])*$/.test(Data.firstname)){
            return true;
          }else{
            alert ("please enter valid name");
            return false;
          }
        } else {
            alert("please Enter valid phone number");
            return false;
        }
    }
    
     
    function handleChange(e) {
        const { name, value } = e.target;
        setData({ ...Data, [name]: value });
    }

    function handleEdit(field) {
        setEdit({ ...edit, [field]: !edit[field] });
    }

    async function handleSubmit(e) {
        e.preventDefault();
        if (validate()) {
            try {
                const response = await fetch(`http://localhost:8000/login/${store}`, {
                    method: 'PATCH',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        firstname: Data.firstname,
                        phone: Data.phone,
                        mail: Data.mail,
                        description: Data.comments,
                        photo:Data.photo
                    })
                });
                if (!response.ok) throw new Error("Failed to update");
                alert("updated successfully");
            } catch (error) {
                alert(`Error: ${error.message}`);
            }
        }
    }
    function logout(){
        localStorage.removeItem("dataid");
        localStorage.removeItem("dataname");
        localStorage.removeItem("dataphone");
        localStorage.removeItem("datamail");
        localStorage.removeItem("datapassword");
        window.location.href="/";
       
    }
   
    
    
    async function handleDelete() {
      if (window.confirm("Are you sure you want to delete this user?")) {
          try {
              const response = await fetch(`http://localhost:8000/login/${store}`, {
                  method: 'PATCH',
                  headers:{
                    'Content-Type':'application/json'
                  },
                  body:JSON.stringify({
                    description:"",
                    photo:""
                  })
              });
              if (!response.ok) throw new Error("Failed to delete");
              alert("deleted successfully");
              setData({
                  ...Data,
                  photo:"",
                  description: ''
              });
          } catch (error) {
              alert(`Error: ${error.message}`);
          }
      }
  }


    if (isLoading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;

    return (
      
        <div className="mainbox">
            <div class="contain">
           
            <div className="subbox">
            <center><img src="https://cdn.pixabay.com/photo/2017/02/18/19/20/logo-2078018_1280.png" alt="name" className="logo"></img></center>
                <h1>Employee Details</h1>
                
            </div>
            <div className="subcontent">
                
                           
                               Employee Name<br></br><br></br>
                                <input
                                    type="text"
                                    name="firstname"
                                    value={Data.firstname}
                                    onChange={handleChange}
                                    class="box1"
                                    required
                                    readOnly={!edit.firstname}
                                />
                                <button type="button" onClick={() => handleEdit('firstname')} className="editbutton">
                                    {edit.firstname ? "save": "edit"}
                                </button><br></br><br></br>
                          
                           
                               Phone Number<br></br><br></br>
                                <input
                                    type="number"
                                    name="phone"
                                    value={Data.phone}
                                    class="box1"
                                    onChange={handleChange}
                                    required
                                    readOnly={!edit.phone}
                                />
                                <button type="button" onClick={() => handleEdit('phone')} className="editbutton">
                                    {edit.phone ? "save": "edit"}
                                </button><br></br><br></br>
                          
                                Email<br></br><br></br>
                                <input
                                    type="email"
                                    name="mail"
                                    value={Data.mail}
                                    class="box1"
                                    required
                                    onChange={handleChange}
                                    readOnly
                                /><br></br><br></br>
                                
                            photo:<br></br><br></br>
                            <input 
                                type="file"
                                name="photo"
                                value={Data.photo}
                                accept="image/*"
                                class="box1"
                                required
                                onChange={handleChange}
                                disabled={!edit.photo}
                                />
                                <button type="button" onClick={() => handleEdit('photo')} className="editbutton">
                                    {edit.photo ? "save": "edit"}
                                </button><br></br><br></br>
                               
                            <label htmlFor="comments">Description</label><br></br><br></br>
                            <textarea
                                cols="46"
                                rows="3"
                                name="comments"
                                required
                                class="box1"
                                value={Data.comments}
                                onChange={handleChange}
                                readOnly={!edit.description}
                            ></textarea>
                            <button type="button" onClick={() => handleEdit('description')} className="editbutton">
                                    {edit.description ? "save": "edit"}
                                </button><br></br><br></br>
                               
                       
                          <button onClick={handleSubmit} className="editbutton">submit</button>
                            <button  onClick={handleDelete}  className="editbutton">Delete</button>
                            <button  onClick={logout}  className="editbutton">Logout</button>
                        
                   
                
            </div>
            </div>
        </div>
    );
}
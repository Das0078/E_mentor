import React, { useState } from 'react'
import { useLocation } from 'react-router-dom'
import { useAuth0 } from "@auth0/auth0-react";
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const Edit = ({state}) => {
   const[log,setLog]=useState({discussion:"",action:"",mentor:"",date:"",mentee_email:""})
   const {user, loginWithRedirect,isAuthenticated,logout,isLoading } = useAuth0();

    const location=useLocation();
    const {name,email}=location.state|| {};

    const handleSubmit=(e)=>{
        e.preventDefault();
        console.log(log);
        axios.post("http://localhost:5000/log",log).then((respnse)=>{
            console.log(respnse.data);
            alert("Log added successfully")
        }).catch((error)=>{
            console.log("error while log adding",error);
        })
    }

    const handleChange=(e)=>{
             // Assuming you have the date string
             const dateString = Date.now()

             // Create an array of month names
             const monthNames = [
                 "January", "February", "March", "April", "May", "June",
                 "July", "August", "September", "October", "November", "December"
             ];
             const date = new Date(dateString);
     
             // Get the date components
             const year = date.getFullYear(); // YYYY
             const month = monthNames[date.getMonth()]; // Month name
             const day = String(date.getDate()).padStart(2, "0"); // DD
     
             // Create the formatted date string (e.g., "September 28, 2023")
             const formattedDate = `${month} ${day}, ${year}`;
     
             console.log("formattedDate", formattedDate);
        const {name,value}=e.target;
        setLog((prev)=>({
            ...prev,[name]:value,mentor:user.nickname,date:formattedDate,mentee_email:email
        }))
    }

  return (
    <>
       <h1>{name ||"guest"} {email || "guest"}</h1> 
       <form onSubmit={handleSubmit}>
        <input type="text" onChange={handleChange} name='discussion' value={log.discussion} placeholder='discussion during meeting'/>
        <input type="text" onChange={handleChange} name='action' value={log.action} placeholder='action taken'/>
        <button type='submit'>Add</button>
       </form>
    </>
  )
}

export default Edit
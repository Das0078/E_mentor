import React, { useEffect } from 'react'
import axios from 'axios';
import { FaPowerOff } from "react-icons/fa6";
import Cookies from 'js-cookie'

const AdminPanel = () => {
    useEffect(()=>{
        axios.get('/getAllMentees') // Update the endpoint to your server endpoint
        .then(response => {
          console.log("getAllMentees data",response.data);
          // console.log("render data", data[0]);
        })
        .catch(error => {
          console.error('Error fetching getAllMentees:', error);
        });

        axios.get('/getAllMentors') // Update the endpoint to your server endpoint
        .then(response => {
          console.log("getAllMentors data",response.data);
          // console.log("render data", data[0]);
        })
        .catch(error => {
          console.error('Error fetching getAllMentors:', error);
        });
    })
    const handleLogOut=()=>{
        Cookies.remove("admin");
        window.location.reload();
    }
  return (
    <>
    <div>AdminPanel</div>
    <button type="button" class="btn btn-danger"  onClick={handleLogOut}>Logout <FaPowerOff/></button>
    </>
  )
}

export default AdminPanel
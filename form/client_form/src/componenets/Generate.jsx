import React, { useEffect, useState } from 'react'
import axios from 'axios'



const Generate = () => {
   const [otp,setOtp]= useState("")
   const generateOtp=()=>{
    axios.post("http://localhost:5000/generateOTP")
    .then((res)=>{
        setOtp(res.data.randomId)
    }).catch((err)=>{
        console.log("error while generating",err);
    })
   }
  return (
    <>
        <h3>{otp}</h3>
        <button onClick={generateOtp}>Generate</button>
    </>
  )
}

export default Generate
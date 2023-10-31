import React, { useState } from 'react'
import axios from 'axios';

const Mentee = () => {
    const [input,SetInput]=useState(null);
    const handleInput=(e)=>{
const {name,value}=e.target;
SetInput((prev)=>({
...prev,[name]:value
}))
    }

    const handleSubmit=(e)=>{
        e.preventDefault();
        console.log(input);
        
        try {
        axios.post("http://localhost:5000/mentor",input)
            
        } catch (error) {
            console.log("error posting from fe",error);
        }

    }
  return (
   <>
    <form action="post" onSubmit={handleSubmit}>
        <input type="text" name='name' placeholder='name' onChange={handleInput}/>
        <input type="email" name='email' placeholder='email' onChange={handleInput}/>
        <input type="password" name='password' placeholder='password'  onChange={handleInput}/>
<button>Submit</button>
    </form>
   </>
  )
}

export default Mentee
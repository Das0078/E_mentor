import axios from 'axios';
import React, { useState,useEffect } from 'react'

const Mentor_log = () => {
    const [mentor_data, setMentorData] = useState({});
    const [mentor_db, setMentorDB] = useState([]);

    

    const handleChange = (e) => {
        const { name, value } = e.target;
        setMentorData(
            { ...mentor_data, [name]: value }
        )

     


    }



const submitted_mentor = (e) => {
    e.preventDefault();
   axios.get("/mentor_log", { params: {email: mentor_data.email,password:mentor_data.password } })
    .then((response) => {
        setMentorDB(response.data)

        if(response.data.length===0){
            alert("no user found.....")
        }

    })
    .catch((e) => {
        console.log("error while fetching from mentor data...", e);
    })
    console.log(mentor_data);

}

useEffect(() => {
    console.log("mentor DB", mentor_db);
 
}, [mentor_db]); 

return (
    <>
        <center>
            <h1>LOGIN</h1>

        </center>
        <form action="" onSubmit={submitted_mentor}>
            <input type="email" placeholder='your email' name='email' value={mentor_data.email} onChange={handleChange} />
            <input type="password" placeholder='your password' name='password' value={mentor_data.password} onChange={handleChange} />
            <button type='submit'>Login</button>

        </form>
    </>
)

}

export default Mentor_log
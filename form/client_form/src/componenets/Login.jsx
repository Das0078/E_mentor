import React, { useEffect,useContext, useState } from 'react'
import '../App.css'
import { useAuth0 } from "@auth0/auth0-react";
// import Home from './components/Home'
// import Chatbot from './components/Chatbot'
// import { counterContext } from './context/Context';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Intro from '../componenets/Intro';
import Admin from './Admin';

// import About from './components/About';


const Login = () => {

  const [userName,setUserName]=useState("");

  const {user, loginWithRedirect,isAuthenticated,logout,isLoading } = useAuth0();

console.log("user",user);

useEffect(() => {
  if (isAuthenticated && user) { // Check if isAuthenticated and user are defined
    // Set the user's name based on their profile data

    if (user.name) {
      setUserName(user.nickname);
      toast.success("👍 Login Successful!", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        })

    }
  }
}, [isAuthenticated, user]);
// console.log(counter); 

if (isLoading) {
  return <div className='load'><img src="./images/loading.gif" alt="" /></div>
  
} 

  return (
    <>

    {isAuthenticated && <img src={user.picture} alt="" width={'50px'} height={'50px'}/>}
    {isAuthenticated &&  <h2>Hello, {userName}</h2>}
    


    {
     
      isAuthenticated ? <button onClick={e=>logout()}>Log out</button>: <Intro loginWithRedirect={loginWithRedirect}/> 
     
    }
    {isAuthenticated &&  <Admin/>}
    {/* {
      isAuthenticated && <Chatbot user={user}/>
    } */}
    {/* <div className='load'><img src="./images/loading.gif" alt="" /></div> */}

    <ToastContainer/>
    </>
  )
}

export default Login




// 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
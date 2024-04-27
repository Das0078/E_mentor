import React from 'react'
import '../App.css'
import { Link } from 'react-router-dom'
const Intro = ({loginWithRedirect}) => {

  return (
    <>
        <div className="intro_container">
           <div className="left_container">
                <img src="./images/Adamas_logo.png" alt="" />
                <h1>e-Mentor</h1>
                <p className='para'>Anytime, Anywhere with you.</p>
               <Link to="/check"><button>Continue</button></Link> 
           </div>
           <div className="right_container">
                <img src="./images/intro_gif.gif" alt="" />
           </div>
        </div>
    </>
  )
}

export default Intro
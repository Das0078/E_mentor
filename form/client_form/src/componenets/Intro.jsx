import React from 'react'
import '../App.css'

const Intro = ({loginWithRedirect}) => {

  return (
    <>
        <div className="intro_container">
           <div className="left_container">
                <img src="./images/Adamas_logo.png" alt="" />
                <h1>e-Mentor</h1>
                <p className='para'>Anytime, Anywhere with you.</p>
                <button onClick={(e)=>{loginWithRedirect()}}>Continue</button>
           </div>
           <div className="right_container">
                <img src="./images/intro_gif.gif" alt="" />
           </div>
        </div>
    </>
  )
}

export default Intro
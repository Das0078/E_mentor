import React from 'react'
import { BrowserRouter as Router,Routes, Route } from 'react-router-dom';
import Mentor from './componenets/Mentor';
import Home from './componenets/Home';
import Admin from './componenets/Admin'
import Mentor_log from './componenets/Mentor_log'
import Login from './componenets/Login';
import Intro from './componenets/Intro';




const App = () => {
  return (
   
   <Router>
   
   <Routes>
   <Route path='/' exact Component={Login}/>
   <Route path='/intro' exact Component={Intro}/>

   <Route path='/home' exact Component={Home}/>

    <Route path='/mentor' Component={Mentor}/>
    <Route path='/admin' Component={Admin}/>
    <Route path='/mentor_log' Component={Mentor_log}/>
    


   </Routes>
   
  
   


    
   </Router>
   
  )
}

export default App
import React from 'react'
import { BrowserRouter as Router,Routes, Route } from 'react-router-dom';
import Mentor from './componenets/Mentor';
import Home from './componenets/Home';
import Admin from './componenets/Admin'
import Mentor_log from './componenets/Mentor_log'
import Login from './componenets/Login';
import Intro from './componenets/Intro';
import Generate from './componenets/Generate';
import Input from './componenets/Input'
import Check from './componenets/Check';
import Edit from './componenets/Edit';
import AdminPanel from './componenets/AdminPanel';
import AdminLogin from './componenets/AdminLogin';
import ProtectedRoutes from './componenets/ProtectedRoutes';
import { useAuth0,withAuthenticationRequired } from "@auth0/auth0-react";
import Roompage from './componenets/Roompage';
import Mentee from './componenets/Mentee';
import Chat from './componenets/Chat';






const App = () => {
  const {user, loginWithRedirect,isAuthenticated,logout,isLoading } = useAuth0();

  return (
   
   <Router> 
   
   <Routes>
   <Route path='/' exact Component={ Login}/>
   <Route path='/intro' exact Component={Intro}/>

   <Route path='/home' exact Component={withAuthenticationRequired(Home)}/>

    <Route path='/mentor' Component={Mentor}/>
    <Route path='/admin' Component={Admin}/>
    <Route path='/mentor_log' Component={Mentor_log}/>
    <Route path='/generate' Component={Generate}/>
    <Route path='/input' Component={Input}/>
    <Route path='/check' Component={Check}/>
   <Route path='/AdminLogin' Component={AdminLogin}/>

   <Route  Component={ProtectedRoutes}>
   <Route path='/AdminPanel' Component={AdminPanel}/>
   </Route>


    <Route path='/edit' Component={withAuthenticationRequired(Edit)}/>
    <Route path='/room/:roomId' element={<Roompage/>} />
    <Route path='/mentee' element={<Mentee />} />
    <Route path='/chat' element={<Chat/>} />

    

   </Routes>
   
    
   </Router>
   
  )
}

export default App
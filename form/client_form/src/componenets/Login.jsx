import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Intro from '../componenets/Intro';
import Admin from './Admin';
import axios from 'axios';
import Cookies  from 'js-cookie'
const Login = () => {
  const navigate = useNavigate();
  const [userName, setUserName] = useState('');
  const { user, loginWithRedirect, isAuthenticated, logout, isLoading } = useAuth0();
  const [toastShown, setToastShown] = useState(false);


useEffect(()=>{
// if(Cookies.get("refresh") === false){

  toast.success('👍 Login Successful!', {
    position: 'top-right',
    toastId: 1,
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: 'dark',
  });
// }

  return()=>{
    Cookies.set("refresh",true);
  }

},[])
  useEffect(() => {
    if (isAuthenticated && user) {
      Cookies.set("notify",true);
      console.log('Username:', user);
      setToastShown(true)
      if (user.name) {
        setUserName(user.nickname);
      }
    }
  }, [isAuthenticated, user]);

  const logoutEvent=(e)=>{
    Cookies.remove("notify");
    Cookies.remove("refresh");
   logout()
  }

  if (isLoading) {
    return <div className='load'><img src="./images/loading.gif" alt="" /></div>;
  }

  return (
    <section className='page'>
      {isAuthenticated &&
        <nav className="navbar navbar-dark navbar-expand-lg bg-dark">
          <div className="container-fluid">
            <a className="navbar-brand" href="#">Navbar</a>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse justify-content-center" id="navbarNavDropdown">
              <ul className="navbar-nav ">
                <li className="nav-item">
                  <a className="nav-link active" aria-current="page" href="#">Home</a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="#">Features</a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="/generate">Generate</a>
                </li>
                <li className="nav-item dropdown">
                  <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                    Dropdown link
                  </a>
                  <ul className="dropdown-menu">
                    <li><a className="dropdown-item" href="#">Action</a></li>
                    <li><a className="dropdown-item" href="#">Another action</a></li>
                    <li><a className="dropdown-item" href="#" onClick={logoutEvent}>Logout</a></li>
                  </ul>
                </li>
              </ul>
            </div>
            <div className="profile d-flex align-items-center">
              <img src={user.picture} className="img-fluid" alt="Your Image" style={{ width: '40px', borderRadius: '50%' }} />
              <p style={{ color: 'azure' }} className="mt-3 mx-1">{user.name}</p>
            </div>
          </div>
        </nav>
      }
     {toastShown ? <ToastContainer/>: ''}
      {/* {isAuthenticated && <img src={user.picture} alt="" width={'50px'} height={'50px'} />} */}
      {isAuthenticated && <h2 style={{color:"#25435d",fontWeight:"600"}}>Hello, {userName}</h2>}
      {!isAuthenticated ? <Intro loginWithRedirect={loginWithRedirect} /> : null}
      {isAuthenticated && <Admin />}
    </section>
  );
}

export default Login;

import axios from 'axios';
import React,{useState} from 'react'
import Cookies from 'js-cookie'
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast,Slide } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';




const AdminLogin = () => {
  const [adminData,setAdminData]=useState({adminId:"",adminPass:""})
  const navigate = useNavigate()
const handleOnChange=(e)=>{
 const{name,value}=e.target; 
 setAdminData((prev)=>({
  ...prev,
  [name]:value
 }))
}

const handleSubmit=(e)=>{
  e.preventDefault()
  axios.post("http://localhost:5000/adminLoging",adminData)
  .then((res)=>{
    if(res?.data !== null){
      
      console.log("data",res?.data);
   toast.success('✅ Admin login successfull', {
     position: "top-right",
     autoClose: 3000,
     hideProgressBar: false,
     closeOnClick: true,
     pauseOnHover: true,
     draggable: true,
     progress: undefined,
     theme: "colored",
     transition: Slide,
     });
     Cookies.set("admin",res?.data?._id)
     navigate("/AdminPanel")
 }else{
  toast.error('⚠️ Invalid credintials', {
    position: "top-right",
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "colored",
    transition: Slide,
    });
 }
})
.catch((error)=>{
  console.log("error while in admin panel post");
  toast.error('⚠️ Invalid credintials', {
    position: "top-right",
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "colored",
    transition: Slide,
    });
})

}

  return (
    <div>
    <ToastContainer/>
  <form onSubmit={handleSubmit}>
  <div className="mb-3">
    <label htmlFor="exampleInputEmail1" className="form-label">ADMIN ID</label>
    <input type="text" className="form-control" id="exampleInputEmail1" name="adminId"  onChange={handleOnChange} value={adminData?.adminId} aria-describedby="emailHelp" required/>
  </div>
  <div className="mb-3">
    <label htmlFor="exampleInputPassword1" className="form-label">PASSWORD</label>
    <input type="password" className="form-control" id="exampleInputPassword1" onChange={handleOnChange} value={adminData?.adminPass} name='adminPass' required/>
  </div>
  <div className="mb-3 form-check">
  </div>
  <button type="submit" className="btn btn-primary" >Submit</button> 
</form>
    </div>
  )
}

export default AdminLogin
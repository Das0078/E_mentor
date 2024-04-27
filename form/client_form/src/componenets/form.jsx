import React, { useState,useEffect,useRef } from 'react'
import './form.css';
import {useNavigate} from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useAuth0 } from "@auth0/auth0-react";
import axios from 'axios';
import html2canvas from 'html2canvas'
// import jspdf from 'jspdf'
// eslint-disable-next-line
import html2pdf from 'html2pdf.js'
import { MdDownload } from "react-icons/md";
import { IoIosAddCircle } from "react-icons/io";
import { FaFileAlt } from "react-icons/fa";

const Form = ({data,img}) => {
  const navigate=useNavigate()
  const [invite_info,setInvite_info]=useState({mentor_email:"",mentee_email:""})
  const [bool,setBool]=useState(false)
  //strenghts
  const s1=data.strenghts;
  const s_arr=s1.split(",")

  //weakness
  const w1=data.weakness;
  const w_arr=w1.split(",")
  
  const {user, loginWithRedirect,isAuthenticated,logout,isLoading } = useAuth0();
 
  const submit = () => {
   setInvite_info((prev)=>({
    ...prev,mentor_email:user.email,mentee_email:data.email
   }))
   console.log("invite info",invite_info);
   if (invite_info.mentee_email && invite_info.mentor_email) {
    console.log("invitation",invite_info);
   axios.post("http://localhost:5000/invite", invite_info)
    .then((response)=>{
      setBool(true)
      console.log("success",response);
      toast.success(`✅ ${data.name} added.`, {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        })
    
    })
    .catch((error)=>{
      setBool(true)
      console.log("error in toast ",error);
      toast.warning(`⚠️ ${data.name} has already been assigned.`, {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        })
    })
  };
  }

  const add_log=()=>{
    // console.log("add log",data.name,data.email);
    navigate("/edit",{ state: { name: data.name,email:data.email } })
  }
  

  const download_form=()=>{
    let elem = document.querySelector('.con')
  let opt = {
    filename: `${data.name}_${data.programme}.pdf`,
    image: { type: 'png' },
    html2canvas: { useCORS: true, scale: 2 }
  }
  html2pdf().from(elem).set(opt).save()
    
    
  }

  return (
    <>
     {/* <button onClick={download_form}>Download</button> */}
    <button className="btn btn-primary" onClick={download_form}>Download <MdDownload/></button>

    {/* {user.name} */}
   {bool? 
    "":

    <button className="btn btn-primary" onClick={submit}>Add <IoIosAddCircle/></button>
    // <button onClick={submit}>Add+</button> 

    }
    {/* <button onClick={add_log}>Add Log</button> */}
    <button className="btn btn-primary" onClick={add_log}>Add Log <FaFileAlt/></button>
   <div className="con">

   <section className='sec1'>
   <div className="visuals">
   <div className="pic">
     <img src={data.proUrl} alt="profile.jpg" width={'110px'} height={'130px'} />
     {/* <img src="./images/Adamas_logo.png" alt="" width={'110px'} height={'130px'}/> */}
    </div>
    <div className="sig">
    <img src={data.signUrl} alt="signature.jpg" width={'140px'} height={'32px'} />

    </div>
   </div>

 <div className="info">
  
    <p><b>Name: </b>{data.name}</p>
    <p><b>Programme: </b>{data.programme}</p>
    <p><b>Date of Birth: </b>{data.dob}</p>
    <p><b>Email: </b>{data.email}</p>
    <p><b>Mobile: </b>{data.mobile}</p>
    <p><b>Address(Local): </b>{data.address_local}</p>
    <p><b>Mother's Name: </b>{data.mothers_name}</p>
    <p><b>Mother's Occupation: </b>{data.mothers_occupation}</p>
    <p><b>Father's Name: </b>{data.fathers_name}</p>
    <p><b>Fathers Occupation: </b>{data.fathers_occupation}</p>
    <p><b>Guardians Number: </b>{data.parents_number}</p>
    <p><b>Strenght: </b></p><ol>
      {s_arr.map((str,idx)=>{
        return(
          <li key={idx}>{str}</li>
        )
      })}
    </ol>

    <p><b>Weakness: </b></p> <ol>
    {w_arr.map((str,idx)=>{
        return(
          <li key={idx}>{str}</li>
        )
      })}
    </ol>
  </div>

</section>

 <div className="log">
  <table border="1px">
  <thead>
  <tr>
    <th>Sr. No</th>
    <th>Date</th>
    <th>Mentor</th>
    <th>Discussion during meeting</th>
    <th>Action Taken</th>
  </tr>
  </thead>

<tbody>

{data.log.map((info,idx)=>(
  <tr key={idx}>
    <td>{idx+1}</td>
    <td>{info.date}</td>
    <td>{info.mentor}</td>
    <td>{info.discussion}</td>
    <td>{info.action}</td>
  </tr>
))}

{/* {data.log.map((info, index) => (
  <tr key={index}>
    <td>{index + 1}</td>
    <td>{info.date}</td>
    <td>{info.mentor}</td>
    <td>{info.discussion}</td>
    <td>{info.action}</td>
  </tr>
))} */}


</tbody>

  </table>
 </div>
 <ToastContainer/>

   </div>
   </>
  )
}

export default Form
import { useState, useRef, useEffect } from "react";
// import "./styles.css";
import { useAuth0 } from "@auth0/auth0-react";
import axios from 'axios';
export default function Check() {
  const [admin, setAdmin] = useState("");
  const [role, setRole] = useState("");
  const [display, setDisplay] = useState("none");
  const [button, setButton] = useState(false);
  const [check_btn, setCheck_btn] = useState("none");
  const [mentor_DATA,setMentor_DATA] = useState({email:"",role:"",department:""});



  const {user, loginWithRedirect,isAuthenticated,logout,isLoading } = useAuth0();

  const inputRef = useRef();
  const email = "shubham1.das@stu.adamasuniversity.ac.in";

// const submit=(e)=>{
// if(admin==="") e.preventDefault();
// }
const handleChange=(e)=>{
  const {name,value}=e.target;
  setMentor_DATA({
    ...mentor_DATA,[name]:value,role
  })
}
  const submitForm = () => {
    console.log(mentor_DATA.email);
    inputRef.current.value = "";

    if (!mentor_DATA.email.includes("adamasuniversity.ac.in")) {
      inputRef.current.value = "";
      setRole("please enter a valid email...");
      return;
    }

    setCheck_btn("block")

    if (mentor_DATA.email.includes("stu")) {
      if (mentor_DATA.email === email) {
        setDisplay("none");
        setButton(true);
      } else {
        setDisplay("block");
        setButton(false);
      }
      setRole("mentee");
    } else {
      if (mentor_DATA.email === email) {
        setDisplay("none");
        setButton(true);
      } else {
        setDisplay("block");
        setButton(false);
      }
      setRole("mentor");
    }
  };

  const Continue=(e)=>{
    e.preventDefault();
    console.log(mentor_DATA);
    try {
      axios.post("http://localhost:5000/mentor",mentor_DATA)
          
      } catch (error) {
          console.log("error posting user role details from fe",error);
      }

    loginWithRedirect()
  }

  return (
    <div className="App">
    
      <input 
        type="text"
        ref={inputRef}
        placeholder="email"
        onChange={handleChange} name='email' value={mentor_DATA.email}
        required
      />
      <button
        onClick={() => {
          submitForm(mentor_DATA.email, inputRef, setRole);
        }}
      >
        Check
      </button>

      <br />
      {role}
      {button ? (
        <button style={{display:check_btn}} type="submit" onClick={(e)=>loginWithRedirect()}>Login</button>
      ) : (
        <button style={{display:check_btn}} type="submit" onClick={Continue}>Continue</button>
      )}

      {role === "mentor" ? (
        <select onChange={handleChange} name="department" style={{ display: display }}>
          <option selected disabled>
            select
          </option>
          <option value="Cse">Cse</option>
          <option value="Ece">Ece</option>
          <option value="others">others</option>
        </select>
      ) : role === "mentee" ? (
        <select onChange={handleChange} name="department" style={{ display: display }}>
          <option selected disabled>
            select
          </option>
          <option value="Mca">Mca</option>
          <option value="Btech">Btech</option>
          <option value="Bca">Bca</option>
        </select>
      ) : (
        <select onChange={handleChange} name="department" style={{ display: display }}>
          <option selected disabled>
            select
          </option>
          <option value="Other">Another Option</option>
        </select>
      )}
      
    </div>
  );
}
//shubham1.das@stu.adamasuniversity.ac.in
//subhasish.mohapatra@adamasuniversity.ac.in

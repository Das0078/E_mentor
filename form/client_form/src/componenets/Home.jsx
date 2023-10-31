import React, { useState, useEffect } from 'react'
import axios from 'axios';
import './Home.css';
import PhoneNumber from 'libphonenumber-js';
// import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

const isValidPhoneNumber = (phoneNumber) => {
  try {
    const parsedNumber = PhoneNumber(phoneNumber);
    return parsedNumber.isValid();
  } catch (error) {
    return false;
  }
};
const Home = () => {
  const [mentor, setMentor] = useState([]);

  const [mentee, setMentee] = useState({
    name: "", programme: "", dob: "", email: "", mob: "", addr_loc: "", mo_name: "", mo_occup: "", fa_name: "", fa_occup: "", par_num: "", str: [], weak: [], mentor: "",
  });

  const [selectedFiles, setSelectedFiles] = useState([]);
  const [imageUrls, setImageUrls] = useState([]);
  const [number, setNumber] = useState('');
  const [isValid, setIsValid] = useState(false);



  const handleFileChange = (event, index) => {
    const updatedFiles = [...selectedFiles];
    updatedFiles[index] = event.target.files[0];
    setSelectedFiles(updatedFiles);




  };




  useEffect(() => {
    // Define sec_post function inside the effect
    const sec_post = async () => {
      try {
        if (selectedFiles.length !== 2 || !selectedFiles[0] || !selectedFiles[1]) {
          alert('Please select two images to upload.');
          return;
        }

        const formData = new FormData();
        formData.append('files', selectedFiles[0]);
        formData.append('files', selectedFiles[1]);

        const response1 = await axios.post('http://localhost:5000/sub', formData);
        console.log('Images uploaded:', response1.data);
        const { proUrl, signUrl } = response1.data[0];
        const imgArr = [proUrl, signUrl];
        console.log('image array', imgArr);

        // Update state with the image URLs
        setImageUrls(imgArr.map((image) => image));
        console.log('getting 5000 to 3000');

        // Clear the input fields by updating their values

        
      } catch (error) {
        console.error('Error uploading files:', error);
      }
    };

    // Call sec_post whenever selectedFiles changes
    sec_post();
  }, [selectedFiles]);



  console.log("Submitted mentee", mentee);


  useEffect(() => {
    axios.get('/mentors') // Update the endpoint to your server endpoint
      .then(response => {
        setMentor(response.data)
        //print something to check the fetched data is correct or not for mentor
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, []); 

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === 'par_num') {
      const isValid = isValidPhoneNumber(value);
      setMentee({ ...mentee, [name]: value, isParNumValid: isValid });
    } else {
      setMentee({ ...mentee, [name]: value });
    }
  };



  const sub = async (e) => {
    e.preventDefault();
    if (selectedFiles.length !== 2 || !selectedFiles[0] || !selectedFiles[1]) {
      alert('Please select two images to upload.');
      return;
    }




    // Join the array elements into a string

    await axios.post("http://localhost:5000/submit-form", mentee);



    // document.getElementById('name').value = '';
    // document.getElementById('prog').value = '';
    // document.getElementById('dob').value = '';
    // document.getElementById('email').value = '';
    // document.getElementById('mob').value = '';
    // document.getElementById('addr').value = '';
    // document.getElementById('mo_name').value = '';
    // document.getElementById('mo_occup').value = '';
    // document.getElementById('fa_name').value = '';
    // document.getElementById('fa_occup').value = '';
    // document.getElementById('par_anni').value = '';
    // document.getElementById('str').value = '';
    // document.getElementById('weak').value = '';

    alert("Submitted Successfully!")


  }

  return (
    <>
      <form  >
        <input type="file" onChange={(e) => handleFileChange(e, 0)} accept="image/*" name='files' />
        <input type="file" onChange={(e) => handleFileChange(e, 1)} accept="image/*" name='files' />

        <label htmlFor="name">Name: </label>
        <input type="text" onChange={handleChange} value={mentee.name} name='name' id='name' required /><br />

        <label htmlFor="prog">Programme: </label>
        <input type="text" onChange={handleChange} value={mentee.programme} name='programme' id='prog' required /><br />

        <label htmlFor="dob">Dob: </label>
        <input type="date" onChange={handleChange} value={mentee.dob} name='dob' id='dob' required /><br />

        <label htmlFor="email">Email: </label>
        <input type="email" onChange={handleChange} value={mentee.email} name='email' id='email' required /><br />

        <label htmlFor="mob">Mobile no: </label>
        <input type="tel" onChange={handleChange} value={mentee.mob} name='mob' id='mob' required /><br />

        <label htmlFor="addr">Address(local): </label>
        <input type="text" onChange={handleChange} value={mentee.addr_loc} name='addr_loc' id='addr' required /><br />

        <label htmlFor="mo_name">Mother's Name: </label>
        <input type="text" onChange={handleChange} value={mentee.mo_name} name='mo_name' id='mo_name' required /><br />

        <label htmlFor="mo_occup">Mother's Occupation: </label>
        <input type="text" onChange={handleChange} value={mentee.mo_occup} name='mo_occup' id='mo_occup' required /><br />

        <label htmlFor="fa_name">Father's Name: </label>
        <input type="text" onChange={handleChange} value={mentee.fa_name} name='fa_name' id='fa_name' required /><br />

        <label htmlFor="fa_occup">Father's Occupation: </label>
        <input type="text" onChange={handleChange} value={mentee.fa_occup} name='fa_occup' id='fa_occup' required /><br />

        <label htmlFor="par_num">Parent's Phone number: </label>
        <input type="tel" onChange={handleChange} value={mentee.par_num} name='par_num' id='par_num' required />  {mentee.isParNumValid ? (
          <p style={{ color: 'green' }}>Valid Phone Number</p>
        ) : (
          <p style={{ color: 'red' }}>Invalid Phone Number</p>
        )}<br />


        <label htmlFor="str">Strenghts: </label>
        <textarea name="str" onChange={handleChange} value={mentee.str} id="str" cols="30" rows="10" placeholder='str' required></textarea><br />

        <label htmlFor="weak">Weakness: </label>
        <textarea name="weak" onChange={handleChange} value={mentee.weak} id="weak" cols="30" rows="10" placeholder='weak' required></textarea><br />
        <label htmlFor="mentor">Select Your Mentor: </label><br />
        <select name="mentor" onChange={handleChange} id="Mentor">
          <option selected disabled>select</option>
          {mentor.map((ment,idx)=>{
            return(
              <option value={ment._id}>{ment.name}</option>
            )
          })}

        </select><br />
        <button type='submit' onClick={sub}>Submit</button>
        <button type="reset">Reset</button>
      </form>

 


    </>

  )
}

export default Home



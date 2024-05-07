import React,{useState,useEffect} from 'react'
import Form from './Form';
import axios from 'axios';
import './Admin.css'
import button from '../Functions/Click';
import { IoMdSearch } from "react-icons/io";
import MenteeCard from './MenteeCard';
import { useAuth0 } from '@auth0/auth0-react';
const Admin = () => {
  const staticSuggestions = ["Apple", "Banana", "Orange", "Mango", "Grapes","almirah"];
  const [data, setData] = useState([]);
  const [search, setSearch] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [allMenteesInfo, setAllMenteesInfo] = useState([]);
  const { user, loginWithRedirect, isAuthenticated, logout, isLoading } = useAuth0();


useEffect(()=>{
  axios.get('/getMentorId', { params: { mentor_email: user?.email } }) // Update the endpoint to your server endpoint
  .then(response => {
    console.log("render data getMentorId",response?.data?.mentor_id);
    getting_all_mentees_info(response?.data?.mentor_id);

  })
  .catch(error => {
    console.error('Error fetching data:', error);
  });
// console.log("USER::=>",user);
},[])

    const sub2 = () => {
        console.log("clicked");
        axios.get('/render', { params: { search } }) // Update the endpoint to your server endpoint
          .then(response => {
            console.log("render data",response.data);
            setData(response.data);
            // console.log("render data", data[0]);
          })
          .catch(error => {
            console.error('Error fetching data:', error);
          });
        console.log("done");
      }

      const getting_all_mentees_info=async(mentor_id)=>{
        await axios.get('/getMenteesInfo',{params:{mentor_id}})
        .then(response => {
          console.log("getMenteesInfo data::=>",response.data);
          setAllMenteesInfo(response.data);
        })
        .catch(error => {
          console.error('Error fetching data:', error);
        });

      }

      const handleSearchChange = (e) => {
  const query = e.target.value;
  setSearch(query);
  if (query === "") {
    setSuggestions([]); // Clear suggestions when the query is empty
  } else {
    const filteredSuggestions = staticSuggestions.filter(suggestion =>
      suggestion.toLowerCase().startsWith(query.toLowerCase())
    );
    setSuggestions(filteredSuggestions);
  }
};


const handleSuggestionClick = (suggestion, e) => {
  setSearch(suggestion);
  setSuggestions([]);
  e.stopPropagation();
};

    return (

        <section className='adminPanel'>
            {/* <form action="">
                <label htmlFor="discussion">Discussion: </label>
                <textarea name="discussion" id="discussion" cols="30" rows="10"></textarea>

                <label htmlFor="action">Action: </label>
                <textarea name="action" id="action" cols="30" rows="10"></textarea>

                <button type='submit'>Submit</button>

            </form> */}
            <div className="autocomplete" style={{ width: '300px' }}>
        <input className='admin_input' type="text" value={search} onChange={handleSearchChange} placeholder="Search" />
        {suggestions.length > 0 && (
          <div className="autocomplete-items">
            {suggestions.map((suggestion, index) => (
              <div key={index} onClick={(e) => handleSuggestionClick(suggestion, e)}>{suggestion}</div>

            ))}
          </div>
        )}
      </div>
      <button class="btn btn-primary" onClick={sub2}>Search <IoMdSearch/></button>
      <button class="btn btn-info" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasRight" aria-controls="offcanvasRight">See All Mentees</button>

      {data.length === 0 ?
      (<>
      <h1>Nothing to show</h1> 
      </> )
      : data.map((dt, id) => {
        return <Form key={id} data={dt} />
      })}
      {/* <button onClick={()=>button("shubham","das",78)}>On</button> */}

<div className="offcanvas offcanvas-end" tabindex="-1" id="offcanvasRight" aria-labelledby="offcanvasRightLabel">
  <div className="offcanvas-header">
    <h5 className="offcanvas-title" id="offcanvasRightLabel" style={{color:"black"}}>All Mentees Details</h5>
    <button type="button" className="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
  </div>
  
  {allMenteesInfo?.length > 0 ?
  <div className="offcanvas-body" style={{color:"black"}}>
  <h4>Total Mentees: {allMenteesInfo?.length}</h4>
  {
    allMenteesInfo?.map((item)=>{
      return(
        <MenteeCard allMenteesInfo={item}/>

      )
    })
  }
</div>:
<h4>No mentees to show...</h4>
}
</div>
        </section>
    )
}

export default Admin
import React,{useState,useEffect} from 'react'
import Form from './Form';
import axios from 'axios';
import './Admin.css'
import button from '../Functions/Click';
import { IoMdSearch } from "react-icons/io";

const Admin = () => {
  const [data, setData] = useState([]);
  const [search, setSearch] = useState("");
useEffect(()=>{
getting_all_mentees_info("6556528903bd140b79f2e8d6");
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
          console.log("getMenteesInfo data::=>",response.data?.length);
        })
        .catch(error => {
          console.error('Error fetching data:', error);
        });

      }
    return (

        <section className='adminPanel'>
            {/* <form action="">
                <label htmlFor="discussion">Discussion: </label>
                <textarea name="discussion" id="discussion" cols="30" rows="10"></textarea>

                <label htmlFor="action">Action: </label>
                <textarea name="action" id="action" cols="30" rows="10"></textarea>

                <button type='submit'>Submit</button>

            </form> */}
        <input className='admin_input' type="text" value={search} onChange={(e) => { setSearch(e.target.value) }} />
      
      <button class="btn btn-primary" onClick={sub2}>Search <IoMdSearch/></button>
      {data.length === 0 ?
      (<>
      <h1>Nothing to show</h1> 
      </> )
      : data.map((dt, id) => {
        return <Form key={id} data={dt} />
      })}
      {/* <button onClick={()=>button("shubham","das",78)}>On</button> */}
        </section>
    )
}

export default Admin
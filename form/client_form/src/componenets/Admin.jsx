import React,{useState,useEffect} from 'react'
import Form from './form';
import axios from 'axios';

const Admin = () => {
  const [data, setData] = useState([]);
  const [search, setSearch] = useState("");


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
    return (

        <>
            {/* <form action="">
                <label htmlFor="discussion">Discussion: </label>
                <textarea name="discussion" id="discussion" cols="30" rows="10"></textarea>

                <label htmlFor="action">Action: </label>
                <textarea name="action" id="action" cols="30" rows="10"></textarea>

                <button type='submit'>Submit</button>

            </form> */}
        <input type="text" value={search} onChange={(e) => { setSearch(e.target.value) }} />
      <button onClick={sub2}>Search</button>
      {data.length === 0 ? <h1>Nothing to show</h1> : data.map((dt, id) => {
        return <Form key={id} data={dt} />
      })}
        </>
    )
}

export default Admin
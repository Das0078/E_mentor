import React from 'react'
import './form.css';



const form = ({data,img}) => {

  //strenghts
  const s1=data.strenghts;
  const s_arr=s1.split(",")

  //weakness
  const w1=data.weakness;
  const w_arr=w1.split(",")
  
 

  return (
   <div className="con">
   <section className='sec1'>
   <div className="visuals">
   <div className="pic">
     <img src={data.proUrl} alt="profile.jpg" width={'110px'} height={'130px'} />
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
<tr>
    <td>1</td>
    <td>12/12/2012</td>
    <td>Mr. Amuk Roy</td>
    <td>just chilling</td>
    <td>more chilling</td>
  </tr>

  <tr>
    <td>2</td>
    <td>12/12/2012</td>
    <td>Mr. Amuk Roy</td>
    <td>just chilling</td>
    <td>more chilling</td>
  </tr>
  <tr>
    <td>3</td>
    <td>12/12/2012</td>
    <td>Mr. Amuk Roy</td>
    <td>just chilling</td>
    <td>more chilling</td>
  </tr>
</tbody>

  </table>
 </div>

   </div>
  )
}

export default form
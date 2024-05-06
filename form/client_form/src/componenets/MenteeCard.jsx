import React from 'react'
import './MenteeCard.css'
import { MdEmail } from "react-icons/md";
import { FaPhoneAlt } from "react-icons/fa";
import { MdLocationOn } from "react-icons/md";
const MenteeCard = ({allMenteesInfo}) => {
  return (
    <>
    <div className="cardParent">
        <div className="cardImg">
            <img src={allMenteesInfo?.proUrl} alt="img" />
        </div>
        <div className="cardDesc">
            <div className="title">
                <p><span className='name'>{allMenteesInfo?.name},</span> <span className='department'>{allMenteesInfo?.programme}</span></p>
            </div>
            <p><MdEmail color='grey'/> <span className='extra_info'><a href={`mailto:${allMenteesInfo?.email}`}>{allMenteesInfo?.email}</a></span></p>
            <p><FaPhoneAlt color='grey'/> <span className='extra_info'>{allMenteesInfo?.mobile}</span></p>
            <p><MdLocationOn color='grey'/> <span className='extra_info'>{allMenteesInfo?.address_local}</span></p>



        </div>
    </div>
    </>
  )
}

export default MenteeCard
const express=require('express');
const {getAdmin,getAllMentees,getAllMentors} =require ('../controllers/admin_control')

const router=express.Router();

exports.Get_admin=router.post("/adminLoging",getAdmin)
exports.Get_All_Mentors=router.get("/getAllMentors",getAllMentors)
exports.Get_All_Mentees=router.get("/getAllMentees",getAllMentees)

const express=require('express');
const { Mentor_log, Form_render, reg_mentor, sub_reg_mentors } = require('../controllers/mentor_control');




const router=express.Router();

exports.Submit_reg_mentors=router.post("/mentor",sub_reg_mentors)

exports.Registered_Mentors=router.get("/mentors",reg_mentor)

exports.form_render=router.get("/render",Form_render )

exports.mentor_log=router.get("/mentor_log",Mentor_log)



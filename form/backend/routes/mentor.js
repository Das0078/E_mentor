const express=require('express');
const { Mentor_log, Form_render } = require('../controllers/mentor_control');



const router=express.Router();

exports.form_render=router.get("/render",Form_render )

exports.mentor_log=router.get("/mentor_log",Mentor_log)


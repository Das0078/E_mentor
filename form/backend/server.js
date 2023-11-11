const express=require('express');
const mongoose=require('mongoose');
const { mentor_log, form_render, Registered_Mentors, Submit_reg_mentors } = require('./routes/mentor');
const { sub_mentee_form, Submit_mentee_form } = require('./routes/mentee');



const bodyParser = require('body-parser');
const app=express();
// const { v4: uuidv4 } = require('uuid');
// require('./client/src/images/')
const cors=require('cors');


app.use(cors());


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(mentor_log)
app.use(form_render)
app.use(Registered_Mentors)
app.use(Submit_mentee_form)
app.use(sub_mentee_form)
app.use(Submit_reg_mentors)


mongoose.connect("mongodb://127.0.0.1:27017/Form",{useNewUrlParser:true}).then(()=>{
    console.log("connected");
}).catch((e)=>{
console.log("errrrrrorrrrrr......");
console.log(e);
})



app.listen(5000,()=>{
    console.log("online at 5000");
})


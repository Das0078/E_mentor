const express=require('express');
const { v4: uuidv4 } = require('uuid');

const Form = require("./model/Form_model")
const Mentors=require('./model/mentor.model')
const { mentor_log, Form_render, Registered_Mentors, Submit_reg_mentors,all_mentees_info } = require('./routes/mentor');
const { sub_mentee_Form, Submit_mentee_Form } = require('./routes/mentee');


const mongoose=require('mongoose');


const jwt=require('jsonwebtoken');


const bodyParser = require('body-parser');
const app=express();
// const { v4: uuidv4 } = require('uuid');
// require('./client/src/images/')
const cors=require('cors');


app.use(cors());


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(mentor_log)
app.use(Form_render)
app.use(Registered_Mentors)
app.use(Submit_mentee_Form)
app.use(sub_mentee_Form)
app.use(Submit_reg_mentors)
app.use(all_mentees_info)



mongoose.connect("mongodb://127.0.0.1:27017/Form",{useNewUrlParser:true}).then(()=>{
    console.log("connected");
}).catch((e)=>{
console.log("errrrrrorrrrrr......");
console.log(e);
})

app.post("/generateOTP",(req,res)=>{
    function generateRandomId() {
        return uuidv4();
      }
      
      // Example: Generate a random UUID
      const randomId = generateRandomId();
      console.log("randomId",randomId);
      res.json({randomId})
})


app.post("/invite",async(req,res)=>{
    const{mentor_email,mentee_email}=req.body;
    const mentees_mentorId_check=await Form.findOne({email:mentee_email})
    if(mentees_mentorId_check){
      if(mentees_mentorId_check?.mentor_Id?.length){
        console.log("mentor id existed",mentees_mentorId_check.mentor_Id);
        res.status(404).send()
        return;
      }else{
        console.log("mentor id does not existed");
      }
    }
    console.log("Received invite request:", mentor_email, mentee_email);

    const mentor=await Mentors.findOne({email:mentor_email})

    const mentorId_assigned=await Form.find({mentor_Id:mentor._id})
console.log("lenght",mentorId_assigned.length+1);
    const updatedMentor = await Mentors.updateOne(
        { email: mentor_email },
        { $inc: { mentee_assigned: 1 } }
      );

      const updatedMentee = await Form.updateOne(
        { email: mentee_email },
        { mentor_Id:mentor._id}
      );

      res.status(200).send()
    
})

app.post("/log",async(req,res)=>{
  const{discussion,action,mentor,date,mentee_email}=req.body;
  console.log(discussion,action,mentor,date,mentee_email);

  try {
    
    const updated_log = await Form.findOne({ email: mentee_email });

    if (!updated_log) {
      return res.status(404).json({ message: "Mentee not found." });
    }


    updated_log.log.push({ discussion, action, mentor, date });

    await updated_log.save();

    return res.status(200).json({ message: "Log added successfully." });
  } catch (error) {
    console.error("Error adding log:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }

})

app.listen(5000,()=>{
    console.log("online at 5000");
})


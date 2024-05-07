const express=require('express');
const { v4: uuidv4 } = require('uuid');
const http = require('http');
const socketIo = require('socket.io');

const Form = require("./model/Form_model")
const Mentors=require('./model/mentor.model')
const { mentor_log, Form_render, Registered_Mentors, Submit_reg_mentors,all_mentees_info,mentor_id } = require('./routes/mentor');
const { sub_mentee_Form, Submit_mentee_Form } = require('./routes/mentee');
const {Get_admin } = require ('./routes/admin')

const mongoose=require('mongoose');
const nodemailer = require('nodemailer');


const jwt=require('jsonwebtoken');


const bodyParser = require('body-parser');
const app=express();
const server = http.createServer(app);
const io = socketIo(server);
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
app.use(mentor_id)
app.use(Get_admin)




mongoose.connect("mongodb://127.0.0.1:27017/Form",{useNewUrlParser:true}).then(()=>{
    console.log("connected");
}).catch((e)=>{
console.log("errrrrrorrrrrr......");
console.log(e);
})
io.on('connection', (socket) => {
  console.log('A user connected');

  socket.on('disconnect', () => {
      console.log('User disconnected');
  });

  socket.on('chat message', (msg) => {
      console.log('Received message:', msg);
      // Broadcast the message to all connected clients
      io.emit('chat message', msg);
  });
});
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

app.post('/send-email', (req, res) => {
  const { from, to, message } = req.body;

  // Create a transporter object using SMTP transport
  let transporter = nodemailer.createTransport({
      service: 'outlook',
      auth: {
          user: from, // Sender's email address
          pass: 'your_password' // Sender's password
      }
  });

  // Setup email data
  let mailOptions = {
      from: from,
      to: to, // Receiver's email address
      subject: 'Message from E_Mentor',
      text: message // Message body
  };

  // Send email
  transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
          console.error('Error occurred:', error);
          res.status(500).send('Error occurred while sending email');
      } else {
          console.log('Email sent:', info.response);
          res.status(200).send('Email sent successfully');
      }
  });
});

server.listen(5000,()=>{
    console.log("online at 5000");
})


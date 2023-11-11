const Mentors=require('../model/mentor.model')
const Form=require("../model/form_model")

const reg_mentor=async(req,res)=>{
  try {
    const mentor_data=await Mentors.find();
    res.json(mentor_data);
  } catch (error) {
    console.log("error fetching mentors data",error);
  }
  }

const Mentor_log=async(req,res)=>{
    try {
      const {email,password}=req.query;
      console.log("bc",email,password);
     
      const mentor_db=await Mentors.find({email,password});
      res.json(mentor_db)
      console.log("m_db",mentor_db);
    } catch (error) {
    console.log("error fetching mentors data",error);
      
    }
  
  }
  const Form_render = async (req, res) => {
    try {
      const input = req.query.search; 
      console.log("input", input);
      const data = await Form.find({ name: input }); // Assuming Form is your Mongoose model
  
      if (!data || data.length === 0) {
        console.log("No data found.");
      } else {
        console.log("Data found:");
        console.log(JSON.stringify(data, null, 2)); // Log the data in user-readable JSON format with 2-space indentation.
      }
  
      res.json(data);
      console.log("Got data from admin...", data);
  
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }

const sub_reg_mentors=async(req,res)=>{
  const mentor_data=req.body;
  console.log("Mentor data",mentor_data);
try {
  const mentor=new Mentors({
    name:mentor_data.name,
    email:mentor_data.email,
    password:mentor_data.password

  })
  mentor.save();
  console.log("Mentor saved successfully into db");
} catch (error) {
  console.log("Couldn't saved mentor into db",error);
  
}

}



  module.exports={
    Mentor_log,
    Form_render,
    reg_mentor,
    sub_reg_mentors
  }
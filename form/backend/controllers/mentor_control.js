const Mentors=require('../mentor.model')
const Form=require("../form_model")
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


  module.exports={
    Mentor_log,
    Form_render
  }
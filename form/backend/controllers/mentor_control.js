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
const Form_render=async (req, res) => {
  try {
    const input = req.query.search; 
    console.log("input",input);
    const data = await Form.find({name:input}) // Assuming Form is your Mongoose model
    res.json(data);
    console.log("got data",data);


  } catch (error) {
    console.error("Error fetching data:", error);
  }
}


  module.exports={
    Mentor_log,
    Form_render
  }
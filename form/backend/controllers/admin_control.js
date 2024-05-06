const Admin = require("../model/admin");
const Mentors=require('../model/mentor.model')
const Form = require("../model/Form_model");

const getAdmin=async(req,res)=>{
try {
    const {adminId,adminPass} =req.body
    const admin_data = await Admin.findOne({adminId,adminPass});
    console.log("admin",admin_data);
    res.json(admin_data)
} catch (error) {
    console.log("admin error");
    res.json({message:"error"})

}
}

const getAllMentees=async(req,res)=>{
    try {

        const all_mentees_data = await Form.find();
        res.json(all_mentees_data)
    } catch (error) {
        console.log("all_mentees_data error");
        res.json({message:"all_mentees_data error"})
    
    }
    }

    const getAllMentors=async(req,res)=>{
        try {
            const all_mentors_data = await Mentors.find();
            res.json(all_mentors_data)
        } catch (error) {
            console.log("all_mentors_data error");
            res.json({message:"all_mentors_data error"})
        
        }
        }
module.exports={
    getAdmin,
    getAllMentees,
    getAllMentors
}
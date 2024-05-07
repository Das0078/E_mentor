const express = require('express');
const mongoose = require('mongoose');


const form_schema = new mongoose.Schema({
    name: {
        type: String,
        require: true
    },
    enrollmentNumber: {
        type: String,
        required: true
    },
    programme: {
        type: String,
        require: true
    },
    dob: {
        type: String,
        require: true
    },
    email: {
        type: String,
        require: true
    },
    mobile: {
        type: Number,
        require: true
    },
    address_local: {
        type: String,
        require: true
    },
    mothers_name: {
        type: String,
        require: true
    },
    mothers_occupation: {
        type: String,
        require: true
    },
    fathers_name: {
        type: String,
        require: true
    },
    fathers_occupation: {
        type: String,
        require: true
    },
    parents_number: {
        type: Number,
        require: true
    },
    strenghts: {
        type: String,
        require: true
    },
    weakness: {
        type: String,
        require: true
    },
    mentor_Id:{
        type: String,
        require: true
    },
    role:{
        type: String,
        required: true,
    },
    proUrl: {
        type: String,
        required: true,
    },
 
    signUrl: {
        type: String,
        required: true,
    },
    log:{
        type:Array,
        default:[]
    }

});


const Form = mongoose.model("Registered_mentees", form_schema);
module.exports = Form;
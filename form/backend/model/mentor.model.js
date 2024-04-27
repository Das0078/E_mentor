const express = require('express');
const mongoose = require('mongoose');


const mentor_schema = new mongoose.Schema({


    name: {
        type: String,
        require: true
    },
    email: {
        type: String,
        require: true
    },
    password: {
        type: String,
        require: true
    },
    role:{
        type: String,
        require: true
    },
    Department:{
        type: String,
        require: true
    },
    mentee_assigned:{
        type: Number,
        default: 0
    },



});


const Mentors = mongoose.model("Registered_mentors", mentor_schema);
module.exports = Mentors;
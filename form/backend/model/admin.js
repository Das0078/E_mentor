const mongoose = require('mongoose');

const admin_schema = new mongoose.Schema({
    adminId: {
        type: String,
        require: true
    },
    adminPass: {
        type: String,
        required: true,
    }

});
const Admin = mongoose.model("Admin", admin_schema);
module.exports = Admin;
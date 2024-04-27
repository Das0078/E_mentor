const cloudinary = require('cloudinary').v2;
const bodyParser = require('body-parser');
const express = require('express')
const app = express();
const Form=require('../model/Form_model')
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


let getImage = [];


cloudinary.config({
    cloud_name: 'dgojih5sx',
    api_key: '671726286779526',
    api_secret: 'AlgeXUrec4f6fPsL2F9wqvdE3qk',
    secure: true
});
async function submitMenteeForm(req, res) {
    try {
        const data = req.body;
        const { mentor } = req.body;
        console.log("mentor", mentor);
        console.log('req.files:', req.files);
        // Upload images to Cloudinary and get image upload responses
        console.log("data from FE", data);

        // Assuming you have the date string
        const dateString = data.dob

        // Create an array of month names
        const monthNames = [
            "January", "February", "March", "April", "May", "June",
            "July", "August", "September", "October", "November", "December"
        ];
        const date = new Date(dateString);

        // Get the date components
        const year = date.getFullYear(); // YYYY
        const month = monthNames[date.getMonth()]; // Month name
        const day = String(date.getDate()).padStart(2, "0"); // DD

        // Create the formatted date string (e.g., "September 28, 2023")
        const formattedDate = `${month} ${day}, ${year}`;

        console.log("formattedDate", formattedDate); // Output: "September 28, 2023"
        // Create a new instance of the Form model using the received data and image URLs
        const newFormData = new Form({
            name: data.name,
            programme: data.programme,
            dob: formattedDate,
            email: data.email,
            mobile: data.mob,
            address_local: data.addr_loc,
            mothers_name: data.mo_name,
            mothers_occupation: data.mo_occup,
            fathers_name: data.fa_name,
            fathers_occupation: data.fa_occup,
            parents_number: data.par_num,
            strenghts: data.str,
            weakness: data.weak,
            mentor_Id: "",
            role:"mentee",
            proUrl: getImage[0].imageUrl,
            signUrl: getImage[1].imageUrl
        });
        await newFormData.save();

        if (data.email.includes('stu')) { 
            console.log('Data saved to MongoDB collection.');
            res.status(203).json({ message: 'Data saved successfully' });
        }else{
            console.log('Data saved to MongoDB collection without mentee role.');
            res.status(200).json({ message: 'Data saved successfully without mentee role' });


        }


        
    } catch (error) {
        console.error('Error saving data:', error);
        res.status(500).json({ error: 'An error occurred while processing the request.' });
    }
}

async function submitMenteeImages(req, res) {
    try {
        console.log("rq files", req.files);
        // Upload images to Cloudinary and get image upload responses
        const imageUploadResponses = await uploadImages(req.files);
        getImage = imageUploadResponses;
        console.log("GETIMAGE", getImage);
        // Send the image upload responses back to the client
        res.status(200).json(imageUploadResponses);

    } catch (error) {
        console.error('Error in /sub:', error);
        res.status(500).json({ error: 'An error occurred while processing the request.' });
    }
}

async function uploadImages(files) {
    try {
        const imageUploadResponses = await Promise.all(
            files.map((file) => {
                return new Promise((resolve) => {
                    console.log('Uploading image to Cloudinary...');
                    cloudinary.uploader.upload_stream({ resource_type: 'auto' }, (error, result) => {
                        if (error) {
                            console.error('Error uploading image:', error);
                            resolve({ error: 'An error occurred while processing the request.' });
                        } else {
                            console.log('Image Public ID:', result.public_id);
                            resolve({ imagePublicId: result.public_id, imageUrl: result.secure_url });
                        }
                    }).end(file.buffer);
                });
            })
        );

        console.log('Image Upload Responses:', imageUploadResponses);
        return imageUploadResponses;
    } catch (error) {
        console.error('Error in uploadImages:', error);
        return [{ error: 'An error occurred while processing the request.' }];
    }
}

module.exports = {
    submitMenteeForm,
    submitMenteeImages
}
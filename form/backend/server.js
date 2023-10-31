const express=require('express');
const mongoose=require('mongoose');
const multer = require('multer');
const { mentor_log, form_render } = require('./routes/mentor');

const Form=require("./form_model");
const Mentors=require('./mentor.model')
const cloudinary = require('cloudinary').v2;
const bodyParser = require('body-parser');
const app=express();
// const { v4: uuidv4 } = require('uuid');
// require('./client/src/images/')
const cors=require('cors');

app.use(cors());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(mentor_log)
app.use(form_render)
let getImage=[];

mongoose.connect("mongodb://127.0.0.1:27017/Form",{useNewUrlParser:true}).then(()=>{
    console.log("connected");
}).catch((e)=>{
console.log("errrrrrorrrrrr......");
console.log(e);
})

cloudinary.config({
  cloud_name: 'dknjbwhr8',
  api_key: '923763529138166',
  api_secret: 'a7z7_5v_SvCBHq-ew2nd93dWAGM',
  secure: true
});

// ... (other imports and setup code)
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });



// Route to submit the form data and images
app.post('/submit-form',upload.array('files', 2), async (req, res) => {
  try {
    const data = req.body;
    const {mentor}=req.body;
    console.log("mentor",mentor);
    console.log('req.files:', req.files);
    // Upload images to Cloudinary and get image upload responses
    console.log("data from FE",data);

    // Assuming you have the date string
const dateString = data.dob

// Create an array of month names
const monthNames = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

// Create a Date object from the date string
const date = new Date(dateString);

// Get the date components
const year = date.getFullYear(); // YYYY
const month = monthNames[date.getMonth()]; // Month name
const day = String(date.getDate()).padStart(2, "0"); // DD

// Create the formatted date string (e.g., "September 28, 2023")
const formattedDate = `${month} ${day}, ${year}`;

console.log("formattedDate",formattedDate); // Output: "September 28, 2023"
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
      mentor_Id:data.mentor,
      proUrl: getImage[0].imageUrl,
      signUrl: getImage[1].imageUrl
    });

    // Save the new form data to the collection
    await newFormData.save();

    console.log('Data saved to MongoDB collection.');
    res.status(200).json({ message: 'Data saved successfully' });
  } catch (error) {
    console.error('Error saving data:', error);
    res.status(500).json({ error: 'An error occurred while processing the request.' });
  }
});




// Route to handle image uploads to Cloudinary
app.post('/sub', upload.array('files', 2), async (req, res) => {
  try {
    console.log("rq files",req.files);
    // Upload images to Cloudinary and get image upload responses
    const imageUploadResponses = await uploadImages(req.files);
    getImage=imageUploadResponses;
    console.log("GETIMAGE",getImage);
    // Send the image upload responses back to the client
    res.status(200).json(imageUploadResponses);
  } catch (error) {
    console.error('Error in /sub:', error);
    res.status(500).json({ error: 'An error occurred while processing the request.' });
  }
});


// Function to upload images to Cloudinary and return upload responses
// Function to upload images to Cloudinary and return upload responses
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


app.post("/mentor",async(req,res)=>{
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

})


// app.get("/render", async (req, res) => {
//   try {
//     const input = req.query.search; 
//     console.log("input",input);
//     const data = await Form.find({name:input}) // Assuming Form is your Mongoose model
//     res.json(data);
//     console.log("got data",data);


//   } catch (error) {
//     console.error("Error fetching data:", error);
//   }
// })

app.get("/mentors",async(req,res)=>{
try {
  const mentor_data=await Mentors.find();
  res.json(mentor_data);
} catch (error) {
  console.log("error fetching mentors data",error);
}
})

// app.get("/mentor_log",async(req,res)=>{
//   try {
//     const {email,password}=req.query;
//     console.log("bc",email,password);
   
//     const mentor_db=await Mentors.find({email,password});
//     res.json(mentor_db)
//     console.log("m_db",mentor_db);
//   } catch (error) {
//   console.log("error fetching mentors data",error);
    
//   }

// })


app.listen(5000,()=>{
    console.log("online at 5000");
})


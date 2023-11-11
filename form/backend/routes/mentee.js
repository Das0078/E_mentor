

const bodyParser = require('body-parser');
const multer = require('multer');
const express = require('express');
const router = express.Router();
const app = express();

const { submitMenteeForm, submitMenteeImages } = require('../controllers/mentee_control');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));





// ... (other imports and setup code)
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

const Submit_mentee_form = router.post('/submit-form', upload.array('files', 2), submitMenteeForm);

const sub_mentee_form = router.post('/sub', upload.array('files', 2), submitMenteeImages);



module.exports = {
  Submit_mentee_form,
  sub_mentee_form
}
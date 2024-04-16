const express = require('express');
const mongoose = require('mongoose');
const db =require("./clouddb").mongoURL;
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();

// Middleware
app.use(bodyParser.json());
app.use(cors());

// Connect to MongoDB
mongoose.connect(db, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.error('MongoDB connection error:', err));

//login up
const loginSchema = new mongoose.Schema({
    email:String,
    password:String
});
const login = mongoose.model('login', loginSchema);

// login Route
app.post('/login', async (req, res) => {
    const { email,password } = req.body;
    try {
        const newLogin = new login({email,password});
        await newLogin.save();
        res.status(201).json(newLogin);
    } catch (err) {
        console.error('Error inserting record:', err);
        res.status(500).json({ message: 'Error inserting record' });
    }
});


//Sign up
const signupSchema = new mongoose.Schema({
    username:String,
    email:String,
    password:String,
    confirmpassword:String
});
const signup = mongoose.model('signup', signupSchema);

// Signup Route
app.post('/signup', async (req, res) => {
    const {  username,email,password,confirmpassword } = req.body;
    try {
        const newSignup = new signup({ username,email,password,confirmpassword });
        await newSignup.save();
        res.status(201).json(newSignup);
    } catch (err) {
        console.error('Error inserting record:', err);
        res.status(500).json({ message: 'Error inserting record' });
    }
});

// profile a schema
const profileSchema = new mongoose.Schema({
        preferName: String,
        fullName: String,
        mobileNumber: String,
        dob: String,
        aadharId: String,
        Age: String,
        Gender: String,
        Qualificatio: String,
        address: String,
        State: String,
        Countr: String
});

const Profile = mongoose.model('Profile', profileSchema);

// Profile Route
app.post('/profile', async (req, res) => {
    const { 
        preferName,
        fullName,Countr,State,address,Qualificatio,Gender,Age,aadharId,dob,mobileNumber } = req.body;
    try {
        const newProfile = new Profile({ preferName,
            fullName,Countr,State,address,Qualificatio,Gender,Age,aadharId,dob,mobileNumber });
        await newProfile.save();
        res.status(201).json(newProfile);
    } catch (err) {
        console.error('Error inserting record:', err);
        res.status(500).json({ message: 'Error inserting record' });
    }
});

// GET Route
app.get("/", (req, res) => {
    res.set({
        "Allow-access-Allow-Origin": "*"
    });
    return res.send('Welcome to the server!');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

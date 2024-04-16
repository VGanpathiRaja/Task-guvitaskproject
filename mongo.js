const mongoose = require('mongoose');

mongoose.connect("mongodb://127.0.0.1:27017/Guvitask")
  .then(() => {
    console.log('Database Connected Successfully');
  })
  .catch((error) => {
    console.error('Database Connection Error:', error); // Log the error for better debugging
  });

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  }
});

const login = mongoose.model("login", userSchema);

module.exports = login;

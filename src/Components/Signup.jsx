import { useEffect, useState } from 'react';
import axios from 'axios';
import './Style.css';
import { Link } from 'react-router-dom';
import Login from './Login';

function Signup() {
  const initialValues = {username: "", email: "", password: "" ,confirmpassword:"" };
  const [formValues, setFormValues] = useState(initialValues);
  const [formErr, setFormErr] = useState({});
  const [isSubmit, setSubmit] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [loginError, setLoginError] = useState(null);

  const handleChange = (event) => {
      const { name, value } = event.target;
      setFormValues({ ...formValues, [name]: value });
  };

  const handleSubmit = async (event) => { // Make the function asynchronous
    event.preventDefault();

    try {
        const res = await axios.post('http://localhost:5000/signup', {
            username: formValues.username,
            email: formValues.email,
            password: formValues.password,
            confirmpassword: formValues.confirmpassword
        });
        console.log('Login Successful:', res.data);
        setLoginError(null);
        setFormValues(initialValues);
    } catch (error) {
        console.error('Login Error:', error.response.data);
        setLoginError(error.response.data.message);
    }

    setFormErr(validate(formValues));
    setSubmit(true);
};


  const togglePasswordVisibility = () => {
      setShowPassword(!showPassword);
  };

  useEffect(() => {
      if (Object.keys(formErr).length === 0 && isSubmit) {
          console.log("No form errors");
      }
  }, [formErr, isSubmit]);

  const validate = (values) => {
      const errors = {};
      const regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
     
      if (!values.username) {
        errors.username = "please fill the user name";
      }
      if (!values.email) {
          errors.email = "This field is mandatory so you must fill it.";
      } else if (!regex.test(values.email)) {
          errors.email = "Please enter a valid email address.";
      }

      if (!values.password) {
          errors.password = "This field is mandatory so you must fill it.";
      } else if (values.password.length < 4) {
          errors.password = "Your password must have at least 4 characters.";
      } else if (values.password.length > 10) {
          errors.password = "Your password must not exceed 10 characters.";
      }
      if (!values.confirmpassword) {
        errors.confirmpassword = "This field is mandatory so you must fill it.";
    } else if (values.password !== values.confirmpassword) {
        errors.confirmpassword = "Password and confirm password should match.";
    }
      return errors;
  };

  return (
    <section className="form">
       <div className="form-part signin"> 
          <form action='/Signup' method='POST' onSubmit={handleSubmit}>
              <h1>Sign Up</h1>
              {loginError && <div className="error">{loginError}</div>}
              {Object.keys(formErr).length === 0 && isSubmit && (
                    <div className="success">signed Successfully</div>
                )}
              <div className="fields">
                  <label htmlFor="username">User Name</label><br/>
                  <input 
                  type="text" 
                  id="userName" 
                  name="username" 
                  placeholder="Enter your Name"
                  value={formValues.username} 
                  onChange={handleChange} 
                  />
              </div>

              <div className="fields">
              <label htmlFor="email">Email</label><br/>
              <input 
                  type="email" 
                  id="email" 
                  name="email" 
                  placeholder="Enter your Email Address"
                  value={formValues.email} 
                  onChange={handleChange}   
              />
              </div>
              <span>{formErr.email}</span>

              <div className="fields">
              <label htmlFor="password">Password</label><br/>
              <input 
                  type={showPassword ? "text" : "password"}
                  id="password" 
                  name="password" 
                  placeholder="Enter your Password"
                  value={formValues.password}
                  onChange={handleChange}
              />
              </div>
              <span>{formErr.password}</span>

              <div className="fields">
                  <label htmlFor="confirmpassword">Confirm Password</label><br/>
                  <input 
                  type={showPassword ? "text" : "password"}
                  id="confirmpassword" 
                  name="confirmpassword" 
                  placeholder="Enter your Confirm Password"
                  value={formValues.confirmpassword}
                  onChange={handleChange}
                  />
              </div>
              <span>{formErr.confirmpassword}</span>

              <div className="checkbox">
                    <input type="checkbox" onClick={togglePasswordVisibility} />
                    <label > {showPassword ? "Hide Password" : "Show Password"}</label>
                </div>

              <div className="fields">
                  <button type="submit">Sign Up</button>
              </div>
              <div className="content-part">
                        <p>You  have an account <Link to="/">Login</Link></p>   
                    </div>
          </form>
       </div>
    </section>
  );
}

export default Signup;


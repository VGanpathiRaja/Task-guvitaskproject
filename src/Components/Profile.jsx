import { useEffect, useState } from "react";
import "./Style.css"
import axios from "axios";
import { Link } from "react-router-dom";

const Profile = () => {
    const initialValues = {
        preferName: "",
        fullName: "",
        mobileNumber: "",
        dob: "",
        aadharId: "",
        Age: "",
        Gender: "",
        Qualification: "",
        address: "",
        State: "",
        Country: ""
    };
    const [formValues, setFormValues] = useState(initialValues);
    const [formErr, setFormErr] = useState({});
    const [isSubmit, setSubmit] = useState(false);
    const [loginError, setLoginError] = useState(null);

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormValues({ ...formValues, [name]: value });
    };

    const handleSubmit = async (event) => { // Make the function asynchronous
        event.preventDefault();
    
        try {
            const res = await axios.post('http://localhost:5000/profile', {
                preferName: formValues.preferName,
                fullName: formValues.fullName,
                mobileNumber: formValues.mobileNumber,
                dob: formValues.dob,
                aadharId: formValues.aadharId,
                Age: formValues.Age,
                Gender: formValues.Gender,
                Qualification: formValues.Qualification,
                address: formValues.address,
                State: formValues.State,
                Country: formValues.Country
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
    }

    useEffect(() => {
        if (Object.keys(formErr).length === 0 && isSubmit) {
            console.log("No form errors");
        }
    }, [formErr, isSubmit]);

    const validate = (values) => {
        const errors = {};
        if (!values.preferName) {
            errors.preferName = "Please fill the preferred name";
        }
        if (!values.fullName) {
            errors.fullName = "Please fill the full name";
        }
        if (!values.mobileNumber) {
            errors.mobileNumber = "This field is mandatory so you must fill it.";
        }
        if (!values.dob) {
            errors.dob = "This field is mandatory so you must fill it.";
        }
        if (!values.Gender) {
            errors.Gender = "This field is mandatory so you must fill it.";
        }
        if (!values.Qualification) {
            errors.Qualification = "This field is mandatory so you must fill it.";
        }
        if (!values.aadharId) {
            errors.aadharId = "This field is mandatory so you must fill it.";
        }
        if (!values.address) {
            errors.address = "This field is mandatory so you must fill it.";
        }
        if (!values.State) {
            errors.State = "This field is mandatory so you must fill it.";
        }
        if (!values.Country) {
            errors.Country = "This field is mandatory so you must fill it.";
        }
        return errors;
    };

    return (
        <section className="form">
            <div className="form-part profile">
                <form action="/profile" method="POST" onSubmit={handleSubmit}>
                <div className="logout"> <Link to="/">Log out </Link> </div>
                    <h1>Profile Details</h1>
                    {Object.keys(formErr).length === 0 && isSubmit && (
                        <div className="success">Profile saved Successfully</div>
                    )}
                    <div className="fields">
                        <label htmlFor="preferName">Preferred Name</label><br />
                        <input
                            type="text"
                            id="preferName"
                            name="preferName"
                            placeholder="Enter your preferred Name"
                            value={formValues.preferName}
                            onChange={handleChange}
                        />
                       <br /> <span>{formErr.preferName}</span>
                    </div>

                    <div className="fields">
                        <label htmlFor="fullName">Full Name</label><br />
                        <input
                            type="text"
                            id="fullName"
                            name="fullName"
                            placeholder="Enter your preferred Full name"
                            value={formValues.fullName}
                            onChange={handleChange}
                        />
                       <br /> <span>{formErr.fullName}</span>
                    </div>

                    <div className="fields">
                        <label htmlFor="mobileNumber">Mobile Number</label><br />
                        <input
                            type="text"
                            id="mobileNumber"
                            name="mobileNumber"
                            placeholder="Enter your Mobile Number"
                            value={formValues.mobileNumber}
                            onChange={handleChange}
                        />
                       <br /> <span>{formErr.mobileNumber}</span>
                    </div>

                    <div className="fields dob-age">
                        <div className="dob">
                            <label htmlFor="dob">Date of Birth</label><br />
                            <input
                                type="date"
                                id="dob"
                                name="dob"
                                value={formValues.dob}
                                onChange={handleChange}
                            />
                            {/* <span>{formErr.dob}</span> */}
                        </div>

                        <div className="Age">
                            <label htmlFor="Age">Age</label><br />
                            <input
                                type="number"
                                id="Age"
                                name="Age"
                                value={formValues.Age}
                                onChange={handleChange}
                            />
                            {/* <span>{formErr.Age}</span> */}
                        </div>
                    </div>

                    <div className="fields gender">
                        <label>Gender</label><br /><br />
                        <input
                            type="radio"
                            id="male"
                            name="Gender"
                            value="male"
                            onChange={handleChange}
                        /><label htmlFor="male">Male</label>
                        <input
                            type="radio"
                            id="female"
                            name="Gender"
                            value="female"
                            onChange={handleChange}
                        /><label htmlFor="female">Female</label>
                        <input
                            type="radio"
                            id="others"
                            name="Gender"
                            value="others"
                            onChange={handleChange}
                        /><label htmlFor="others">Others</label>
                        {/* <span>{formErr.Gender}</span> */}
                    </div>

                    <div className="fields">
                        <label htmlFor="aadharId">Aadhaar Number</label><br />
                        <input
                            type="text"
                            id="aadharId"
                            name="aadharId"
                            placeholder="Enter your Aadhaar Number"
                            value={formValues.aadharId}
                            onChange={handleChange}
                        />
                        <br /><span>{formErr.aadharId}</span>
                    </div>

                    <div className="fields">
                        <label htmlFor="Qualification">Qualification</label><br />
                        <input
                            type="text"
                            id="Qualification"
                            name="Qualification"
                            placeholder="Enter your Qualification"
                            value={formValues.Qualification}
                            onChange={handleChange}
                        />
                       <br /> <span>{formErr.Qualification}</span>
                    </div>

                    <div className="fields">
                        <label htmlFor="address">Address</label><br />
                        <input
                            type="text"
                            id="address"
                            name="address"
                            placeholder="Enter your preferred address"
                            value={formValues.address}
                            onChange={handleChange}
                        />
                       <br /> <span>{formErr.address}</span>
                    </div>

                    <div className="fields dob-age">
                        <div className="dob">
                            <label htmlFor="State">State</label><br />
                            <input
                                type="text"
                                id="State"
                                name="State"
                                placeholder="Enter your State"
                                value={formValues.State}
                                onChange={handleChange}
                            />
                            {/* <span>{formErr.State}</span> */}
                        </div>

                        <div className="Age">
                            <label htmlFor="Country">Country</label><br />
                            <input
                                type="text"
                                id="Country"
                                name="Country"
                                placeholder="Enter your country"
                                value={formValues.Country}
                                onChange={handleChange}
                            />
                            {/* <span>{formErr.Country}</span> */}
                        </div>
                    </div>

                    <div>
                        <button type="submit" value="submit">Save Profile</button>
                    </div>
                </form>
            </div>
        </section>
    )
}

export default Profile;
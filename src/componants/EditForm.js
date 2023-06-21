import React, { useEffect, useState } from 'react'
import { Container } from 'react-bootstrap'
import axios from '../utils/axios'
import { toast, Toaster } from "react-hot-toast";
import { useFormik } from "formik";
import * as yup from 'yup'
import { editUser } from '../utils/Constants';
import { useNavigate } from 'react-router-dom';

const EditForm = ({ edit, user }) => {
    const navigate = useNavigate()

    const [email, setEmail] = useState("")
    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")
    const [location, setLocation] = useState("")
    const [mobile, setMobile] = useState("")
    const [gender, setGender] = useState("")
    const [profile, setProfile] = useState("")
    const [status, setStatus] = useState("")
    useEffect(() => {
        if (user) {
            setEmail(user.email);
            setFirstName(user.firstName);
            setLastName(user.lastName);
            setLocation(user.location);
            setMobile(user.mobile);
            setGender(user.gender);
            setProfile(user.profile);
            setStatus(user.status);
        }
    }, [user]);
    let handleRegister = (e) => {
        e.preventDefault()
        console.log(email);
        console.log(firstName);
        console.log(lastName);
        console.log(location);
        console.log(mobile);
        console.log(gender);
        console.log(profile);
        console.log(status);
        const id = user._id
        const userData = {
            email, firstName, lastName, mobile, location, profile, status, gender, id
        }

        axios.put(`${editUser}`, userData).then((response) => {
            navigate('/')
        }).catch((err) => {
            ((error) => {
                toast.error(error.response.data.msg, {
                    position: "top-center",
                });
            })(err);
        })
    }
    return (
        <Container>
            <div className='d-flex justify-content-center py-2 align-items-center'>
                <h2>
                    Edit Your Details
                </h2>
            </div>
            <div>
                <form className='shadow-lg p-3'>
                    <div className=' d-flex justify-content-center' >
                        <img className="custom-image rounded-circle" src={user?.profile} />
                    </div>
                    <div className="row mb-2">
                        <div className="col-12 col-sm-6">
                            <label>First name</label>
                            <input id="firstName" onChange={(e) => { setFirstName(e.target.value) }} value={firstName} name="firstName" type="text" className="outline-0 form-control custom-input" placeholder="Enter FirstName" />

                        </div>
                        <div className="col-12 col-sm-6">
                            <label>Last name</label>
                            <input id="lastName" onChange={(e) => { setLastName(e.target.value) }} value={lastName} name="lastName" type="text" className="outline-0 form-control custom-input" placeholder="Enter lastName" />

                        </div>
                    </div>

                    <div className="row mb-2">
                        <div className="col-12 col-sm-6">
                            <label>Email Address</label>
                            <input id="email" onChange={(e) => { setEmail(e.target.value) }} value={email} name="email" type="email" className="outline-0 form-control custom-input" placeholder="Enter Email" />

                        </div>
                        <div className="col-12 col-sm-6">
                            <label>Mobile</label>
                            <input id="mobile" onChange={(e) => { setMobile(e.target.value) }} value={mobile} name="mobile" type="number" className="outline-0 form-control custom-input" placeholder="Enter mobile" />

                        </div>
                    </div>

                    <div className="row mb-2">
                        <div className="col-12 col-sm-6">
                            <label>Select Your Gender</label><br />
                            <input type="radio" checked={gender === "male"} onChange={(e) => { setGender(e.target.value) }} className='me-1' id="male" name="gender" value="male" />
                            <label htmlFor="male">Male</label><br />
                            <input type="radio" checked={gender === "female"} onChange={(e) => { setGender(e.target.value) }} className='me-1' id="female" name="gender" value="female" />
                            <label htmlFor="female">Female</label><br />

                        </div>
                        <div className="col-12 col-sm-6">
                            <label htmlFor="cars">Select Your Status</label><br />
                            <select id="status" name="status" onChange={(e) => { setStatus(e.target.value) }} className='form-control custom-input' >
                                <option value="" disabled selected>
                                    {status}
                                </option>
                                <option value="active">Active</option>
                                <option value="inActive">InActive</option>
                            </select>


                        </div>
                    </div>

                    <div className="row mb-2">
                        
                        <div className="col-12 col-sm-6">
                            <label>Enter Your location</label><br />
                            <input onChange={(e) => { setLocation(e.target.value) }} value={location} id="location" name="location" type="text" className="outline-0 form-control custom-input" placeholder="Enter Your location" />
                        </div>
                    </div>
                    <button onClick={handleRegister} type='submit' size='md' className='mt-2 bg-danger form-control btn-outline-danger text-light' >Submit</button>
                </form>
            </div>
            <Toaster />
        </Container>

    )
}

export default EditForm

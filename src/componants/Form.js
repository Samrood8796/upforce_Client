import React from 'react'
import { Button, Col, Container, Row } from 'react-bootstrap'
import axios from '../utils/axios'
import { toast, Toaster } from "react-hot-toast";
import { useFormik } from "formik";
import * as yup from 'yup'
import { register } from '../utils/Constants';
import { useNavigate } from 'react-router-dom';

const Form = ({ edit }) => {
    const navigate = useNavigate()
    const initialValues = {
        firstName: '',
        lastName: '',
        mobile: '',
        email: '',
        status: '',
        profile: '',
        location: '',
        gender: '',
    }
    // console.log(initialValues);
    const SignUpSchema = yup.object({
        email: yup.string().email().required("Email Required"),
        firstName: yup.string().min(2).max(20).required('please enter your First Name '),
        lastName: yup.string().min(2).max(20).required('please enter your Last Name '),
        location: yup.string().min(4).max(20).required('please enter location '),
        mobile: yup.string().matches(/^\d{10}$/, 'Invalid phone number').required('Phone is required'),
        gender: yup.string().required('please enter your gender '),
        profile: yup.mixed().required('Please upload an image'),
        status: yup.string().required('Status is required'),
    })
    const { handleBlur, handleChange, setFieldValue, handleSubmit, values, errors, touched } = useFormik({
        initialValues: initialValues,
        validationSchema: SignUpSchema,
        onSubmit: (values, action) => {

            handleRegister(values)
            action.resetForm()
        }
    })

    let handleRegister = (user) => {
        console.log("dddddddddd");
        console.log(user);
        axios.post(register, user,
            {
                headers: {
                    'Content-Type': 'multipart/form-data',
                }
            }
        ).then((response) => {
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
                {
                    edit ?
                        <h2>
                            Edit Your Details
                        </h2> :
                        <h2>
                            Register Your Details
                        </h2>
                }
            </div>
            <div>
                <form className='shadow-lg p-3' onSubmit={handleSubmit}>
                    <div className=' d-flex justify-content-center' >
                        <img className="custom-image" src='https://cdn.pixabay.com/photo/2020/07/14/13/07/icon-5404125_1280.png' />
                    </div>
                    <div className="row mb-2">
                        <div className="col-12 col-sm-6">
                            <label>First name</label>
                            <input onChange={handleChange} onClick={handleBlur} value={values.firstName} id="firstName" name="firstName" type="text" className="outline-0 form-control custom-input" placeholder="Enter FirstName" />
                            {errors.firstName && touched.firstName ?
                                <p className="text-danger">{errors.firstName}</p> : null
                            }
                        </div>
                        <div className="col-12 col-sm-6">
                            <label>Last name</label>
                            <input onChange={handleChange} onClick={handleBlur} value={values.lastName} id="lastName" name="lastName" type="text" className="outline-0 form-control custom-input" placeholder="Enter lastName" />
                            {errors.lastName && touched.lastName ?
                                <p className="text-danger">{errors.lastName}</p> : null
                            }
                        </div>
                    </div>

                    <div className="row mb-2">
                        <div className="col-12 col-sm-6">
                            <label>Email Address</label>
                            <input onChange={handleChange} onClick={handleBlur} value={values.email} id="email" name="email" type="email" className="outline-0 form-control custom-input" placeholder="Enter Email" />
                            {errors.email && touched.email ?
                                <p className="text-danger">{errors.email}</p> : null
                            }
                        </div>
                        <div className="col-12 col-sm-6">
                            <label>Mobile</label>
                            <input onChange={handleChange} onClick={handleBlur} value={values.mobile} id="mobile" name="mobile" type="number" className="outline-0 form-control custom-input" placeholder="Enter mobile" />
                            {errors.mobile && touched.mobile ?
                                <p className="text-danger">{errors.mobile}</p> : null
                            }
                        </div>
                    </div>

                    <div className="row mb-2">
                        <div className="col-12 col-sm-6">
                            <label>Select Your Gender</label><br />
                            <input type="radio" onChange={handleChange} onBlur={handleBlur} checked={values.gender === 'male'} className='me-1' id="male" name="gender" value="male" />
                            <label htmlFor="male">Male</label><br />
                            <input type="radio" onChange={handleChange} onBlur={handleBlur} checked={values.gender === 'female'} className='me-1' id="female" name="gender" value="female" />
                            <label htmlFor="female">Female</label><br />
                            {errors.gender && touched.gender ? (
                                <p className="text-danger">{errors.gender}</p>
                            ) : null}
                        </div>
                        <div className="col-12 col-sm-6">
                            <label for="cars">Select Your Status</label><br />
                            <select id="status" name="status" onChange={handleChange} onBlur={handleBlur} value={values.status} className='form-control custom-input' >
                                <option value="" disabled>
                                    Select status
                                </option>
                                <option value="active">Active</option>
                                <option value="inActive">InActive</option>
                            </select>
                            {touched.status && errors.status && (
                                <p className='text-danger'>{errors.status}</p>
                            )}

                        </div>
                    </div>

                    <div className="row mb-2">
                        <div className="col-12 col-sm-6">
                            <label>Select your Profile</label><br />
                            <input type='file' className='form-control custom-input' id='profile' name='profile'
                                onChange={(event) =>
                                    setFieldValue('profile', event.currentTarget.files[0])} />
                            {errors.profile && touched.profile && (
                                <p className="text-danger">{errors.profile}</p>
                            )}
                        </div>
                        <div className="col-12 col-sm-6">
                            <label>Enter Your location</label><br />
                            <input onChange={handleChange} onClick={handleBlur} value={values.location} id="location" name="location" type="text" className="outline-0 form-control custom-input" placeholder="Enter Your location" />
                            {errors.location && touched.location ?
                                <p className="text-danger">{errors.location}</p> : null
                            }
                        </div>
                    </div>
                    <button type='submit' size='md' className='mt-2 bg-danger form-control btn-outline-danger text-light' >Submit</button>
                </form>
            </div>
            <Toaster />
        </Container>

    )
}

export default Form
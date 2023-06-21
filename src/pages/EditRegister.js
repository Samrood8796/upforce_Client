import React, { useEffect, useState } from 'react'
import { Container } from 'react-bootstrap'
import Form from '../componants/Form'
import Details from '../componants/Details'
import { useParams } from 'react-router-dom'
import axios from '../utils/axios'
import { getUser } from '../utils/Constants'
import EditForm from '../componants/EditForm'
const EditRegister = () => {
    const [user, setUser] = useState()
    const params = useParams()
    console.log(params.id);
    useEffect(() => {
        getUserDetails()
    }, [])
    const getUserDetails = async () => {
        try {
            const response = await axios.get(`${getUser}?id=${params.id}`);
            const data = response.data
            console.log(data)
            setUser(data)
        } catch (error) {
            console.error(error);
        }
    }
    return (
        <Container fluid className='my-2 vh-100'>
            <div className='bg-dark d-flex justify-content-center text-light py-2 align-items-center'>
                MERN stack developer practical task
            </div>
            <EditForm user={user} edit={true} />
        </Container>
    )
}

export default EditRegister 
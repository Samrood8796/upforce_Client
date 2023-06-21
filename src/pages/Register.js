import React from 'react'
import { Container } from 'react-bootstrap'
import Form from '../componants/Form'

const Register = () => {
    return (
        <Container fluid className='my-2 vh-100'>
            <div className='bg-dark d-flex justify-content-center text-light py-2 align-items-center'>
                MERN stack developer practical task
            </div>
                <Form edit={false}/>
        </Container>
    )
}

export default Register
import React, { useEffect, useState } from 'react'
import { Button, Container } from 'react-bootstrap'
import Table from '../componants/Table'
import { useNavigate } from 'react-router-dom'
import { SearchUser } from '../utils/Constants'
import axios from '../utils/axios'

const Home = () => {
    const navigate = useNavigate()
    const [users, setUsers] = useState(null)
    const [exportData, setExportData] = useState(false)

    const searchBy = (e) => {
        let key = e.target.value;
        if (key) {
            axios.get(`${SearchUser}/${key}`).then((response) => {
                setUsers(response.data)
            }).catch((error) => {
                console.log(error);
            })
        }
    }

    return (
        <Container fluid className='my-2 vh-100'>
            <div className='bg-dark d-flex justify-content-center text-light py-2 align-items-center'>
                MERN stack developer practical task
            </div>
            <Container>
                <div className=' my-5 d-flex flex-column flex-sm-row justify-content-between'>
                    <div className='d-flex align-items-center'>
                        <input onChange={(e) => searchBy(e)} className='me-1 form-control custom-input' type='text' placeholder='Search....' />
                        <Button size='' className='bg-danger btn-outline-danger text-light' type="submit">Search</Button>
                    </div>
                    <div className='pt-3 p-sm-0'>
                        <Button onClick={() => { navigate('/register') }} size='sm' className='mx-2 bg-danger btn-outline-danger text-light '>+ Add User</Button>
                        <Button onClick={() => setExportData(true)} size='sm' className='bg-danger btn-outline-danger text-light'>Export to csv</Button>
                    </div>
                </div>
                <Table searchUsers={users} exportData={exportData} setExportData={setExportData}/>
            </Container>
        </Container>
    )
}

export default Home
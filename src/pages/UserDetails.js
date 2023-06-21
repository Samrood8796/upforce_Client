import React, { useEffect, useState } from 'react'
import { Container } from 'react-bootstrap'
import Details from '../componants/Details'
import { useParams } from 'react-router-dom'
import axios from '../utils/axios'
import { getUser } from '../utils/Constants'
const UserDetails = () => {
  const [user, setUser] = useState()
  const params = useParams()
  console.log(params.id);
  useEffect(()=>{
    getUserDetails()
  },[])
  const getUserDetails =async ()=>{
    try {
      const response = await axios.get(`${getUser}?id=${params.id}`);
      const data = response.data
      console.log("data=========");
      console.log(data);
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
      <Container className=' align-items-center d-flex flex-column'>
       <Details user={user}/>
      </Container>
    </Container>
  )
}

export default UserDetails
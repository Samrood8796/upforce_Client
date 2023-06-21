import React, { useState } from 'react'
import { Button } from 'react-bootstrap';
import { CiMenuKebab } from 'react-icons/ci'
import { AiFillEye } from 'react-icons/ai'
import { BiEdit } from 'react-icons/bi'
import { AiFillDelete } from 'react-icons/ai'
import { AiOutlineDown } from 'react-icons/ai'
import { useNavigate } from 'react-router-dom';
import { deleteUser } from '../utils/Constants';
import { changeStatus } from '../utils/Constants';
import { toast, Toaster } from "react-hot-toast";
import axios from '../utils/axios';
const TableRow = ({ users, setRender, render }) => {
    const [showMenu, setShowMenu] = useState(false)
    const [showStatus, setShowStatus] = useState(false)
    const navigate = useNavigate()

    const removeUser = (id) => {
        console.log("id");
        console.log(id);
        axios.delete(`${deleteUser}/${id}`).then((response) => {
            toast.success(response.data, {
                position: "top-center",
            });
            setRender(!render)
        })
    }
    const handleStatus = (id, status) => {
        axios.put(`${changeStatus}`, { id, status }).then((response) => {
            console.log(response);
            setShowStatus(false)
            toast.success(response.data, {
                position: "top-center",
            });
            setRender(!render)
        })
    }
    return (
        users?.length >= 1 &&
        users?.map((user, index) => (
            <>
                <tr>
                    <th scope="row">{index + 1}</th>
                    <td>{user.firstName}</td>
                    <td>{user.email}</td>
                    <td>{user.gender}</td>
                    <td>
                        <div className='position-relative'>
                            {showStatus === (index + 1) ?
                                <Button onClick={() => setShowStatus(false)} className=' bg-danger w-auto text-white' size='sm'>{user.status} <AiOutlineDown /> </Button>
                                :
                                <Button onClick={() => setShowStatus(index + 1)} className=' bg-danger w-auto text-white' size='sm'>{user.status} <AiOutlineDown /> </Button>
                            }

                            {showStatus === (index + 1) &&
                                <div className='rounded border bg-white w-auto z-index-100 p-2 position-absolute '>
                                    <div onClick={() => handleStatus(user._id, "Active")} value="Active" className='d-flex text-dark my-1'>Active</div>
                                    <div onClick={() => handleStatus(user._id, "InActive")} className='d-flex lh-3 text-dark '>InActive</div>
                                </div>
                            }
                        </div>
                    </td>
                    <td>
                        <img className="sm-image rounded-circle" src={user.profile} />
                    </td>
                    <td>
                        <div className='position-relative'>
                            {showMenu === (index + 1) ?
                                <div onClick={() => setShowMenu(false)}><CiMenuKebab /> </div> :
                                <div onClick={() => setShowMenu(index + 1)}><CiMenuKebab /> </div>
                            }
                            {showMenu === (index + 1) &&
                                <div className='rounded border z-index-100 bg-white w-auto px-2 position-absolute '>
                                    <div onClick={() => navigate(`/user-details/${user._id}`)} className='d-flex'><div className='me-1 text-success'> <AiFillEye /></div> <p className='d-none d-md-block'>view</p></div>
                                    <div onClick={() => navigate(`/edit-register/${user._id}`)} className='d-flex lh-1 '><div className='me-1 text-primary'> <BiEdit /></div><p className='d-none d-md-block'>edit</p></div>
                                    <div onClick={() => removeUser(user._id)} className='d-flex lh-1 '><div className='me-1 text-danger'> <AiFillDelete /></div> <p className='d-none d-md-block'>delete</p></div>
                                </div>
                            }
                        </div>
                    </td>
                </tr>
                <Toaster />
            </>
        ))

    )
}

export default TableRow
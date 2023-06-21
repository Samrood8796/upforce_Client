import React, { useEffect, useState } from 'react';

import { AiOutlineArrowRight } from 'react-icons/ai'
import { AiOutlineArrowLeft } from 'react-icons/ai'
import TableRow from './TableRow';
import { fetchUsers } from '../utils/Constants'
import axios from '../utils/axios'
import { CSVLink } from 'react-csv';

const Table = ({ searchUsers, exportData, setExportData }) => {
    const [users, setUsers] = useState([])
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const [render, setRender] = useState(false);

    useEffect(() => {
        if (searchUsers) {
            setUsers(searchUsers)
        } else {
            updatePagination();
        }
    }, [currentPage, searchUsers, render]);

    const updatePagination = async () => {
        const data = await fetchData(currentPage);
        console.log("data");
        console.log(data);
        if(data.users.length == 0){
            console.log(data.users.length);
            return;
        }
        setUsers(data?.users);
        setTotalPages(data?.totalPages);
        setCurrentPage(data?.currentPage);
    };
    const disablePreviousButton = currentPage === 1;
    const disableNextButton = currentPage === totalPages;

    const fetchData = async (page = 1, limit = 3) => {
        try {
            const response = await axios.get(`${fetchUsers}?page=${page}&limit=${limit}`);
            const data = await response.data
            return data;
        } catch (error) {
            console.error(error);
        }
    };
    return (
        <>
            {
                exportData &&
                <CSVLink onClick={() => setExportData(false)} data={users} >
                    Download
                </CSVLink>
            }
            <div class="shadow-lg table-responsive">
                <table className="table  ">
                    <thead className="table-dark">
                        <tr>
                            <th scope="col">ID</th>
                            <th scope="col">Full Name</th>
                            <th scope="col">Email</th>
                            <th scope="col">Gender</th>
                            <th scope="col">Status</th>
                            <th scope="col">profilePic</th>
                            <th scope="col">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        <TableRow users={users} render={render} setRender={setRender} />
                    </tbody>
                </table>
                <nav aria-label="Page navigation example ">
                    <ul className="pagination justify-content-end p-2">
                        {
                            disablePreviousButton ?
                                <li className="page-item disabled" >
                                    <a className="page-link" tabindex="-1"><AiOutlineArrowLeft /></a>
                                </li>
                                :
                                <li className="page-item " onClick={() => setCurrentPage(currentPage - 1)}>
                                    <a className="page-link" tabindex="-1"><AiOutlineArrowLeft /></a>
                                </li>
                        }
                        <li className="page-item"><a class="page-link text-white bg-danger" >1</a></li>

                        {
                            disableNextButton ?
                                <li className="page-item disabled">
                                    <a className="page-link" ><AiOutlineArrowRight /></a>
                                </li> :
                                <li className="page-item" onClick={() => setCurrentPage(currentPage + 1)}>
                                    <a className="page-link" ><AiOutlineArrowRight /></a>
                                </li>
                        }
                    </ul>
                </nav>

            </div>
        </>
    );
};
export default Table;
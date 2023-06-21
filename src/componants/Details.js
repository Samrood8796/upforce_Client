import React from 'react'

const Details = ({ user }) => {
    return (
        <>
            <div className='d-flex justify-content-center py-2 align-items-center'>
                <h2>
                    Your Details
                </h2>
            </div>
            <div className='main'>
                {user &&
                    <div className='shadow-lg p-3'>
                        <div className=' d-flex justify-content-center' >
                            <img className=" rounded-circle custom-image" src={user?.profile} />
                        </div>
                        <div className="row mb-2">
                            <div className="col-12 col-sm-6 ">
                                <label >First name:</label>
                                <p className="form-control custom-input" >{user?.firstName}</p>
                            </div>
                            <div class="col-12 col-sm-6">
                                <label>Last name: </label>
                                <p className="form-control custom-input" >{user?.lastName}</p>
                            </div>
                        </div>

                        <div className="row mb-2">
                            <div className="col-12 col-sm-6 ">
                                <label>Email :</label>
                                <p className="form-control custom-input">{user?.email}</p>
                            </div>
                            <div class="col-12 col-sm-6">
                                <label>Mobile :</label>
                                <p className="form-control text-wrap custom-input" >{user?.mobile}</p>
                            </div>
                        </div>

                        <div className="row mb-2">
                            <div className="col-12 col-sm-6 ">
                                <label>Gender :</label><br />
                                <p className="form-control custom-input" >{user?.gender}</p>

                            </div>
                            <div class="col-12 col-sm-6">
                                <label for="cars">Status :</label><br />
                                <p className="form-control custom-input" >{user?.status}</p>
                            </div>
                        </div>


                        <div className="row mb-2">
                            <div class="col-12">
                                <label>Enter Your location</label><br />
                                <p className="form-control custom-input" >{user?.location}</p>
                            </div>
                        </div>
                    </div>
                }
            </div>
        </>
    )
}

export default Details
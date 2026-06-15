import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { searchStudentsApiCall } from '../redux/StudentSlice'
import { useParams } from 'react-router-dom'

const SearchingStudentInfo = () => {

    const { keyword } = useParams();
    const { searchedData, loading } = useSelector((state) => state.studentData);
    const dispatch = useDispatch();

    useEffect(() => {

        dispatch(searchStudentsApiCall(keyword))

    }, [keyword])

    return (
        <div className="container mt-4">

            <h2 className="text-center mb-4">
                Search Results
            </h2>

            <div className="row">

                {
                    searchedData?.length > 0 ?

                        searchedData.map((student) => (

                            <div
                                key={student.sid}
                                className="col-md-6 mb-4"
                            >

                                <div className="card h-100 shadow">

                                    <div className="card-body">

                                        <h5 className="card-title text-primary">
                                            {student.sname}
                                        </h5>

                                        <hr />

                                        <p>
                                            <strong>ID:</strong> {student.sid}
                                        </p>

                                        <p>
                                            <strong>Email:</strong> {student.semail}
                                        </p>

                                        <p>
                                            <strong>Fee:</strong> ₹{student.sfee}
                                        </p>

                                        <p>
                                            <strong>Course:</strong> {student.scourse}
                                        </p>

                                        <p>
                                            <strong>Address:</strong> {student.saddress}
                                        </p>

                                    </div>

                                </div>

                            </div>

                        ))

                        :

                        <div className="col-12">
                            <div className="alert alert-danger text-center">
                                No Students Found
                            </div>
                        </div>
                }

            </div>

        </div>
    )
}

export default SearchingStudentInfo
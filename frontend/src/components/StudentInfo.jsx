import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllStudentsApiCall, deleteStudentApiCal } from '../redux/StudentSlice';
import { useNavigate } from 'react-router-dom';

const StudentInfo = () => {

    const { studentList, loading, error } = useSelector((state) => state.studentData);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    // Calling get All Student Api Call
    useEffect(() => {

        if (loading === false) {
            dispatch(getAllStudentsApiCall());
        }

    }, [dispatch]);

    // calling Delete Student Api Call
    const deleteStudent = async (id) => {

        await dispatch(deleteStudentApiCal(id))
    }

    // Navigate Edit page
    const updateStudent = (id) => {

        navigate(`/edit/${id}`)
    }

    return (

        <React.Fragment>
            {
                studentList.length > 0 ?

                    <div className="container mt-4">

                        <h2 className="page-title">Student Records</h2>

                        <div className="table-responsive">

                            <table className="table table-striped table-hover table-bordered shadow student-table">

                                <thead>

                                    <tr>

                                        <th>ID</th>
                                        <th>Name</th>
                                        <th>Email</th>
                                        <th>Fee</th>
                                        <th>Course</th>
                                        <th>Address</th>
                                        <th>Edit Student</th>
                                        <th>Delete Student</th>

                                    </tr>

                                </thead>

                                <tbody>
                                    {

                                        studentList.map((item, index) =>

                                            <tr key={index}>

                                                <td className="action-column">{item.sid}</td>
                                                <td className="action-column">{item.sname}</td>
                                                <td className="action-column">{item.semail}</td>
                                                <td className="action-column">₹{item.sfee}</td>
                                                <td className="action-column">{item.scourse}</td>
                                                <td className="action-column">{item.saddress}</td>

                                                <td className="action-column">
                                                    <button onClick={() => updateStudent(item.sid)} className='btn btn-warning btn-sm me-2'>

                                                        <i className="bi bi-pencil-square me-1"></i>

                                                        Edit
                                                    </button>
                                                </td>

                                                <td className="action-column">
                                                    <button onClick={() => deleteStudent(item.sid)} className='btn btn-danger btn-sm'>

                                                        <i className="bi bi-trash-fill me-1"></i>
                                                        Delete
                                                    </button>
                                                </td>

                                            </tr>

                                        )
                                    }
                                </tbody>

                            </table>
                        </div>
                    </div>

                    : <div className="alert alert-warning text-center"> No Students Found </div>

            }

        </React.Fragment >
    )
}

export default StudentInfo
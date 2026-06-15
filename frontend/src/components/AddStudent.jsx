import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addStudentApiCall } from '../redux/StudentSlice'
import { useNavigate } from 'react-router-dom';

const AddStudent = () => {

    const { studentList, loading, error } = useSelector((state) => state.studentData);
    const [studentInfo, setStudnetInfo] = useState({ sname: "", sfee: "", scourse: "", saddress: "" });
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleInput = (event) => {
        setStudnetInfo({
            ...studentInfo,
            [event.target.name]: event.target.value
        })
    }

    const handleSubmit = async (event) => {

        event.preventDefault();
        await dispatch(addStudentApiCall(studentInfo));

        setStudnetInfo({ sname: "", semail: "", sfee: "", scourse: "", saddress: "" });

        navigate("/all");
    }

    return (
        <React.Fragment>
            <div className="container">

                <div className="student-form-card">

                    <h3 className="text-center mb-4">
                        Add Student
                    </h3>

                    <form onSubmit={handleSubmit}>

                        <div className="mb-3">
                            <input
                                type="text"
                                className="form-control"
                                name="sname"
                                value={studentInfo.sname}
                                onChange={handleInput}
                                placeholder="Enter Student Name"
                            />
                        </div>

                        <div className="mb-3">
                            <input
                                type="email"
                                className="form-control"
                                name="semail"
                                value={studentInfo.semail}
                                onChange={handleInput}
                                placeholder="Enter Student Email"
                            />
                        </div>

                        <div className="mb-3">
                            <input
                                type="number"
                                className="form-control"
                                name="sfee"
                                value={studentInfo.sfee}
                                onChange={handleInput}
                                placeholder="Enter Student Fee"
                            />
                        </div>

                        <div className="mb-3">
                            <input
                                type="text"
                                className="form-control"
                                name="scourse"
                                value={studentInfo.scourse}
                                onChange={handleInput}
                                placeholder="Enter Course"
                            />
                        </div>

                        <div className="mb-3">
                            <textarea
                                className="form-control"
                                rows="3"
                                name="saddress"
                                value={studentInfo.saddress}
                                onChange={handleInput}
                                placeholder="Enter Address"
                            />
                        </div>

                        <button className="btn btn-success w-100">
                            Add Student
                        </button>

                    </form>

                </div>

            </div>
        </React.Fragment>
    )
}

export default AddStudent
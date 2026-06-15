import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { updateStudentApical } from "../redux/StudentSlice"
import { useNavigate } from 'react-router-dom';

const EditStudent = ({ id }) => {

    const [formData, setFormData] = useState({ sname: "", semail: "", sfee: "", scourse: "", saddress: "" });
    const { studentList } = useSelector((state) => state.studentData);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {

        if (studentList.length > 0) {

            const updateStudent = studentList.find((item) => {
                return item.sid == id
            });

            setFormData({ ...updateStudent });
        }

    }, [studentList, id])

    const handleInput = (event) => {

        setFormData({
            ...formData,
            [event.target.name]: event.target.value
        })
    }

    const handleSubmit = async (event) => {

        event.preventDefault(updateStudentApical());
        await dispatch(updateStudentApical(formData));

        setFormData({ sname: "", semail: "", sfee: "", scourse: "", saddress: "" })

        navigate("/all")
    }

    return (
        <React.Fragment>
            <div className="container">

                <div className="student-form-card">

                    <h3 className="text-center mb-4">
                        Update Student
                    </h3>

                    <form onSubmit={handleSubmit}>

                        <div className="mb-3">
                            <input
                                type="text"
                                className="form-control"
                                name="sname"
                                value={formData.sname}
                                onChange={handleInput}
                                placeholder="Enter Student Name"
                            />
                        </div>

                        <div className="mb-3">
                            <input
                                type="email"
                                className="form-control"
                                name="semail"
                                value={formData.semail}
                                onChange={handleInput}
                                placeholder="Enter Student Email"
                            />
                        </div>

                        <div className="mb-3">
                            <input
                                type="number"
                                className="form-control"
                                name="sfee"
                                value={formData.sfee}
                                onChange={handleInput}
                                placeholder="Enter Student Fee"
                            />
                        </div>

                        <div className="mb-3">
                            <input
                                type="text"
                                className="form-control"
                                name="scourse"
                                value={formData.scourse}
                                onChange={handleInput}
                                placeholder="Enter Course"
                            />
                        </div>

                        <div className="mb-3">
                            <textarea
                                className="form-control"
                                rows="3"
                                name="saddress"
                                value={formData.saddress}
                                onChange={handleInput}
                                placeholder="Enter Address"
                            />
                        </div>

                        <button className="btn btn-success w-100">
                            Update Student
                        </button>

                    </form>

                </div>

            </div>
        </React.Fragment>
    )
}

export default EditStudent
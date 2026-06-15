import React, { useState } from 'react';
import '../css/Header.css';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import { searchStudentsApiCall } from '../redux/StudentSlice'
import { keyboard } from '@testing-library/user-event/dist/keyboard';

const Header = () => {

    const [keyword, setKeyword] = useState("");
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleSearchBar = (event) => {

        setKeyword(event.target.value);
    }

    const handleSearchButton = async () => {

        if (keyword.trim() === "") {

            toast.error("Enter Student");
            return;
        }

        const resultAction = await dispatch(searchStudentsApiCall(keyword));

        if (searchStudentsApiCall.fulfilled.match(resultAction)) {

            navigate(`/search/${keyword}`);
        }
    }

    return (
        <React.Fragment>
            <div>

                <nav className="navbar navbar-dark bg-primary px-4">

                    <h2 className="title-heading text-center">
                        Student Management System
                    </h2>

                </nav>

                <div className="d-flex justify-content-center align-items-center gap-5 my-4">

                    <div className="search-container">

                        <div className="input-group search-group">

                            <span className="input-group-text bg-white border-0">
                                <i className="bi bi-search"></i>
                            </span>

                            <input
                                type="text"
                                className="form-control border-0"
                                placeholder="Search by Name, Email or Course"
                                onChange={handleSearchBar}

                            />

                            <button className="btn btn-primary search-btn" onClick={handleSearchButton}>
                                Search
                            </button>

                        </div>

                    </div>

                    <div className="d-flex justify-content-center gap-4 mt-4">

                        <a href="/all" className="btn btn-outline-primary">

                            <i className="bi bi-people-fill me-2"></i>

                            All Students

                        </a>

                        <a href="/add" className="btn btn-outline-success">

                            <i className="bi bi-person-plus-fill me-2"></i>

                            Add Student

                        </a>

                    </div>

                </div>

            </div>

        </React.Fragment >
    )
}

export default Header
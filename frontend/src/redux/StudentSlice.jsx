import React from 'react';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { toast } from 'react-toastify';

//For get all Students information
export const getAllStudentsApiCall = createAsyncThunk(

    "student",
    async (id = null, { rejectWithValue }) => {

        try {

            const url = "http://localhost:8080/students";

            const response = await axios.get(url);

            toast.success("Data Fetching Successfuly.");

            return response.data;

        } catch (error) {
            const message = error.response?.data || error.message;

            toast.error("Database Connection Fails.")

            return rejectWithValue(message);
        }
    })

// Searching Student By Id
export const searchStudentsApiCall = createAsyncThunk(

    "search students",
    async (keyword, { rejectWithValue }) => {

        try {

            const url = `http://localhost:8080/students/search?keyword=${keyword}`;
            const response = await axios.get(url);

            toast.success(`searching Student Successfuly.`);

            return response.data;

        } catch (error) {

            const message = error.response?.data || error.message;
            toast.error(message);

            return rejectWithValue(message);
        }
    })

// Adding Student to DataBase
export const addStudentApiCall = createAsyncThunk(

    "students/add",
    async (studentData, { rejectWithValue }) => {

        try {

            const url = `http://localhost:8080/students`;
            const response = await axios.post(url, studentData);

            toast.success("Student Add Succesfuly.")

            return response.data;

        } catch (error) {

            const message = error.response?.data || error.message;
            toast.error(message);

            return rejectWithValue(message);
        }
    }
)

//updateing Student data
export const updateStudentApical = createAsyncThunk(

    "student/update",
    async (editedStudentData, { rejectWithValue }) => {

        try {

            const url = `http://localhost:8080/students/${editedStudentData.sid}`;
            const response = await axios.patch(url, editedStudentData);

            toast.success(`${editedStudentData.sid} Student updated.`);

            return response.data;

        } catch (error) {

            const message = error.response?.data || error.message;
            toast.error(message);

            return rejectWithValue(message);
        }
    }
)

// Delete student data with help of id
export const deleteStudentApiCal = createAsyncThunk(

    "student/delete",
    async (id, { rejectWithValue }) => {

        try {

            const url = `http://localhost:8080/students/${id}`;
            const response = await axios.delete(url);

            toast.success(`${id} student deleted.`);

            return id;

        } catch (error) {

            const message = error.response?.data || error.message;
            toast.error(message);

            return rejectWithValue(message);
        }
    }
)

const initialState = {

    studentList: [],
    loading: false,
    error: "",
    searchedData: null
}

const StudentSlice = createSlice({

    name: "studentData",

    initialState,

    reducers: {

    },

    extraReducers: (builder) => {
        builder

            //Store all Student information into studnetList
            .addCase(getAllStudentsApiCall.fulfilled, (state, action) => {

                state.studentList = action.payload;
                state.loading = false;
            })

            .addCase(getAllStudentsApiCall.rejected, (state, action) => {

                state.loading = false;
                state.error = action.payload;
            })

            // searching student data into studentList
            .addCase(searchStudentsApiCall.fulfilled, (state, action) => {

                state.searchedData = action.payload;
                state.loading = false;
            })

            .addCase(searchStudentsApiCall.rejected, (state, action) => {

                state.loading = false;
                state.error = action.payload;
            })

            // Adding new student data into studentList
            .addCase(addStudentApiCall.fulfilled, (state, action) => {

                state.studentList.push(action.payload);
                state.loading = false;
            })

            .addCase(addStudentApiCall.rejected, (state, action) => {

                state.loading = false;
                state.error = action.payload;
            })

            // update student data in a studentList
            .addCase(updateStudentApical.fulfilled, (state, action) => {

                const updatedStudentList = state.studentList.map((item) => {

                    if (item.sid === action.payload.sid) {
                        return action.payload;
                    }

                    return item;
                })

                state.studentList = updatedStudentList;
                state.loading = false;
            })

            .addCase(updateStudentApical.rejected, (state, action) => {

                state.loading = false;
                state.error = action.payload;
            })

            // delete student data in a studentList
            .addCase(deleteStudentApiCal.fulfilled, (state, action) => {

                const remainingStudents = state.studentList.filter((item) => {
                    return item.sid != action.payload;
                })

                state.studentList = remainingStudents;
                state.loading = false;
            })

            .addCase(deleteStudentApiCal.rejected, (state, action) => {

                state.loading = false;
                state.error = action.payload;
            })

    }
})

export default StudentSlice.reducer;
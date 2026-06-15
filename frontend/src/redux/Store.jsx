import React from 'react'
import StudentReducer from './StudentSlice';
import { configureStore } from '@reduxjs/toolkit';

const Store = configureStore({

    reducer: {
        studentData: StudentReducer
    }
})

export default Store
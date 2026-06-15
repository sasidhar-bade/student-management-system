import React, { createContext, useContext } from 'react';
import HomePage from './pages/HomePage';
import AddStudentPage from './pages/AddStudentPage';
import EditStudentPage from './pages/EditStudentPage';
import SearchingStudentPage from './pages/SearchingStudentPage';
import { BrowserRouter, Route, Routes } from 'react-router-dom'

function App() {

  const singleStudent = createContext();

  return (

    <React.Fragment>

      <BrowserRouter>
        <Routes>

          <Route path='*' element={<HomePage />} />
          <Route path='/all' element={<HomePage />} />
          <Route path='/add' element={<AddStudentPage />} />
          <Route path='/edit/:id' element={<EditStudentPage />} />
          <Route path='/search/:keyword' element={<SearchingStudentPage />} />

        </Routes>
      </BrowserRouter>

    </React.Fragment>
  );
}

export default App;

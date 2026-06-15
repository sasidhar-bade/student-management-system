import React from 'react'
import Header from '../components/Header'
import SearchingStudentInfo from '../components/SearchingStudentInfo'
import { useParams } from 'react-router-dom'
import Footer from '../components/Footer'

const SearchingStudentPage = () => {

    return (

        <React.Fragment>

            <Header />
            <SearchingStudentInfo />
            <Footer />
        </React.Fragment>
    )
}

export default SearchingStudentPage
import React from 'react'
import Header from '../components/Header'
import EditStudent from '../components/EditStudent'
import { useParams } from 'react-router-dom'
import Footer from '../components/Footer'

const EditStudentPage = () => {

    const { id } = useParams();

    return (
        <React.Fragment>
            <Header />
            <EditStudent id={id} />
            <Footer />
        </React.Fragment>
    )
}

export default EditStudentPage
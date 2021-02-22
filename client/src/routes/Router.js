import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import AppNavbar from '../components/AppNavbar';

const MyRouter = () => {
    return(
        <>
            <AppNavbar></AppNavbar>
            <Header></Header>
            <h1>Hello Body</h1>
            <Footer></Footer>
        </>
    )
};

export default MyRouter
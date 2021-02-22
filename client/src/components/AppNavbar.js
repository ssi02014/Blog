import React from 'react';
import { Collapse, Container, Navbar, NavbarToggler, Nav } from 'reactstrap';
import { Link } from 'react-router-dom';
import LoginModal from './auth/LoginModal';

const AppNavbar = () => {
    return (
        <>
            <Navbar color="dark" expand="lg" className="sticky-top">
                <Container>
                    <Link to="/" className="text-white text-decoration-none">
                        Minjae's Side Project
                    </Link>
                    <NavbarToggler />
                    <Collapse isOpen navbar>
                        <Nav className="ml-auto d-flex justify-content-around" navbar>
                            {true ? 
                            <LoginModal></LoginModal>
                            : 
                            <h1 className="text-white">GuestLink</h1>}
                        </Nav>
                    </Collapse>
                </Container>
            </Navbar>
        </>
    );
};

export default AppNavbar;
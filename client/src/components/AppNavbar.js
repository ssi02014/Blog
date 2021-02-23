import React, { useCallback, useEffect, useState } from 'react';
import { Collapse, Container, Navbar, NavbarToggler, Nav } from 'reactstrap';
import { Link } from 'react-router-dom';
import LoginModal from './auth/LoginModal';
import { useDispatch, useSelector } from 'react-redux';
import { LOGOUT_REQUEST } from '../redux/types';

const AppNavbar = () => {
    const [isOpen, setIsOpen] = useState("false");
    const { isAuthenticated, user, userRole } = useSelector(state => state.auth);
    console.log(userRole, "UserRole");

    const dispatch = useDispatch();

    const onLogout = useCallback(() => {
        dispatch({
            type: LOGOUT_REQUEST
        });
    }, [dispatch]);

    useEffect(() => {
        setIsOpen(false);
    }, [user]);

    const handleToggle = () => {
        setIsOpen(!isOpen);
    }

    return (
        <>
            <Navbar color="dark" expand="lg" className="sticky-top">
                <Container>
                    <Link to="/" className="text-white text-decoration-none">
                        Minjae's Side Project
                    </Link>
                    <NavbarToggler onClick={handleToggle} />
                    <Collapse isOpen={isOpen} navbar>
                        <Nav className="ml-auto d-flex justify-content-around" navbar>
                            {isAuthenticated ? 
                            <h1 className="text-white">AuthLink</h1>
                            : 
                            <LoginModal></LoginModal>}
                        </Nav>
                    </Collapse>
                </Container>
            </Navbar>
        </>
    );
};

export default AppNavbar;
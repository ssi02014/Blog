import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Alert, Button, Form, FormGroup, Input, Label, Modal, ModalBody, ModalHeader, NavLink } from 'reactstrap';
import { CLEAR_ERROR_REQUEST, REGISTER_REQUEST } from '../../redux/types';

const RegisterModal = () => {
    const [modal, setModal] = useState(false);
    const [localMsg, setLocalMsg] = useState("");
    const [formValues, setFormValues] = useState({
        name: "",
        email: "",
        password: "",
    });

    const { errorMsg } = useSelector(state => state.auth);
    const dispatch = useDispatch();

    useEffect(() => {
        try {
            setLocalMsg(errorMsg);
        } catch (e) {
            console.error(e);
        }
    }, [errorMsg]);

    const handleToggle = () => {
        dispatch({
            type: CLEAR_ERROR_REQUEST
        });
        setModal(!modal);
    }

    const onChange = e => {
        setFormValues({
            ...formValues,
            [e.target.name] : e.target.value,
        })
    }

    const onSubmit = e => {
        const {name, email, password } = formValues;
        const newUser = { name, email, password };

        e.preventDefault();

        console.log(newUser, 'newUser');

        dispatch({
            type: REGISTER_REQUEST,
            payload: newUser,
        })
    }

    return (
        <div>
            <NavLink onClick={handleToggle} href="#" style={{color:"#fff"}}>
                Register
            </NavLink>
            <Modal isOpen={modal} toggle={handleToggle}>
                <ModalHeader toggle={handleToggle}>Register</ModalHeader>
                <ModalBody>
                    {localMsg ? <Alert color="danger"></Alert>
                    :
                    null}
                </ModalBody>
                <Form onSubmit={onSubmit} style={{ padding: "0 20px 20px 20px"}}>
                    <FormGroup>
                        <Label for="name">Name</Label>
                        <Input
                            type="text"
                            name="name"
                            id="name"
                            placeholder="Name"
                            onChange={onChange}
                        />
                        <Label for="email">Email</Label>
                        <Input
                            type="email"
                            name="email"
                            id="email"
                            placeholder="Email"
                            onChange={onChange}
                        />
                        <Label for="password">Password</Label>
                        <Input
                            type="password"
                            name="password"
                            id="password"
                            placeholder="Password"
                            onChange={onChange}
                        />
                        <Button color="dark" className="mt-3" block>Register</Button>
                    </FormGroup>
                </Form>
            </Modal>
        </div>
    );
};

export default RegisterModal;
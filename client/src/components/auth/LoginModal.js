import React, { useEffect, useState } from 'react';
import { 
    Alert, 
    Button, 
    Form, 
    FormGroup, 
    Input, 
    Label, 
    Modal, 
    ModalBody, 
    ModalHeader, 
    NavLink 
} from 'reactstrap';
import { useDispatch, useSelector } from 'react-redux';
import { CLEAR_ERROR_REQUEST, LOGIN_REQUEST } from '../../redux/types';

const LoginModal = () => {
    const [modal, setModal] = useState(false);
    const [localMsg, setLocalMsg] = useState('');
    const [formValues, setFormValues] = useState({
        email: "",
        password: "",
    });

    const dispatch = useDispatch();
    const { errorMsg } = useSelector(state => state.auth);

    useEffect(() => {
        try {
            setLocalMsg(errorMsg);
        } catch(e) {
            console.log(e);
        }
    }, [errorMsg]);

    const handleToggle = () => {
        dispatch({
            type: CLEAR_ERROR_REQUEST,
        })
        setModal(!modal);
    };

    const onChange = e => {
        setFormValues({
            ...formValues,
            [e.target.name]: e.target.value,
        })
    };

    const onSubmit = e => {
        e.preventDefault();
        const { email, password } = formValues;
        
        const user = { email, password };
        console.log(user);
        dispatch({
            type: LOGIN_REQUEST,
            payload: user,
        })
    }

    return (
        <div>
            <NavLink onClick={handleToggle} href="#" style={{ color: '#fff' }}>
                Login
            </NavLink>
            <Modal isOpen={modal} toggle={handleToggle}>
                <ModalHeader toggle={handleToggle}>
                    Login
                </ModalHeader>
                <ModalBody>
                    {localMsg ? 
                        <Alert color="danger">{localMsg}</Alert> : null}
                </ModalBody>
                <Form 
                    style={{ padding: '0 20px 20px 20px'}}
                    onSubmit={onSubmit}
                >
                    <FormGroup>
                        <Label for="eamil">Email</Label>
                        <Input 
                            type="email"
                            name="email"
                            id="email"
                            placeholder="Email"
                            onChange={onChange}
                        />
                        
                        <Label for="eamil">Password</Label>
                        <Input 
                            type="password"
                            name="password"
                            id="password"
                            placeholder="Password"
                            onChange={onChange}
                        />
                        <Button 
                            color="dark"
                            style={{ width: "100%", marginTop: "20px" }} 
                        >
                            Login
                        </Button>
                    </FormGroup>
                </Form>
            </Modal>
        </div>
    );
};

export default LoginModal;
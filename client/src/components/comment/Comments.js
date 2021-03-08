import React, { useEffect, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Button, Form, Input, Row } from 'reactstrap';
import { COMMENT_LOADING_REQUEST, COMMENT_UPLOADING_REQUEST } from '../../redux/types';

const Comments = ({id, userId, userName}) => {
    const dispatch = useDispatch();
    const [formValue, setformValue] = useState({
        contents: "",
    });
    const resetValue = useRef(null);

    const onSubmit = async e => {
        await e.preventDefault();
        const { contents } = formValue;
        const token = localStorage.getItem("token");
        const body = {
            contents, 
            token,
            id,
            userId,
            userName,
        };

        dispatch({
            type: COMMENT_UPLOADING_REQUEST,
            payload: body,
        });

        resetValue.current.value = '';
        setformValue("");
    }

    const onChange = e => {
        setformValue({
            ...formValue,
            [e.target.name] : e.target.value,
        })
    }

    useEffect(() => {
        dispatch({
            type: COMMENT_LOADING_REQUEST,
            payload: id,
        });
    },  [dispatch, id]);


    // useEffect()

    return (
        <>
            <Form onSubmit={onSubmit}>
                <Row className="p-2">
                    <div className="font-weight-bold m-1">Make Comment</div>
                    <div className="my-1" />
                    <Input
                        innerRef={resetValue}
                        type="textarea"
                        name="contents"
                        id="contents"
                        onChange={onChange}
                        placeholder="Comment"
                    />
                    <Button 
                        color="primary" 
                        block 
                        className="mt-2 offset-md-10 col-md-2"
                    >
                        Submit
                    </Button>
                </Row>
            </Form>
        </>
    );
};

export default Comments;
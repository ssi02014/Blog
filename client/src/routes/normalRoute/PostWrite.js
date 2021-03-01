import React, { useState } from 'react';
import {useDispatch, useSelector} from 'react-redux';
import { Button, Col, Form, FormGroup, Input, Label, Progress } from 'reactstrap';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from "@ckeditor/ckeditor5-editor-classic/src/classiceditor";
import { editorConfiguration } from "../../components/editor/EditorConfig";
import Myinit from "../../components/editor/UploadAdapter";
import dotenv from 'dotenv';

dotenv.config();

const PostWrite = () => {
    const { isAuthenticated } = useSelector(state => state.auth);
    const dispatch = useDispatch();
    const [formValue, setFormValue] = useState({
        title: "", 
        contents: "", 
        fileUrl: "",
    });

    const getDataFromCKEditor = (event, editor) => {
        const data = editor.getData();
        console.log(data);

        if(data && data.match("<img src=")) {
            const whereImgStart = data.indexOf("<img src=");
            const extName = ["jpeg", "png", "jpg", "gif"];

            let whereImgEnd = "";
            let extNameFind = "";
            let resultImgUrl = "";

            for (let i = 0; i < extName.length; i++) {
                if (data.match(extName[i])) {
                    extNameFind = extName[i];
                    whereImgEnd = data.indexOf(`${extName[i]}`);
                }
            }

            if (extNameFind === 'jpeg') {
                resultImgUrl = data.substring(whereImgStart + 10, whereImgEnd + 4);
            } else {
                resultImgUrl = data.substring(whereImgStart + 10, whereImgEnd + 3);
            }
            console.log(resultImgUrl);

            setFormValue({
                ...formValue,
                fileUrl: resultImgUrl,
                contents: data
            });
            
        } else {
            setFormValue({
                ...formValue,
                fileUrl: process.env.REACT_APP_BASIC_IMAGE_URL,
                contents: data
            });
        }
        console.log(formValue);
    }

    const onChange = e => {
        setFormValue({
            ...formValue,
            [e.target.name] : e.target.value,
        })
    }

    const onSubmit = e => {
        const { title, contents, fileUrl, category} = formValue;
        e.preventDefault();
        
    }

    return (
        <div>
            {isAuthenticated ? (
                <Form>
                    <FormGroup className="mb-3">
                        <Label for="title">Title</Label>
                        <Input 
                            type="text"
                            name="title"
                            id="title"
                            className="form-control"
                            onChange={onChange}
                        />
                    </FormGroup>
                    <FormGroup className="mb-3">
                        <Label for="category">Category</Label>
                        <Input 
                            type="text"
                            name="category"
                            id="category"
                            className="form-control"
                            onChange={onChange}
                        />
                    </FormGroup>
                    <FormGroup className="mb-3">
                        <Label for="content">Content</Label>
                        <CKEditor
                            editor={ClassicEditor}
                            config={editorConfiguration}
                            onReady={Myinit}
                            onBlur={getDataFromCKEditor}
                        />
                        <Button 
                            color="dark"
                            block
                            className="mt-3 col-md-2 offset-md-10 mb-3"
                        > 
                            제출하기
                        </Button>
                    </FormGroup>
                </Form>
            ): (
                <Col width={50} className="p-5 m-5">
                    <Progress animated color="info" value={100}></Progress>
                </Col>
            )}
        </div>
    );
};

export default PostWrite;
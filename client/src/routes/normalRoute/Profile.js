import React, { useState } from "react";
import { Helmet } from "react-helmet";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import {
  Alert,
  Button,
  Card,
  CardBody,
  CardHeader,
  Col,
  Form,
  FormGroup,
  Input,
  Label,
} from "reactstrap";
import {
  CLEAR_ERROR_REQUEST,
  PASSWORD_EDIT_UPLOADING_REQUEST,
} from "../../redux/types";

const Profile = () => {
  const { userId, errorMsg, successMsg, previousMatchMsg } = useSelector(
    (state) => state.auth
  );
  const { userName } = useParams();
  const [formValues, setFormValues] = useState({
    previousPassword: "",
    password: "",
    rePassword: "",
  });
  const dispatch = useDispatch();

  const onChange = (e) => {
    setFormValues({
      ...formValues,
      [e.target.name]: e.target.value,
    });
  };

  const onSubmit = async (e) => {
    await e.preventDefault();

    const { previousPassword, password, rePassword } = formValues;
    const token = localStorage.getItem("token");

    const body = {
      password,
      token,
      previousPassword,
      rePassword,
      userId,
      userName,
    };

    console.log(body);

    dispatch({
      type: CLEAR_ERROR_REQUEST,
    });

    dispatch({
      type: PASSWORD_EDIT_UPLOADING_REQUEST,
      payload: body,
    });
  };
  return (
    <>
      <Helmet title={`Profile | ${userName}님의 프로필`} />
      <Col sm="12" md={{ size: 6, offset: 3 }}>
        <Card>
          <CardHeader>
            <strong>Edit Password</strong>
          </CardHeader>
          <CardBody>
            <Form onSubmit={onSubmit}>
              <FormGroup>
                <Label for="title">기존 비밀번호</Label>
                <Input
                  type="password"
                  name="previousPassword"
                  id="previousPassword"
                  className="form-control mb-2"
                  onChange={onChange}
                />

                {previousMatchMsg ? (
                  <Alert color="danger">{previousMatchMsg}</Alert>
                ) : (
                  ""
                )}
              </FormGroup>

              <FormGroup>
                <Label for="title">새로운 비밀번호</Label>
                <Input
                  type="password"
                  name="password"
                  id="password"
                  className="form-control"
                  onChange={onChange}
                />
              </FormGroup>

              <FormGroup>
                <Label for="title">비밀번호 확인</Label>
                <Input
                  type="password"
                  name="rePassword"
                  id="rePassword"
                  className="form-control mb-2"
                  onChange={onChange}
                />

                {errorMsg ? <Alert color="danger">{errorMsg}</Alert> : ""}
              </FormGroup>

              <Button
                color="success"
                block
                className="mt-4 mb-4 col-md-3 offset-9"
              >
                제출하기
              </Button>
              {successMsg ? <Alert color="success">{successMsg}</Alert> : ""}
            </Form>
          </CardBody>
        </Card>
      </Col>
    </>
  );
};

export default Profile;

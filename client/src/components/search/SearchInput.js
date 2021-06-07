import React, { Fragment, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { Form, Input } from "reactstrap";
import { SEARCH_REQUEST } from "../../redux/types";

const SearchInput = () => {
  const dispatch = useDispatch();
  const [formValues, setFormValues] = useState({
    searchBy: "",
  });

  const resetValue = useRef();

  const onChange = (e) => {
    setFormValues({
      ...formValues,
      [e.target.name]: e.target.value,
    });
    console.log(formValues);
  };

  const onSubmit = async (e) => {
    await e.preventDefault();

    const { searchBy } = formValues;

    dispatch({
      type: SEARCH_REQUEST,
      payload: searchBy,
    });

    console.log(searchBy);
    resetValue.current.value = "";
  };

  return (
    <Fragment>
      <Form onSubmit={onSubmit} className="col mt-2">
        <Input name="searchBy" onChange={onChange} innerRef={resetValue} />
      </Form>
    </Fragment>
  );
};

export default SearchInput;

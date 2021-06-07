import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import { Row } from "reactstrap";
import PostCardOne from "../../components/post/PostCardOne";
import { SEARCH_REQUEST } from "../../redux/types";

const Search = () => {
  const dispatch = useDispatch();
  const { searchResult } = useSelector((state) => state.post);

  let { searchTerm } = useParams();

  console.log(searchResult);

  useEffect(() => {
    if (searchTerm) {
      dispatch({
        type: SEARCH_REQUEST,
        payload: searchTerm,
      });
    }
  }, [dispatch, searchTerm]);

  return (
    <div>
      <h1>검색결과: "{searchTerm}"</h1>
      <Row>
        <PostCardOne posts={searchResult} />
      </Row>
    </div>
  );
};

export default Search;

import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Helmet } from "react-helmet";
import { Link, withRouter } from "react-router-dom";
import {
  POSTS_DETAIL_LOADING_REQUEST,
  POSTS_DELETE_REQUEST,
  USER_LOADING_REQUEST,
} from "../../redux/types";
import { GrowingSpinner } from "../../components/spinner/Spinner";

import { Button, Col, Container, Row } from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPencilAlt,
  faCommentDots,
  faMouse,
} from "@fortawesome/free-solid-svg-icons";
import { editorConfiguration } from "../../components/editor/EditorConfig";

import { CKEditor } from "@ckeditor/ckeditor5-react";
import BalloonEditor from "@ckeditor/ckeditor5-editor-balloon/src/ballooneditor";
import Comments from "../../components/comment/Comments";

const PostDetail = (req) => {
  const dispatch = useDispatch();
  // const { isAuthenticated } = useSelector((state) => state.auth);
  const { postDetail, creatorId, title, loading } = useSelector(
    (state) => state.post
  );
  const { userId, userName } = useSelector((state) => state.auth);
  const { comments } = useSelector((state) => state.comment);

  useEffect(() => {
    dispatch({
      type: POSTS_DETAIL_LOADING_REQUEST,
      payload: req.match.params.id,
    });

    dispatch({
      type: USER_LOADING_REQUEST,
      payload: localStorage.getItem("token"),
    });
  }, [dispatch, req.match.params.id]);

  const onDeleteClick = () => {
    dispatch({
      type: POSTS_DELETE_REQUEST,
      payload: {
        id: req.match.params.id,
        token: localStorage.getItem("token"),
      },
    });
  };

  const EditButtin = (
    <>
      <Row className="d-flex justify-content-center pb-3">
        <Col className="col-md-3 mr-md-3">
          <Link to="/" className="btn btn-dark btn-block">
            Home
          </Link>
        </Col>
        <Col className="col-md-3 mr-md-3">
          <Link
            to={`/post/${req.match.params.id}/edit`}
            className="btn btn-primary btn-block"
          >
            Edit Post
          </Link>
        </Col>
        <Col className="col-md-3">
          <Button className="btn-danger btn-block" onClick={onDeleteClick}>
            Delete
          </Button>
        </Col>
      </Row>
    </>
  );

  const HomeButton = (
    <>
      <Row className="d-flex justify-content-center pb-3">
        <Col className="col-sm-12 com-md-3">
          <Link to="/" className="btn btn-dark btn-block">
            Home
          </Link>
        </Col>
      </Row>
    </>
  );

  const Body = (
    <>
      {userId === creatorId ? EditButtin : HomeButton}
      <Row className="border-bottom border-top border-dark p-3 mb-3 d-flex justify-content-between">
        {/* 삼항 연산자가 아닌 조건문으로 쓰려면 {(() => {})()} (즉시 실행 문) */}
        {(() => {
          if (postDetail && postDetail.creator) {
            return (
              <>
                <div className="font-weight-bold text-big">
                  <span className="mr-3">
                    <Button color="dark">
                      {postDetail.category.categoryName}
                    </Button>
                  </span>
                  {postDetail.title}
                </div>
                <div className="align-self-end">
                  {postDetail.creator[0].name}
                </div>
              </>
            );
          }
        })()}
      </Row>
      {postDetail && postDetail.comments ? (
        <>
          <div className="d-flex justify-content-end align-items-baseline small">
            <FontAwesomeIcon icon={faPencilAlt} />
            &nbsp;
            <span>{postDetail.date}</span>
            &nbsp;&nbsp;
            <FontAwesomeIcon icon={faCommentDots} />
            &nbsp;
            <span>{postDetail.comments.length}</span>
            &nbsp;&nbsp;
            <FontAwesomeIcon icon={faMouse} />
            <span>{postDetail.views}</span>
          </div>

          <Row className="mb-3">
            <CKEditor
              editor={BalloonEditor}
              data={postDetail.contents}
              config={editorConfiguration}
              disabled="true"
            />
          </Row>
          <Row>
            <Container className="mb-3 border border-blue rounded">
              {Array.isArray(comments)
                ? comments.map(
                    ({ contents, creator, date, _id, creatorName }) => {
                      return (
                        <div key={_id}>
                          <Row className="justify-content-between p-2">
                            <div className="font-weight-bold">
                              {creatorName ? creatorName : creator}
                            </div>
                            <div className="text-small">
                              <span className="font-weight-bold">
                                {date.split(" ")[0]}
                              </span>
                              <span className="font-weight-light">
                                {" "}
                                {date.split(" ")[1]}
                              </span>
                            </div>
                          </Row>
                          <Row className="p-2">
                            <div>{contents}</div>
                          </Row>
                          <hr />
                        </div>
                      );
                    }
                  )
                : "Creator"}
              <Comments
                id={req.match.params.id}
                userId={userId}
                userName={userName}
              />
            </Container>
          </Row>
        </>
      ) : (
        <h1>hi</h1>
      )}
    </>
  );

  return (
    <div>
      <Helmet title={`Post | ${title}`} />
      {loading === true ? GrowingSpinner : Body}
    </div>
  );
};

export default withRouter(PostDetail);

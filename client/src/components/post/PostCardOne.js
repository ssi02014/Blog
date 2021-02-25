import React from 'react';
import { Badge, Button, Card, CardBody, CardImg, CardTitle, Row } from 'reactstrap';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMouse } from '@fortawesome/free-solid-svg-icons';

const PostCardOne = ({ posts }) => {
    return (
        <>
            {
                Array.isArray(posts) ? posts.map(({ _id, title, fileUrl, comments, views }) => {
                    return (
                        <div key={_id} className="col-md-4 mb-4">
                            <Link to={`/post/${_id}`} className="text-dark text-decoration-none">
                                <Card>
                                    <CardImg top src={fileUrl} alt="카드 이미지" />
                                    <CardBody>
                                        <CardTitle className="d-flex justify-content-between text-truncate">
                                            <span className="text-truncate">{title}</span>
                                            <span>
                                                <FontAwesomeIcon icon={faMouse} />
                                                &nbsp;&nbsp;
                                                <span>{views}</span>
                                            </span>
                                        </CardTitle>
                                        <Row>
                                            <Button color='dark' className="p-2 btn-block">
                                                More <Badge color='light'>{comments.length}</Badge>
                                            </Button>
                                        </Row>
                                    </CardBody>
                                </Card>
                            </Link>
                        </div>
                    )
                }) : ""
            }   
        </>
    );
};

export default PostCardOne;
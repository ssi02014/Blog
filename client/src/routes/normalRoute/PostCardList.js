import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Helmet } from 'react-helmet';
import { Row } from 'reactstrap';
import { GrowingSpinner } from '../../components/spinner/Spinner';
import { POSTS_LOADING_REQUEST } from '../../redux/types';
import PostCardOne from '../../components/post/PostCardOne';

const PostCardList = () => {
    const { posts } = useSelector(state => state.post);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch({
            type: POSTS_LOADING_REQUEST
        })
    }, [dispatch]);

    return (
        <>
            <Helmet title="Home" />
            <Row>
                {posts ? <PostCardOne posts={posts} /> : GrowingSpinner}
            </Row>
        </>
    );
};

export default PostCardList;
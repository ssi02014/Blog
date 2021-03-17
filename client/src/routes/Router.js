import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import AppNavbar from '../components/AppNavbar';
import { Container } from 'reactstrap';
import { Redirect, Route, Switch } from 'react-router-dom';
import PostCardList from './normalRoute/PostCardList';
import PostWrite from './normalRoute/PostWrite';
import PostDetail from './normalRoute/PostDetail';
import Search from './normalRoute/Search';
import PostEdit from './normalRoute/PostEdit';
import CategoryResult from './normalRoute/CategoryResult';
import { EditProtectedRoute } from './protectedRoute/ProtectedRoute';

const MyRouter = () => {
    return(
        <>
            <AppNavbar></AppNavbar>
            <Header></Header>
            <Container id="main-body" className="main-body">
                <Switch>
                    <Route path="/" component={PostCardList} exact/>
                    <Route path="/post" component={PostWrite} exact/>
                    <Route path="/post/:id" component={PostDetail} exact/>
                    <Route path="/post/category/:categoryName" component={CategoryResult} exact/>
                    <Route path="/search/:searchTerm" component={Search} exact/>
                    {/* redirect는 설정해 놓지 않은 주소가 들어오면 '/'로 보냄 */}
                    <EditProtectedRoute path="/post/:id/edit" exact component={PostEdit} />
                    <Redirect from="*" to="/" />
                </Switch>
            </Container>
            <Footer></Footer>
        </>
    )
};

export default MyRouter
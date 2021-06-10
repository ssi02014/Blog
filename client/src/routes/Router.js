import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import AppNavbar from "../components/AppNavbar";
import { Container } from "reactstrap";
import { Redirect, Route, Switch } from "react-router-dom";
import PostCardList from "./normalRoute/PostCardList";
import PostWrite from "./normalRoute/PostWrite";
import PostDetail from "./normalRoute/PostDetail";
import Search from "./normalRoute/Search";
import PostEdit from "./normalRoute/PostEdit";
import CategoryResult from "./normalRoute/CategoryResult";
import {
  EditProtectedRoute,
  ProfileProtectedRoute,
} from "./protectedRoute/ProtectedRoute";
import Profile from "./normalRoute/Profile";

const MyRouter = () => {
  return (
    <>
      <AppNavbar></AppNavbar>
      <Header></Header>
      <Container id="main-body" className="main-body">
        <Switch>
          <Route path="/" component={PostCardList} exact />
          <Route path="/post" component={PostWrite} exact />
          <Route path="/post/:id" component={PostDetail} exact />
          <Route
            path="/post/category/:categoryName"
            component={CategoryResult}
            exact
          />
          <Route path="/search/:searchTerm" component={Search} exact />
          <EditProtectedRoute
            path="/post/:id/edit"
            exact
            component={PostEdit}
          />
          <ProfileProtectedRoute
            path="/user/:userName/profile"
            exact
            component={Profile}
          />
          <Redirect from="*" to="/" />
        </Switch>
      </Container>
      <Footer></Footer>
    </>
  );
};

export default MyRouter;

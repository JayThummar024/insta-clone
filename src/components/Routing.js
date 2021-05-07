import React from "react";
import SignIn from "./SignIn";
import Profile from "./Profile";
import SignUp from "./SignUp";
import CreatePost from "./CreatePost";
import Home from "./Home";
import UserProfile from "./UserProfile";
import { useSelector } from "react-redux";
import { Redirect, Route, Switch } from "react-router-dom";
import MyFollowing from "./MyFollowing";

function Routing() {
  const isLoggedIn = useSelector((state) => state.isLoggedIn);
  return (
    <>
      <Switch>
        {<Route path="/signin" component={SignIn} />} ,
        {<Route path="/signup" component={SignUp} />} ,
        {isLoggedIn ? (
          <Route exact path="/" component={Home} />
        ) : (
          <Redirect to="/signin" />
        )}
        {isLoggedIn ? (
          <Route path="/createpost" component={CreatePost} />
        ) : (
          <Redirect to="/signin" />
        )}
        {isLoggedIn ? (
          <Route path="/profile" exact component={Profile} />
        ) : (
          <Redirect to="/signin" />
        )}
        {isLoggedIn ? (
          <Route path="/profile/:id" component={UserProfile} />
        ) : (
          <Redirect to="/signin" />
        )}
        {isLoggedIn ? (
          <Route path="/following" component={MyFollowing} />
        ) : (
          <Redirect to="/signin" />
        )}
      </Switch>
    </>
  );
}

export default Routing;

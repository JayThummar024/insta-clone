import Home from "./components/Home";
import { BrowserRouter as Router, Route } from "react-router-dom";
import NavBar from "./components/NavBar";
import SignIn from "./components/SignIn";
import Profile from "./components/Profile";
import SignUp from "./components/SignUp";
import CreatePost from "./components/CreatePost";

function App() {
  return (
    <>
      <Router>
        <NavBar />
        <Route path="/" component={Home} exact />
        <Route path="/signin" component={SignIn} />
        <Route path="/createpost" component={CreatePost} />
        <Route path="/signup" component={SignUp} />
        <Route path="/profile" component={Profile} />
      </Router>
    </>
  );
}

export default App;

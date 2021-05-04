import { BrowserRouter as Router } from "react-router-dom";
import NavBar from "./components/NavBar";

import { Provider } from "react-redux";
import { store } from "./redux/store";
import Routing from "./components/Routing";
// import { userLogout } from "./redux/actions";

function App() {
  return (
    <>
      <Provider store={store}>
        <Router>
          <NavBar />
          <Routing />
        </Router>
      </Provider>
    </>
  );
}

export default App;

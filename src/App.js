import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from "./pages/Home/Home";
import DashBoard from "./pages/Dashboard/DashBoard";
import Enrollment from "./pages/Enrollments/Enrollment";
import Achievement from "./pages/Achievements/Achievement";
import Forum from "./pages/Forum/Forum";
import NavBar from './components/NavBar/NavBar'
import SideBar from './components/SideBar/SideBar'

const App = () => {
  return (
    <Router>
      <div className="App">
        <NavBar />
        <SideBar active={"home"} />
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route exact path="/dashboard">
            <DashBoard />
          </Route>
          <Route exact path="/enrollment">
            <Enrollment />
          </Route>
          <Route exact path="/achievement">
            <Achievement />
          </Route>
          <Route exact path="/forum">
            <Forum />
          </Route>
        </Switch>
      </div>
    </Router>
  );
};

export default App;

import { BrowserRouter as Router, Route, Switch ,useLocation } from "react-router-dom";
import Home from "./pages/Home/Home";
import DashBoard from "./pages/Dashboard/DashBoard";
import Enrollment from "./pages/Enrollments/Enrollment";
import Achievement from "./pages/Achievements/Achievement";
import Forum from "./pages/Forum/Forum";
import ErrorPage from "./pages/ErrorPage/ErrorPage";
import NavBar from "./components/NavBar/NavBar";
import ProfilePage from "./pages/Profile/ProfilePage";
import SignUp from "./pages/SignupPage/SignUp";
import Login from "./pages/LoginPage/Login";

const App = () => {
  // const location = useLocation();
  // console.log(location);
  // we cannot use useLocation and Browser router both in a single component
  //so i think we should render the navbar in every page
  //but the css is so messed up when i tried last time
  return (
    <Router>
      <div className="App">
        <NavBar />
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
          <Route exact path="/profile">
            <ProfilePage />
          </Route>
          <Route exact path="/login">
            <Login />
          </Route>
          <Route exact path="/signup">
            <SignUp />
          </Route>
          <Route path="*">
            <ErrorPage />
          </Route>
        </Switch>
      </div>
    </Router>
  );
};

export default App;

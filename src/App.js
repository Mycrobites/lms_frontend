import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from "./pages/Home/Home";
import DashBoard from "./pages/Dashboard/DashBoard";
import Enrollment from "./pages/Enrollments/Enrollment";
import Achievement from "./pages/Achievements/Achievement";
import Forum from "./pages/Forum/Forum";
import ErrorPage from "./pages/ErrorPage/ErrorPage";
import NavBar from "./components/NavBar/NavBar";

import React from 'react'
import ProfilePage from "./pages/Profile/ProfilePage";


const App = () => {


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
          <Route path="*">
            <ErrorPage />
          </Route>
        </Switch>
      </div>
    </Router>
   
  );
};

export default App;

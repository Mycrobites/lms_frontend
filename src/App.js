import React from 'react'
import './App.css';
import Home from './pages/Home/Home';
import {BrowserRouter as Router , Route ,Switch} from 'react-router-dom'
import DashBoard from './pages/Dashboard/DashBoard';
import Enrollment from './pages/Enrollments/Enrollment';
import Achievement from './pages/Achievements/Achievement';
import Forum from './pages/Forum/Forum';

function App() {
  return (
    <Router>
      <div className="App">
        <Switch>
          <Route exact path='/'>
            <Home/>
          </Route>
          <Route exact path='/dashboard'>
            <DashBoard/>
          </Route>
          <Route exact path='/enrollment'>
            <Enrollment/>
          </Route>
          <Route exact path='/achievement'>
            <Achievement/>
          </Route>
          <Route exact path='/forum'>
            <Forum/>
          </Route>
        </Switch>
      
      </div>
    </Router>
  );
}

export default App;

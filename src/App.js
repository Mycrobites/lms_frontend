import Courses from "./components/Courses/Courses.jsx";
import LeaderBoard from "./components/LeaderBoard/LeaderBoard.jsx";
import UpcomingLessons from "./components/UpcomingLessons/UpcomingLessons.jsx";

const App = () => {
  return (
    <div className="App">
      <UpcomingLessons />
      <Courses />
      <LeaderBoard />
    </div>
  );
};

export default App;

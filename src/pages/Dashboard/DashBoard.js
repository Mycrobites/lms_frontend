import SideBar from "../../components/SideBar/SideBar";
import UpcomingLessons from "../../components/UpcomingLessons/UpcomingLessons";
import Calendar from "../../components/Calendar/Calendar";
import Courses from "../../components/Courses/Courses";
import LeaderBoard from "../../components/LeaderBoard/LeaderBoard";
import Task from "../../components/Task/Task";
import "./DashBoard.css";

const DashBoard = () => {
  return (
    <div className="Dashboard">
      <SideBar active="dashboard" />
      <div className="dashboard-items">
        <UpcomingLessons />
        <LeaderBoard />
        <Calendar />
        <Courses />
        <Task />
      </div>
    </div>
  );
};

export default DashBoard;

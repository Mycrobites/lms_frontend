import SideBar from "../../components/SideBar/SideBar";
import UpcomingLessons from "../../components/UpcomingLessons/UpcomingLessons";
import Calendar from "../../components/Calendar/Calendar";
import Courses from "../../components/Courses/Courses";
import LeaderBoard from "../../components/LeaderBoard/LeaderBoard";
import HomeWork from "../../components/Homework/HomeWork";
// import Task2 from "../../components/Task/Task2";
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
        <HomeWork />
        {/* <Task /> */}
        {/* <Task2 /> */}
      </div>
    </div>
  );
};

export default DashBoard;

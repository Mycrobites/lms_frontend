import SideBar from "../../components/SideBar/SideBar";
import UpcomingLessons from "../../components/UpcomingLessons/UpcomingLessons";
import Calendar from "../../components/Calendar/Calendar";
import Courses from "../../components/Courses/Courses";
import LeaderBoard from "../../components/LeaderBoard/LeaderBoard";
import HomeWork from "../../components/Homework/HomeWork";
import Task from "../../components/Task/Task";
import "./DashBoard.css";
import { useContext } from "react";
import UserContext from "../../context/authContext";

const DashBoard = () => {
  const { userDetails } = useContext(UserContext);

  return (
    <div className="Dashboard">
      <SideBar active="dashboard" />
      <div className="dashboard-items">
        <UpcomingLessons user={userDetails?.user} />
        <LeaderBoard />
        <Calendar />
        <Courses user={userDetails?.user} />
        <HomeWork user={userDetails?.user} />
        <Task user={userDetails?.user} />
      </div>
    </div>
  );
};

export default DashBoard;

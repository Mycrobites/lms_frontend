import { useState, useEffect } from "react";
import Student from "./Student.js";
import axios from "../../axios/axios";
import "./LeaderBoard.css";

const getLeaderboardFromLocalStorage = () => {
  const leaderboard = localStorage.getItem("leaderboard");
  if (leaderboard) {
    return JSON.parse(leaderboard);
  } else {
    return null;
  }
};

const LeaderBoard = () => {
  const [students, setStudents] = useState(getLeaderboardFromLocalStorage);

  useEffect(() => {
    let isUnmounted = false;
    const fetchLeadeboard = async () => {
      try {
        const { data } = await axios.get("/api/leaderboard/");
        if (!isUnmounted) {
          setStudents(data);
          localStorage.setItem("leaderboard", JSON.stringify(data));
        }
      } catch (err) {
        console.log(err.message);
      }
    };
    fetchLeadeboard();
    return () => {
      isUnmounted = true;
    };
  }, []);

  return (
    <div className="Leaderboard">
      <div className="header">
        <h2>Leaderboard</h2>
      </div>
      <div className="leaderboard-main-div">
        <div className="title">
          <h2>Rank</h2>
          <h2>Name</h2>
          <h2>Points</h2>
        </div>
        <div className="leaderboard-students">
          {students?.map((student, index) => (
            <Student key={index} {...student} rank={index + 1} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default LeaderBoard;

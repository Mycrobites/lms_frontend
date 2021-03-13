import { useState } from "react";
import Student from "./Student.jsx";
import students from "./data";
import "./LeaderBoard.css";

const LeaderBoard = () => {
  const [subject, setSubject] = useState("");

  return (
    <div className="Leaderboard">
      <div className="header">
        <h2>Leaderboard</h2>
        <select value={subject} onChange={(e) => setSubject(e.target.value)}>
          <option>English</option>
          <option>Algebra</option>
          <option>Geometry</option>
        </select>
      </div>
      <table>
        <thead>
          <tr className="title">
            <th>Rank</th>
            <th>Name</th>
            <th>Best Score</th>
            <th>Points</th>
          </tr>
        </thead>
        <tbody>
          {students.map((student) => (
            <Student key={student.id} {...student} />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default LeaderBoard;

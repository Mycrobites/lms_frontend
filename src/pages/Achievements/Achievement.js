import { useState, useEffect } from "react";
import axios from "../../axios/axios";
import Achievements from "../../components/Achivement/Achievements";
import LiveQuiz from "../../components/Achivement/LiveQuiz";
import PastQuiz from "../../components/Achivement/PastQuiz";
import SideBar from "../../components/SideBar/SideBar";
import "./Achievement.css";

const Achievement = () => {
  const [liveQuiz, setLiveQuiz] = useState(null);
  const [attemptedQuiz, setAttemptedQuiz] = useState(null);
  const [missedQuiz, setMissedQuiz] = useState(null);
  const [achievements, setAchievements] = useState(null);

  useEffect(() => {
    const fetchLiveQuiz = async () => {
      try {
        const { data } = await axios.post("/api/liveQuiz/", { user: "user1" });
        console.log(data);
        setLiveQuiz(data.live_quiz);
        setAttemptedQuiz(data.quiz_attempted);
        setMissedQuiz(data.quiz_missed);
        setAchievements(data.Achievements);
      } catch (err) {
        console.log(err.message);
      }
    };
    fetchLiveQuiz();
  }, []);

  return (
    <div className="achievement">
      <SideBar active="achievement" />
      <div className="achievements">
        <LiveQuiz liveQuiz={liveQuiz} />
        <PastQuiz attemptedQuiz={attemptedQuiz} missedQuiz={missedQuiz} />
        <Achievements achievements={achievements} />
      </div>
    </div>
  );
};

export default Achievement;

import { useState, useEffect , useContext } from "react";
import axios from "../../axios/axios";
import Achievements from "../../components/Achivement/Achievements";
import LiveQuiz from "../../components/Achivement/LiveQuiz";
import PastQuiz from "../../components/Achivement/PastQuiz";
import Loader from "../../components/Loader/Loader";
import SideBar from "../../components/SideBar/SideBar";
import UserContext from "../../context/authContext";
import "./Achievement.css";

const Achievement = () => {
  const [liveQuiz, setLiveQuiz] = useState(null);
  const [loading,setLoading] = useState(true)
  const [attemptedQuiz, setAttemptedQuiz] = useState(null);
  const [missedQuiz, setMissedQuiz] = useState(null);
  const [achievements, setAchievements] = useState(null);
  const {userDetails}= useContext(UserContext)

  useEffect(() => {
    const fetchLiveQuiz = async () => {
      try {
        const config ={
          header: {Authorization : `Bearer ${userDetails.key}`}
        }
        const { data } = await axios.post("/api/liveQuiz/", { user: userDetails?.user.username },config);
       
        console.log(data);
      
        setLiveQuiz(data?.live_quiz);
        setAttemptedQuiz(data?.quiz_attempted);
        setMissedQuiz(data?.quiz_missed);
        setLoading(false)
        
      } catch (err) {
        console.log(err.message);
      }
    };
    fetchLiveQuiz();
  }, []);

  useEffect(()=>{
    const fetchAchievements = async()=>{
      try{
        const config ={
          header: {Authorization : `Bearer ${userDetails.key}`}
        }
        const {data} = await axios.post("/api/achivements/", { user: userDetails?.user.username },config);
        console.log(data)
        setAchievements(data);
      }
      catch(err){
        console.log(err.message)
      }
    }
    fetchAchievements()

  },[])

  return (
    <div className="achievement-page">
      <SideBar active="achievement" />
      {loading ? <div className="profile-loader"><Loader/></div> : 
        <div className="achievements">
        <LiveQuiz liveQuiz={liveQuiz} />
        <PastQuiz attemptedQuiz={attemptedQuiz} missedQuiz={missedQuiz} />
        <Achievements achievements={achievements} />
      </div>}
      
    </div>
  );
};

export default Achievement;

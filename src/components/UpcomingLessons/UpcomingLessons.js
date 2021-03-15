import { useState, useEffect } from "react";
import Loader from "../Loader/Loader";
import Lesson from "./Lesson";
import axios from "../../axios/axios";
import "./UpcomingLessons.css";

const UpcomingLessons = () => {
  const [upcomingEvents, setUpcomingEvents] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchUpcomingEvents = async () => {
      try {
        const { data } = await axios.get("/api/upcomingEvents/rajat");
        const sortedData = data
          .sort((a, b) => new Date(b.timeStamp) - new Date(a.timeStamp))
          .reverse();
        setUpcomingEvents(sortedData);
        setIsLoading(false);
      } catch (err) {
        console.log(err.message);
      }
    };
    fetchUpcomingEvents();
  }, []);

  return (
    <div className="UpcomingLessons">
      <h1>Upcoming Lessons</h1>
      {isLoading && <Loader/>}
      <div className="lessons">
        {upcomingEvents.map((event) => (
          <Lesson key={event.id} {...event} />
        ))}
      </div>
    </div>
  );
};

export default UpcomingLessons;

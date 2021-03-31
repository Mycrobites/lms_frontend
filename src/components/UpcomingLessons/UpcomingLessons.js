import { useState, useEffect } from "react";
import Loader from "../Loader/Loader";
import Lesson from "./Lesson";
import axios from "../../axios/axios";
import "./UpcomingLessons.css";

const getUpcomingLessonsFromLocalStorage = () => {
  const lessons = localStorage.getItem("upcoming-lessons");
  if (lessons) {
    return JSON.parse(lessons);
  } else {
    return null;
  }
};

const UpcomingLessons = () => {
  const [upcomingEvents, setUpcomingEvents] = useState(
    getUpcomingLessonsFromLocalStorage
  );
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchUpcomingEvents = async () => {
      if (!upcomingEvents) setIsLoading(true);
      try {
        const { data } = await axios.get("/api/upcomingEvents/rajat");
        const sortedData = data
          .sort((a, b) => new Date(b.timeStamp) - new Date(a.timeStamp))
          .reverse();
        localStorage.setItem("upcoming-lessons", JSON.stringify(sortedData));
        setUpcomingEvents(sortedData);
      } catch (err) {
        console.log(err.message);
      }
      setIsLoading(false);
    };
    fetchUpcomingEvents();
  }, [upcomingEvents]);

  return (
    <div className="UpcomingLessons">
      <h1>Upcoming Lessons</h1>
      {isLoading && <Loader />}
      <div className="lesson">
        {upcomingEvents?.map((event) => (
          <Lesson key={event.id} {...event} />
        ))}
      </div>
    </div>
  );
};

export default UpcomingLessons;

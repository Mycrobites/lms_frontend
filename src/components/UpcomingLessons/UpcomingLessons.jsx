import Lesson from "./Lesson";
import lessons from "./data";
import "./UpcomingLessons.css";

const UpcomingLessons = () => {
  return (
    <div className="UpcomingLessons">
      <h1>Upcoming Lessons</h1>
      <div className="lessons">
        {lessons.map((lesson) => (
          <Lesson key={lesson.id} {...lesson} />
        ))}
      </div>
    </div>
  );
};

export default UpcomingLessons;

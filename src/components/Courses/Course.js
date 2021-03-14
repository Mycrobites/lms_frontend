import months from "./months";

const Course = (props) => {
  const {
    cname,
    total_lesson,
    date_of_enrollment,
    is_complete,
    percentage_completed,
    course_complete_percentage,
  } = props;

  return (
    <div className="Course">
      <div className="title">
        <h2>{cname}</h2>
      </div>
      <div className="enrolled-on">
        <h3>
          Enrolled on: {date_of_enrollment.split("-")[2]}{" "}
          {date_of_enrollment.split("-")[1] < 10
            ? months[date_of_enrollment.split("-")[1].split("")[1]]
            : months[date_of_enrollment.split("-")[1]]}{" "}
          {date_of_enrollment.split("-")[0]}
        </h3>
      </div>
      <div className="course-progress">
        <h3>{percentage_completed}%</h3>
        <div>
          <progress value={percentage_completed} max={100} />
        </div>
        <h3>
          {Math.floor(course_complete_percentage)}/{total_lesson}
        </h3>
      </div>
    </div>
  );
};

export default Course;

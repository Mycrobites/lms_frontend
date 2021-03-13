const Course = (props) => {
  return (
    <div className="Course">
      <div className="course-title">
        <img src={props.titleImage} alt={props.title} />
        <div className="title">
          <h3 style={{ color: `${props.color}` }}>{props.difficulty}</h3>
          <h2>{props.title}</h2>
        </div>
      </div>
      <div className="instructor">
        <p>by</p>
        <img src={props.instructorImage} alt={props.instructor} />
        <h2>{props.instructor}</h2>
      </div>
      <div className="progress">
        <h3>{props.progress}%</h3>
        <div>
          <progress value={props.progress} max={100} />
        </div>
        <h3>{props.completed}</h3>
        <img src={props.flag} alt={props.title} />
      </div>
    </div>
  );
};

export default Course;

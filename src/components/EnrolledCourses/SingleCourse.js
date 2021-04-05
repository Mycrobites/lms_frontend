import { useHistory } from 'react-router-dom'

const SingleCourse = (props) => {

  const history = useHistory();

  const handleClick = () =>{
    history.push(`/course/${props.course}`)
  }

  return (
    <div className="single-course-card" >
      <div className="single-course-image">
        <img src={props.course_image} alt={props.course_name} />
      </div>
      <h2 className="single-course-title">{props.course_name}</h2>
      <div className="single-course-author">
        <img src={props.author_picture} alt={props.author} />
        <h2>{props.author}</h2>
      </div>
      <progress value={props.percentage_completed} max="100">
        {props.percentage_completed}%
      </progress>
      {!props.percentage_completed ? (
        <div>
          <div className="lessons">
            <div className="content">Lessons: {props.total_lesson}</div>
            <button className="enrollment-course-btn" onClick={handleClick}> Start </button>
          </div>
        </div>
      ) : (
        <div className="lessons">
          <div className="content">
            Completed: {props.percentage_completed}%
          </div>
          <button className="enrollment-course-btn" onClick={handleClick}>Resume</button>
        </div>
      )}
    </div>
  );
};

export default SingleCourse;

import React, {useState, useEffect} from 'react'
import axios from 'axios'
import SingleCourse from './SingleCourse'
import Loader from "../Loader/Loader";
import './courses.css'

const Courses = () =>{
    const [activeCourses, setActiveCourses] = useState([])
    const [completedCourses, setCompletedCourses] = useState([])

    const [loading, setIsLoading] = useState(true)

    useEffect(() => {
        const getCourses = async () => {
          try {
            const { data } = await axios.get("https://lms-seg.herokuapp.com/api/getMyCourses/rajat");
            console.log(data)
            setActiveCourses(data.active);
            setCompletedCourses(data.completed);
            setIsLoading(false);
          } catch (err) {
            console.log(err.message);
          }
        };
        getCourses();
    }, []);

    return(
        <div className="heading">
            <h1>Active Courses</h1>
            {loading ? 
            (
                <Loader/>
            )
            :
            (   
                <>
                <div className="activeCourses">
                    {activeCourses.map((course) => 
                        <div>
                            <SingleCourse key={course.sno} {...course}/>
                        </div>
                    )}
                </div>
                <div className="activeCourses">
                    {completedCourses.map((course) => 
                        <div>
                            <SingleCourse key={course.sno} {...course}/>
                        </div>
                    )}
                </div>
                </>
            )
            }
            
        </div>
    );

}

export default Courses
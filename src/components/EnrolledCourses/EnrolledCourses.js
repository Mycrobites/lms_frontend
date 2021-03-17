import React, {useState, useEffect} from 'react'
import axios from 'axios'
import SingleCourse from './SingleCourse'
import Loader from "../Loader/Loader";
import './courses.css'
// import { Tabs, Tab, Panel } from '@bumaga/tabs' 
import { Tabs, Tab, Content } from "./Tab";

const Courses = () =>{
    const [data, setData] = useState();
    const [activeCourses, setActiveCourses] = useState([])
    const [completedCourses, setCompletedCourses] = useState([])

    const [loading, setIsLoading] = useState(true)

    useEffect(() => {
        const getCourses = async () => {
          try {
            const { data } = await axios.get("https://lms-seg.herokuapp.com/api/getMyCourses/rajat");
            setData(data);
            setActiveCourses(data.active);
            setCompletedCourses(data.completed);
            console.log(completedCourses)
            setIsLoading(false);
          } catch (err) {
            console.log(err.message);
          }
        };
        getCourses();
    }, []);
    
    
    const [active, setActive] = useState(0);
    const handleClick = e => {
        const index = parseInt(e.target.id, 0);
        if (index !== active) {
        setActive(index);
        }
    };

    return(
        <div className='enrolled-course'>
            
            {loading ? 
            (
                <Loader/>
            )
            :
            (   
                <>
                <div className="heading">Welcome! Rajat</div>
                <div className="heading"> Statistics </div>
                 <div className="statistics">
                     <div className="card">{data.act_count} <br/>Active</div>
                     <div className="card">{data.comp_count} <br/>Complete</div>
                 </div>
                {/* <Tabs>
                    <div>
                        <Tab><button onClick={handleClick}>Active</button></Tab> 
                        <Tab><button>Completed</button></Tab>
                    </div>
                    <Panel>
                        <div className="activeCourses">
                        {activeCourses.map((course) => 
                            <div>
                                <SingleCourse key={course.sno} {...course}/>
                            </div>
                        )}
                        </div>
                    </Panel>
                    <Panel className="activeCourses">
                        <div className="activeCourses">
                        {completedCourses.map((course) => 
                            <div>
                                <SingleCourse key={course.sno} {...course}/>
                            </div>
                        )}        
                        </div>      
                    </Panel>
                </Tabs>  */}

                    <Tabs>
                        <Tab onClick={handleClick} active={active === 0} id={0}>
                            Active
                        </Tab>

                        <Tab onClick={handleClick} active={active === 1} id={1}>
                            Complete
                        </Tab>
                    </Tabs>
                    <>
                        <Content active={active === 0}>
                        <div className="activeCourses">
                        {activeCourses.map((course) => 
                            <div>
                                <SingleCourse key={course.sno} {...course}/>
                            </div>
                        )}
                        </div>
                        </Content>
                        <Content active={active === 1}>
                        <div className="activeCourses">
                        {completedCourses.map((course) => 
                            <div>
                                <SingleCourse key={course.sno} {...course}/>
                            </div>
                        )}        
                        </div>   
                        </Content>
                    </>
                </>
                
            )
            }
            
        </div>
    );

}

export default Courses
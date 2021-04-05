import { useState, useEffect, useRef } from "react"
import { useParams } from "react-router-dom"
import axios from "../../axios/axios"
import Loader from "../Loader/Loader"
import './UniqueCourse.css'


const UniqueCourse = () =>{
    const { id } = useParams()
    const mountedRef = useRef(true)
    const [CourseDetails, setCourse] = useState(null)
    const [isLoading, setIsLoading] = useState(true)
    
    useEffect(()=>{
        const fetchCourseDetails = async () =>{
            if(CourseDetails==null) setIsLoading(true)
            try{
                const {data} =  await axios.get(`/api/course/${id}`)
                if(mountedRef.current){
                    setCourse(data.course_details)
                }
                console.log(CourseDetails)
            }catch(err){
                console.log(err.message)
            }
        }
        fetchCourseDetails()
        setIsLoading(false);
        return function callback(){
            mountedRef.current = false
        }
        // eslint-disable-line react-hooks/exhaustive-deps
    }, [CourseDetails])


    return(
        <>
        {isLoading ? (
            <div className="post-loader">
              <Loader />
            </div>
        ):
        (
            <div className="course">
                <div className="header">
                    { CourseDetails?.course_name }
                </div>
            </div>
        )
        }
        </>
    )

}


export default UniqueCourse
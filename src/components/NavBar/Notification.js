import { useEffect, useRef ,useState } from "react";
import CloseOutlinedIcon from "@material-ui/icons/CloseOutlined";
import "./NavBar.css";
import axios from "../../axios/axios";
import Loader from "../Loader/Loader";
import SingleNotification from "./SingleNotification";



const Notification = ({ setShowNotification }) => {

  const getNotification =()=>{
  
   const data = localStorage.getItem("user-notification")
   if(data){
     return JSON.parse(data)

   }
   else{
     return null;
   }
  }

  const [notificationDetails , setNotificationDetails] = useState(getNotification)
  const [loading, setLoading] = useState(false) 
  const notificationRef = useRef();

  const fetchNotification = async()=>{
    if(!notificationDetails){
      setLoading(true)
    }
    try{
      const {data} = await axios.get("/api/fetchNotification/rajat")
      setNotificationDetails(data)
      setLoading(false)
      console.log(data)
      localStorage.setItem("user-notification", JSON.stringify(data))
    }
    catch(err){
      console.log(err.message)
    }
   
  }

  useEffect(() => {

    fetchNotification()
    const handler = (e) => {
      if (!notificationRef?.current?.contains(e.target)) {
        setShowNotification(false);
      }
    };
    
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  },[]);

  

  

  return (
    <div className="user-notification" ref={notificationRef}>
      <div className="notification-header">
        <h4>Notifications</h4>
        <button onClick={() => setShowNotification(false)}>
          <CloseOutlinedIcon />
        </button>
      </div>
      <div className="notification-body">
      {notificationDetails.map((notification,idx)=>(
        <SingleNotification key={idx} id={notification?.id} time={notification?.time} message={notification?.message} title={notification?.title} />
      ))}
      </div>
    </div>
  );
};

export default Notification;

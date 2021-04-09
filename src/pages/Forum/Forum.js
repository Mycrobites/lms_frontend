import SideBar from "../../components/SideBar/SideBar";
import Posts from "../../components/Posts2/Posts";
import "./Forum.css";

const Forum = () => {
  return (
    <div className="Forum">
      <SideBar active="forum" />
      <Posts />
    </div>
  );
};

export default Forum;

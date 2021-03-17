import { useState, useEffect } from "react";
import axios from "../../axios/axios";
import SinglePost from "./SinglePost";
import Loader from "../Loader/Loader";
import "./Posts.css";

const Posts = () => {
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const { data } = await axios.get("/api/forum/getPosts");
        setPosts(data.reverse());
        setIsLoading(false);
      } catch (err) {
        console.log(err.message);
      }
    };
    fetchPosts();
  }, []);

  return (
    <>
      {isLoading ? (
        <div className="post-loader">
          <Loader />
        </div>
      ) : (
        <div className="Posts">
          <h1>Questions</h1>
          <div>
            {posts.map((post) => (
              <SinglePost key={post.id} {...post} />
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default Posts;

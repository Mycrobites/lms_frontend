import { useState, useEffect } from "react";
import axios from "../../axios/axios";
import SinglePost from "./SinglePost";
import Loader from "../Loader/Loader";
import { IoCloseOutline } from "react-icons/io5";
import "./Posts.css";

const getPostsFromLoacalStorage = () => {
  const posts = localStorage.getItem("posts");
  if (posts) {
    return JSON.parse(posts);
  } else {
    return null;
  }
};

const Posts = () => {
  const [posts, setPosts] = useState(getPostsFromLoacalStorage);
  const [isLoading, setIsLoading] = useState(false);
  const [showAddPost, setShowAddPost] = useState(false);
  const [postTitle, setPostTitle] = useState("");
  const [postDesc, setPostDesc] = useState("");

  const addPost = async (e) => {
    e.preventDefault();
    try {
      const newPost = {
        title: postTitle,
        desc: postDesc,
        userid: 114,
      };
      const { data } = await axios.post("/api/forum/createPosts", newPost);
      setPosts(data);
      localStorage.setItem("posts", JSON.stringify(posts));
    } catch (err) {
      console.log(err.message);
    }
  };

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        if (!posts) setIsLoading(true);
        const { data } = await axios.get("/api/forum/getPosts");
        setPosts(data.reverse());
        localStorage.setItem("posts", JSON.stringify(data.reverse()));
      } catch (err) {
        console.log(err.message);
      }
      setIsLoading(false);
    };
    fetchPosts();
  }, [posts]);

  return (
    <>
      {isLoading ? (
        <div className="post-loader">
          <Loader />
        </div>
      ) : (
        <div className="Posts">
          <div className="posts-title">
            <h1>Questions</h1>
            <button onClick={() => setShowAddPost(true)}>Ask Question</button>
          </div>
          {showAddPost && (
            <div className="add-post" onSubmit={addPost}>
              <div className="add-post-title">
                <h1>Ask Question</h1>
                <button onClick={() => setShowAddPost(false)}>
                  <IoCloseOutline />
                </button>
              </div>
              <form className="add-post-form">
                <label>
                  <p>Title</p>
                  <input
                    typr="text"
                    placeholder="title..."
                    value={postTitle}
                    onChange={(e) => setPostTitle(e.target.value)}
                  />
                </label>
                <label>
                  <p>Description</p>
                  <textarea
                    typr="text"
                    placeholder="description..."
                    value={postTitle}
                    onChange={(e) => setPostTitle(e.target.value)}
                  />
                </label>
                <button type="submit">Ask</button>
              </form>
            </div>
          )}
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

import { useState, useEffect } from "react";
import axios from "../../axios/axios";
import SinglePost from "./SinglePost";
import Loader from "../Loader/Loader";
import { IoCloseOutline } from "react-icons/io5";
import { AiOutlineWarning } from "react-icons/ai";
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
  const [error, setError] = useState(false);

  const getPosts = async () => {
    try {
      if (!posts) setIsLoading(true);
      const { data } = await axios.get("/api/forum/getPosts");
      setPosts(data.reverse());
      localStorage.setItem("posts", JSON.stringify(data.reverse()));
    } catch (err) {
      console.log(err.message);
    }
  };

  const addPost = async (e) => {
    e.preventDefault();
    setError(false);
    if (!postTitle || !postDesc) return setError(true);
    setIsLoading(true);
    try {
      const newPost = {
        title: postTitle,
        desc: postDesc,
        userid: 114,
      };
      await axios.post("/api/forum/createPosts", newPost);
      getPosts();
    } catch (err) {
      console.log(err.message);
    }
    setShowAddPost(false)
    setIsLoading(false);
  };

  useEffect(() => {
    let isUnmounted = false;
    const fetchPosts = async () => {
      try {
        if (!posts) setIsLoading(true);
        const { data } = await axios.get("/api/forum/getPosts");
        if (!isUnmounted) {
          setPosts(data.reverse());
          localStorage.setItem("posts", JSON.stringify(data.reverse()));
        }
      } catch (err) {
        console.log(err.message);
      }
      setIsLoading(false);
    };
    fetchPosts();
    return () => {
      isUnmounted = true;
    };
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
            <button
              onClick={() => {
                setShowAddPost(true);
                setError(false);
              }}
            >
              Ask Question
            </button>
          </div>
          {showAddPost && (
            <div className="add-post" onSubmit={addPost}>
              {isLoading && (
                <div className="loading-div">
                  <Loader />
                </div>
              )}
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
                    value={postDesc}
                    onChange={(e) => setPostDesc(e.target.value)}
                  />
                </label>
                {error && (
                  <p className="post-upload-question">
                    <AiOutlineWarning />
                    Please fill all the fields!
                  </p>
                )}
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

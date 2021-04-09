import { useEffect, useState } from "react";
import SinglePost from "./SinglePost";
import axios from "../../axios/axios";
import { AiOutlineWarning } from "react-icons/ai";
import { IoCloseOutline } from "react-icons/io5";
import "./Posts.css";

const Posts = () => {
  const [showAddPost, setShowAddPost] = useState(false);
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [error, setError] = useState(false);
  const [posts, setPosts] = useState(null);

  const addPost = async (e) => {
    e.preventDefault();
    setError(false);
    if (!title || !desc) return setError(true);
    // setAddingPost(true);
    try {
      const newPost = {
        title,
        desc,
        userid: 114,
      };
      const data = await axios.post("/api/forum/createPosts", newPost);
      console.log(data);
      setTitle("");
      setDesc("");
      // getPosts();
    } catch (err) {
      console.log(err.message);
    }
    setShowAddPost(false);
    // setAddingPost(false);
  };

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const { data } = await axios.get("/api/forum/getPosts");
        setPosts(data);
        console.log(data);
      } catch (err) {
        console.log(err.message);
      }
    };
    fetchPosts();
  }, []);

  return (
    <div className="posts">
      <div className="add-post">
        <div className="add-post-title">
          <h1>Questions</h1>
          <button
            onClick={() => {
              setShowAddPost(!showAddPost);
              setError(false);
            }}
          >
            Ask Question
          </button>
        </div>
        {showAddPost && (
          <div className="post-post">
            <form onSubmit={addPost}>
              <label>Title</label>
              <input
                type="text"
                placeholder="title..."
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
              <label>Description</label>
              <textarea
                placeholder="Description..."
                value={desc}
                onChange={(e) => setDesc(e.target.value)}
              />
              <label>Add Image (optional)</label>
              <input type="file" accept="image/png" />
              {error && (
                <p className="post-upload-question">
                  <AiOutlineWarning />
                  Please fill all the fields!
                </p>
              )}
              <div className="add-post-buttons">
                <button onClick={() => setShowAddPost(false)} type="button">
                  Cancel
                </button>
                <button type="submit">Ask</button>
              </div>
            </form>
          </div>
        )}
      </div>
      <div className="all-posts">
        {posts?.map((post) => (
          <SinglePost key={post.id} {...post} />
        ))}
      </div>
    </div>
  );
};

export default Posts;

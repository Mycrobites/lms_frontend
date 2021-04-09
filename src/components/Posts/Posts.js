import { useState, useEffect, useRef } from "react";
import axios from "../../axios/axios";
import SinglePost from "./SinglePost";
import Loader from "../Loader/Loader";
import { IoCloseOutline } from "react-icons/io5";
import { AiOutlineWarning } from "react-icons/ai";
import "./Posts.css";
import Pagination from "./Pagination";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

const getPostsFromLoacalStorage = () => {
  const posts = localStorage.getItem("posts");
  if (posts) {
    return JSON.parse(posts);
  } else {
    return null;
  }
};

const POSTS_PER_PAGE = 10;

const Posts = () => {
  const [posts, setPosts] = useState(getPostsFromLoacalStorage);
  const [isLoading, setIsLoading] = useState(false);
  const [showAddPost, setShowAddPost] = useState(false);
  const [postTitle, setPostTitle] = useState("");
  const [postDesc, setPostDesc] = useState("");
  const [error, setError] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(null);
  const [addingPost, setAddingPost] = useState(false);
  const mountedRef = useRef(true);

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
    setAddingPost(true);
    try {
      const newPost = {
        title: postTitle,
        desc: postDesc,
        userid: 114,
      };
      const data = await axios.post("/api/forum/createPosts", newPost);
      console.log(data);
      getPosts();
    } catch (err) {
      console.log(err.message);
    }
    setShowAddPost(false);
    setAddingPost(false);
  };

  useEffect(() => {
    // let isUnmounted = false;
    const fetchPosts = async () => {
      try {
        if (!posts) setIsLoading(true);
        const { data } = await axios.get("/api/forum/getPosts");
        if (mountedRef.current) {
          setPosts(data);
          console.log(data.reverse());
          localStorage.setItem("posts", JSON.stringify(data));
        }
      } catch (err) {
        console.log(err.message);
      }
      setIsLoading(false);
    };
    setTotalPages(Math.ceil(posts?.length / POSTS_PER_PAGE));
    fetchPosts();
    return function cleanup() {
      mountedRef.current = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const startIndex = (currentPage - 1) * POSTS_PER_PAGE;
  const selectedPosts = posts?.slice(startIndex, startIndex + POSTS_PER_PAGE);

  const handlePages = (page) => {
    setCurrentPage(page);
  };

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
          {addingPost && (
            <div className="loading-div">
              <Loader />
            </div>
          )}
          {showAddPost && (
            <div className="add-post" onSubmit={addPost}>
              <div className="add-post-title">
                <h1>Ask Question</h1>
                <button onClick={() => setShowAddPost(false)}>
                  <IoCloseOutline />
                </button>
              </div>
              <form className="add-post-form" onSubmit={addPost}>
                <label>
                  <p>Title</p>
                  <CKEditor
                    editor={ClassicEditor}
                    data={postTitle}
                    onReady={(editor) => {
                      console.log("Editor is ready to use!", editor);
                      editor.editing.view.change((writer) => {
                        writer.setStyle(
                          "height",
                          "80px",
                          editor.editing.view.document.getRoot()
                        );
                      });
                    }}
                    onChange={(event, editor) => {
                      const data = editor.getData();
                      setPostTitle(data);
                    }}
                  />
                </label>
                <label>
                  <p>Description</p>
                  <CKEditor
                    editor={ClassicEditor}
                    data={postDesc}
                    onReady={(editor) => {
                      console.log("Editor is ready to use!", editor);
                      editor.editing.view.change((writer) => {
                        writer.setStyle(
                          "height",
                          "130px",
                          editor.editing.view.document.getRoot()
                        );
                      });
                    }}
                    onChange={(event, editor) => {
                      const data = editor.getData();
                      setPostDesc(data);
                    }}
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
            {selectedPosts?.map((post) => (
              <SinglePost key={post.id} {...post} />
            ))}
          </div>
          {posts?.length > 10 && (
            <Pagination
              totalPages={totalPages}
              handlePages={handlePages}
              currentPage={currentPage}
            />
          )}
        </div>
      )}
    </>
  );
};

export default Posts;

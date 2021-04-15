import { useContext, useEffect, useState } from "react";
import SinglePost from "./SinglePost";
import Pagination from "./Pagination";
import axios from "../../axios/axios";
import { AiOutlineWarning } from "react-icons/ai";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import Loader from "../Loader/Loader";
import UserContext from "../../context/authContext";
import "./Posts.css";

const getCookie = (name) => {
  var cookieValue = null;
  if (document.cookie && document.cookie !== "") {
    var cookies = document.cookie.split(";");
    for (var i = 0; i < cookies.length; i++) {
      var cookie = cookies[i].trim();
      if (cookie.substring(0, name.length + 1) === name + "=") {
        cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
        break;
      }
    }
  }
  return cookieValue;
};

const Posts = () => {
  const [showAddPost, setShowAddPost] = useState(false);
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [tags, setTags] = useState("");
  const [error, setError] = useState(false);
  const [posts, setPosts] = useState(null);
  const [loading, setLoading] = useState(true);
  const [totalPages, setTotalPages] = useState(null);
  const [currentPage, setCurrentPage] = useState(0);
  const { userDetails } = useContext(UserContext);

  const csrftoken = getCookie("csrftoken");

  const addPost = async (e) => {
    e.preventDefault();
    setError(false);
    if (!title || !desc) return setError(true);
    try {
      const newPost = {
        title,
        desc,
        userid: userDetails.user.pk,
        tags,
      };
      await axios.post("/api/forum/createPosts", newPost);
      setTitle("");
      setDesc("");
      setTags("");
      fetchPosts();
      setShowAddPost(false);
    } catch (err) {
      console.log(err.message);
    }
  };

  const fetchPosts = async () => {
    try {
      const { data } = await axios.get(
        `/api/forum/getPosts?pageno=${currentPage}`
      );
      setPosts(data.response);
      setTotalPages(data.no_of_pages);
      setLoading(false);
      // console.log(data.response);
    } catch (err) {
      console.log(err.message);
    }
  };

  useEffect(() => {
    fetchPosts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPage]);

  const handlePages = (page) => {
    setCurrentPage(page);
  };

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
              <label>
                <p>Title</p>
                <input
                  type="text"
                  placeholder="title..."
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </label>
              <label>
                <p>Description</p>
                <CKEditor
                  editor={ClassicEditor}
                  data={desc}
                  config={{
                    ckfinder: {
                      uploadUrl:
                        "http://lms-seg.herokuapp.com/api/uploadimages?command=QuickUpload&type=Images&responseType=json",
                      options: {
                        resourceType: "Images",
                      },
                      credentials: "include",
                      headers: {
                        "X-CSRF-TOKEN": csrftoken,
                        csrftoken: csrftoken,
                        csrfmiddlewaretoken: csrftoken,
                      },
                    },
                  }}
                  // onReady={(editor) => {
                  //   console.log("Editor is ready to use!", editor);
                  // }}
                  onChange={(event, editor) => {
                    const data = editor.getData();
                    setDesc(data);
                  }}
                  // onBlur={(event, editor) => {
                  //   console.log("Blur.", editor);
                  // }}
                  // onFocus={(event, editor) => {
                  //   console.log("Focus.", editor);
                  // }}
                />
              </label>
              <label>
                <p>Tags (Enter tags as a comma separated string)</p>
                <textarea
                  placeholder="tags..."
                  value={tags}
                  onChange={(e) => setTags(e.target.value)}
                />
              </label>
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
        {loading && (
          <div className="forum-loader">
            <Loader />
          </div>
        )}
        {posts?.map((post) => (
          <SinglePost
            key={post.id}
            {...post}
            uid={userDetails.user.pk}
            fetchPosts={fetchPosts}
            posts={posts}
            setPosts={setPosts}
          />
        ))}
        {posts && (
          <Pagination
            totalPages={totalPages}
            handlePages={handlePages}
            currentPage={currentPage}
          />
        )}
      </div>
    </div>
  );
};

export default Posts;

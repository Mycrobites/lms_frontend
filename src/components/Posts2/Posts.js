import { useEffect, useState } from "react";
import SinglePost from "./SinglePost";
import axios from "../../axios/axios";
import { AiOutlineWarning } from "react-icons/ai";
import { IoCloseOutline } from "react-icons/io5";
import "./Posts.css";
import React from 'react';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

const getCookie = (name) => {
  var cookieValue = null;
  if (document.cookie && document.cookie !== '') {
    var cookies = document.cookie.split(';');
    for (var i = 0; i < cookies.length; i++) {
      var cookie = cookies[i].trim();
      if (cookie.substring(0, name.length + 1) === (name + '=')) {
        cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
        break;
      }
    }
  }
  return cookieValue;
}

const Posts = () => {
  const [showAddPost, setShowAddPost] = useState(false);
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [error, setError] = useState(false);
  const [posts, setPosts] = useState(null);

  const csrftoken = getCookie('csrftoken');

  const addPost = async (e) => {
    e.preventDefault();
    setError(false);
    if (!title || !desc) return setError(true);
    // setAddingPost(true);
    const formData = new FormData();
    formData.append(
      "title",
      title
    );
    formData.append(
      "desc",
      desc
    );
    formData.append("userid", 114)
    try {
      const newPost = {
        title,
        desc,
        userid: 114,
      };
      console.log(formData);
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
              <CKEditor
                editor={ClassicEditor}
                config={{
                  ckfinder: {
                    uploadUrl: "http://lms-seg.herokuapp.com/api/uploadimages?command=QuickUpload&type=Images&responseType=json",
                      options: {
                      resourceType: "Images",
                    },
                    credentials: 'include',
                    headers: {
                      'X-CSRF-TOKEN': csrftoken,
                      'csrftoken': csrftoken,
                      'csrfmiddlewaretoken': csrftoken
                    },
                  }
                }}
                // data="<p>Hello from CKEditor 5!</p>"
                onReady={editor => {

                  console.log('Editor is ready to use!', editor);
                }}
                onChange={(event, editor) => {
                  const data = editor.getData();
                  console.log(data);
                  setDesc(data);
                  // console.log( { event, editor, data } );
                }}
                onBlur={(event, editor) => {
                  console.log('Blur.', editor);
                }}
                onFocus={(event, editor) => {
                  console.log('Focus.', editor);
                }}
              />
             
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

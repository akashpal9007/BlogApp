import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import "./BlogPage.css";
import Navbar from "../Navbar/Navbar";
import user from "../../assets/account.png";

const BlogPage = () => {
  const { id } = useParams();
  const [blog, setBlog] = useState();
  const [authors, setAuthors] = useState([]);
  const [comments, setComments] = useState([]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [comment, setComment] = useState("");
  const [fav, setFav] = useState(false);

  const fetchPost = async () => {
    const res = await axios.get(
      `https://jsonplaceholder.typicode.com/posts/${id}`
    );
    setBlog(res.data);
  };
  const fetchAuthors = async () => {
    const res = await axios.get(`https://jsonplaceholder.typicode.com/users`);
    let auth = res.data.map((user) => {
      return user.name;
    });
    setAuthors(auth);
  };

  const fetchComments = async () => {
    const res = await axios.get(
      `https://jsonplaceholder.typicode.com/comments?postId=${id}`
    );
    let com = res.data.map((user) => {
      return user;
    });
    setComments(com);
  };

  const addComment = () => {
    if (
      name !== "" &&
      name !== undefined &&
      email !== "" &&
      email !== undefined &&
      comment !== "" &&
      comment !== undefined
    ) {
      if (/\S+@\S+\.\S+/.test(email)) {
        let newComment = {
          postId: id,
          id: comments.length + 1,
          name: name,
          email: email,
          body: comment,
        };
        setComments([newComment, ...comments]);
      } else {
        alert("please enter correct email");
      }
    } else {
      alert("please fill all the fields");
    }
  };

  const handleFav = () => {
    let localStoragePosts = JSON.parse(localStorage.getItem("favPosts")) || [];
    if (fav == true) {
      localStoragePosts = localStoragePosts.filter((post) => {
        return post.id !== blog.id;
      });
      setFav(false);
    } else {
      localStoragePosts.push(blog);
      setFav(true);
    }
    localStorage.setItem("favPosts", JSON.stringify(localStoragePosts));
  };

  const checkFav = () => {
    let localStoragePosts = localStorage.getItem("favPosts") || [];
    if (localStoragePosts.includes(JSON.stringify(blog))) {
      setFav(true);
    }
  };

  useEffect(() => {
    fetchPost();
    fetchAuthors();
    fetchComments();
  }, []);
  useEffect(() => {
    checkFav();
  }, [blog]);

  return (
    <>
      <Navbar />
      <div className="blogPage">
        <div className="blogPage-Topbtn">
          <button className="btn-home">
            <Link to="/" style={{ textDecoration: "none", color: "white" }}>
              Go Home
            </Link>
          </button>
          <button className="btn-fav" onClick={handleFav}>
            {fav ? "Remove from Favourites" : "Add to Favourites"}
          </button>
        </div>
        {blog !== undefined ? (
          <>
            <div className="blogPage-head">
              <span className="blogPage-title">
                {blog.title.split(" ").splice(0, 4).join(" ")}
              </span>
              <span className="blogPage-date">June 24, 2023</span>
            </div>
            <div className="blogPage-author">
              Author: {authors[(id - 1) % 10]}
            </div>
            <div className="blogPage-content">
              <p>{blog.body.repeat(5)}</p>
              <p>{blog.body.repeat(8)}</p>
              <p>{blog.body.repeat(5)}</p>
            </div>
          </>
        ) : (
          <>
          </>
        )}
      </div>
      <div className="Comment-Form">
        <div className="Comment-Form-head">Comment Form</div>
        <div className="Comment-Form-input">
          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <input
            type="text"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <textarea
            type="text"
            placeholder="Add a Comment..."
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />
        </div>
        <button className="comment-btn" onClick={addComment}>
          Add a Comment
        </button>
        <hr />
      </div>
      <div className="comment-box">
        <div className="comment-head-p">
          <div className="comment-head">{comments.length} Comments</div>
        </div>
        {comments.length !== 0 &&
          comments.map((comment) => (
            <div className="comment">
              <div className="comment-u">
                <div className="com-img">
                  <img src={user} alt="" />
                </div>
                <div className="com-details">
                  <span className="com-name">
                    {comment.name.split(" ").splice(0, 2).join(" ")}
                  </span>
                  <span className="com-email">{comment.email}</span>
                </div>
              </div>
              <div className="com-body-p">
                <p className="com-body">{comment.body}</p>
              </div>
              <hr />
            </div>
          ))}
      </div>
    </>
  );
};

export default BlogPage;

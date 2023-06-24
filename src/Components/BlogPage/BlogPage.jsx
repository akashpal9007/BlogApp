import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import './BlogPage.css'
import Navbar from '../Navbar/Navbar'
import user from '../../assets/account.png'

const BlogPage = () => {
  const { id } = useParams();
  const [blog, setBlog] = useState();
  const [authors, setAuthors] = useState([]);
  const [comments, setComments] = useState([]);

  const fetchPost = async () => {
    const res = await axios.get(
      `https://jsonplaceholder.typicode.com/posts/${id}`
    );
    setBlog(res.data);
  };

  const fetchAuthors = async () => {
    const res = await axios.get(`https://jsonplaceholder.typicode.com/users`);
    let auth = res.data.map((user)=>{
      return user.name;
    })
    setAuthors(auth)
  }

  const fetchComments = async () => {
    const res = await axios.get(`https://jsonplaceholder.typicode.com/comments?postId=${id}`);
    let com = res.data.map((user)=>{
      return user;
    })
    setComments(com)
  }

  useEffect(() => {
    fetchPost();
    fetchAuthors();
    fetchComments();
  }, []);

  return (
    <>
    <Navbar />
    <div className="blogPage">
        <div className="blogPage-Topbtn">
            <button className="btn-home">Home</button>
            <button className="btn-fav">Add to Favourites</button>
        </div>
      {blog !== undefined ? (
        <>
          <div className="blogPage-head">
            <span className="blogPage-title">{blog.title.split(" ").splice(0,4).join(" ")}</span>
            <span className="blogPage-date">June 24, 2023</span>
          </div>
          <div className="blogPage-author">Author: {authors[(id-1)%10]}</div>
          <div className="blogPage-content">
            <p>{blog.body.repeat(5)}</p>
            <p>{blog.body.repeat(8)}</p>
            <p>{blog.body.repeat(5)}</p>
          </div>
        </>
      ) : (
        <div>loading</div>
      )}
    </div>
    <div className="comment-box">
        <div className="comment-head-p">
            <div className="comment-head">{comments.length} Comments</div>
            <button className="comment-btn">Add a Comment</button>
        </div>
    {comments.length !== 0 && comments.map((comment)=>(
        <div className="comment">
            <div className="comment-u">
                <div className="com-img">
                <img src={user} alt="" />
                </div>
                <div className="com-details">
                    <span className="com-name">{comment.name.split(" ").splice(0,2).join(" ")}</span>
                    <span className="com-email">{comment.email}</span>
                </div>
            </div>
            <div className="com-body-p">
                <p className="com-body">{comment.body}</p>
            </div>
            <hr />
        </div>
    ))
}
</div>
    </>
  );
};

export default BlogPage;

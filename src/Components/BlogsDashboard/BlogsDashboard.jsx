import axios from 'axios';
import React, { useEffect, useState } from 'react'
import BlogCard from '../BlogCard/BlogCard'
import './BlogsDashboard.css'
import Pagination from '../Pagination/Pagination';

const BlogsDashboard = () => {
    const [blogPosts, setBlogPosts] = useState([]);
    const [authors, setAuthors] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [postsPerPage] = useState(12);

    const indexOfLastPost = currentPage * postsPerPage;
   const indexOfFirstPost = indexOfLastPost - postsPerPage;
   const currentPosts = blogPosts.slice(indexOfFirstPost, indexOfLastPost);

    const fetchPosts = async () => {
        const res = await axios.get(`https://jsonplaceholder.typicode.com/posts`);
        setBlogPosts(res.data)
      }
    const fetchAuthors = async () => {
        const res = await axios.get(`https://jsonplaceholder.typicode.com/users`);
        let auth = res.data.map((user)=>{
          return user.name;
        })
        setAuthors(auth)
      }
    useEffect(() => {
      fetchPosts();
      fetchAuthors();
    }, [])
    
  return (
    <div className='BlogDashboard'>
        <div className='BlogDashboard-head'>Latest Posts</div>
        <div className='BlogPosts'>
        {blogPosts.length !== 0 && currentPosts.map((blog)=>(
        <BlogCard id={blog.id} title={blog.title} author={authors[(blog.id-1)%10]} content={blog.body} />
        )
        )
        }
        <Pagination postsPerPage={postsPerPage} totalPosts={blogPosts.length} currentPage={currentPage} setCurrentPage={setCurrentPage}/>
        </div>
    </div>
  )
}

export default BlogsDashboard
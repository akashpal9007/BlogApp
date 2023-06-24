import axios from 'axios';
import React, { useEffect, useState } from 'react'
import BlogCard from '../BlogCard/BlogCard'
import Navbar from '../Navbar/Navbar';
import './Favourites.css'

const Favourites = () => {
    const [blogPosts, setBlogPosts] = useState([]);
    const [authors, setAuthors] = useState([]);

    const fetchAuthors = async () => {
        const res = await axios.get(`https://jsonplaceholder.typicode.com/users`);
        let auth = res.data.map((user)=>{
          return user.name;
        })
        setAuthors(auth)
      }

      
    useEffect(() => {
        let results = JSON.parse(localStorage.getItem("favPosts"));
        setBlogPosts(results)
        fetchAuthors();
    }, [])
    
  return (
    <>
        <Navbar />
        <div className='Fav'>
        <div className='Fav-head'>Favourite Posts</div>
        <div className='fav-blogCard-p'>
        {blogPosts.length !== 0 ? blogPosts.map((blog)=>(
        <BlogCard id={blog.id} title={blog.title} author={authors[(blog.id-1)%10]} content={blog.body} />
        )
        ):(
            <div className='fav-warning'>Nothing to show here! You haven't added any favourite Blogs</div>
        )
        }
        </div>
    </div>
    </>
  )
}

export default Favourites
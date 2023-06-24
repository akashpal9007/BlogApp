import React from 'react'
import { Link } from 'react-router-dom'
import './BlogCard.css'

const BlogCard = ({id, title, author, content}) => {
  const handleReadMore = () => {

  }
  return (
    <div className='BlogCard'>
        <div className='BlogCard-U'>
          <img src="https://images.unsplash.com/photo-1602080858428-57174f9431cf?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=951&q=80" alt="" />
        </div>
        <div className='BlogCard-D'>
            <div className='Blog-title'>{title.split(" ").splice(0,3).join(" ")}</div>
            <div className='Blog-author'>{'- '+author}</div>
            <div className='Blog-content'>{content.split(" ").splice(0,10).join(" ")+"..."}</div>
        </div>
          <button className='readMore-btn' onClick={()=>handleReadMore(id)}><Link to={`/posts/${id}`}>Read More </Link></button>
    </div>
  )
}

export default BlogCard
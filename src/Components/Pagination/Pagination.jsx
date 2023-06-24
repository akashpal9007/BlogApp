import React from 'react'
import './Pagination.css'

const Pagination = ({ postsPerPage, totalPosts, currentPage, setCurrentPage }) => {
   const handlePrev = () => {
      if(currentPage !== 1) setCurrentPage(currentPage-1);
   }
   const handleNext = () => {
      if(currentPage < Math.ceil(totalPosts / postsPerPage)) setCurrentPage(currentPage+1);
   }
    const pageNumbers = [];
  
    for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
       pageNumbers.push(i);
    }
    
    console.log(currentPage);
    return (
       <div className="pagination-container">
         <button className='btn-prev' onClick={handlePrev}>prev</button>
          {
            pageNumbers.map((page,index) => {
                return <button key={index} onClick={()=> setCurrentPage(page)}>{page}</button>
            })
          }
          <button className='btn-next' onClick={handleNext}>next</button>
       </div>
    );
 };
 
export default Pagination
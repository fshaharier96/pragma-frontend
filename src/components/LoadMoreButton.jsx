import React from 'react'

const LoadMoreButton = () => {

  const handleLoadMore = () =>{
    
  }
  return (
    <button 
    onClick = {handleLoadMore}
    className="rounded-lg bg-orange-600 text-white px-4 py-2 hover:bg-orange-700 transition">
      Load More
    </button>
  )
}

export default LoadMoreButton
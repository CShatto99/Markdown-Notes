import React from 'react'

const NotFound = () => {
  return (
    <div className='not-found text-center'>
      <h1 className='text-primary'>
        <i className='fa fa-exclamation-triangle'></i> Page Not Found
      </h1>
      <p className='lead'>Sorry, this page does not exist</p>
    </div>
  )
}

export default NotFound

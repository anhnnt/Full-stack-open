import PropsTypes from 'prop-types'
import { useState } from 'react'

const Blog = ({ blog, user, handleLike, handleDelete }) => {
  const [view, setView] = useState(true)

  const hideComponent = { display: view ? 'none' : '' }
  const showComponent = { display: view ? '' : 'none' }

  const toggleView = () => {
    setView(!view)
  }

  const addLike = () => {
    const updated = ({
      ...blog,
      likes: blog.likes + 1
    })
    handleLike(blog.id, updated)
  }

  const addDelete = () => {
    if (window.confirm(`Delete ${blog.title} by ${blog.author}`)) {
      handleDelete(blog.id)
    }
  }

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  return (
    <div style={blogStyle} className='blog'>
      <div style={showComponent} className='originalContent'>
        {blog.title} - {blog.author}
        <button id="view-button" onClick={toggleView}>View</button>
      </div>
      <div style={hideComponent} className='expandContent' id="expand-content">
        <div>
          {blog.title} - {blog.author}
          <button onClick={toggleView}>Hide</button>
          <div>
            {blog.url}
          </div>
          <p>
            <span id="blog-like">
              likes: {blog.likes}
            </span>
            <button id="like-button" onClick={addLike}>like</button>
          </p>
          {blog.user.name}
          {user.name === blog.user.name &&
          <button id="delete-button" onClick={addDelete}>Delete</button>
          }
        </div>
      </div>
    </div>
  )
}

Blog.protoTypes = {
  blog: PropsTypes.shape({
    title: PropsTypes.string,
    author: PropsTypes.string,
    url: PropsTypes.string,
    likes: PropsTypes.number,
    user: PropsTypes.objectOf(
      PropsTypes.shape({
        name: PropsTypes.string
      })
    )
  }).isRequired,
  user: PropsTypes.shape({
    name: PropsTypes.string
  }).isRequired,
  handleDelete: PropsTypes.func.isRequired,
  handleLike: PropsTypes.func.isRequired
}

export default Blog
import { useState } from 'react'

const BlogForm = ({
  handleCreate
}) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const addBlog = (event) => {
    event.preventDefault()
    handleCreate({
      title: title,
      author: author,
      url: url
    })

    setTitle('')
    setAuthor('')
    setUrl('')
  }

  return (
    <div>
      <form onSubmit={addBlog} id="form-blog">
        <div>
          Title
          <input
            id="title"
            type="text"
            value={title}
            name="Title"
            required
            placeholder="Enter the title"
            onChange={event => setTitle(event.target.value)}
          />
        </div>
        <div>
          Author
          <input
            id="author"
            type="text"
            value={author}
            name="Author"
            placeholder="Enter the author"
            onChange={event => setAuthor(event.target.value)}
          />
        </div>
        <div>
          URL
          <input
            id="url"
            type="text"
            value={url}
            name="URL"
            required
            placeholder="Enter the URL"
            onChange={event => setUrl(event.target.value)}
          />
        </div>
        <button id="form-button" type="submit">Create</button>
      </form>
    </div>
  )
}

export default BlogForm
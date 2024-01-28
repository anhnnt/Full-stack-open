import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import Notification from './components/Notification'
import BlogForm from './components/BlogForm'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState('')
  const [info, setInfo] = useState({ message: null })
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )
  }, [])

  useEffect(() => {
    const loggedUserJSOn = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSOn) {
      const user = JSON.parse(loggedUserJSOn)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const notifyWith = (message, type='info') => {
    setInfo({
      message, type
    })

    setTimeout(() => {
      setInfo({ message: null })
    }, 3000)
  }

  const handleLogin = async (event) => {
    event.preventDefault()
    console.log('logging in with', username, password)

    try {
      const user = await loginService.login({
        username, password
      })

      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      )
      blogService.setToken(user.token)
      setUser(user)
      notifyWith(`${username} has just logged in`)
      setUsername('')
      setPassword('')
    } catch (exception) {
      console.log('Wrong credentials')
      notifyWith('error: wrong name or password', 'error')
    }
  }

  const handleLogout = (event) => {
    event.preventDefault()
    window.localStorage.removeItem('loggedBlogappUser')
    setUser()
    notifyWith('Log out successfully')
  }

  const handleCreate = (blogObject) => {
    blogService
      .create(blogObject)
      .then(returnedObject => {
        setBlogs(blogs.concat(returnedObject))
        notifyWith(`${returnedObject.title} by ${returnedObject.author} added`)
      })
  }

  const handleLike = async (id, likeObject) => {
    try {
      const response = await blogService.addLike(id, likeObject)
      notifyWith(`Liked ${likeObject.title}`)
      setBlogs(
        blogs.map((blog) => (blog.id === response.id ? response : blog))
      )
    }
    catch (exception) {
      notifyWith(`Failed like ${likeObject.title}`)
    }
  }

  const handleDelete = async(id) => {
    try {
      const response = await blogService.deleteBlog(id, user)
      const updatedBlog = blogs.filter(blog => blog.id !== id)
      setBlogs(updatedBlog)
      notifyWith('Blog deleted')
    } catch (error) {
      notifyWith('Deleted failed')
    }
  }

  const loginForm = () => (
    <form onSubmit={handleLogin} id="login-form">
      <h2>Log in to application</h2>
      <div>
        Username
        <input
          id="username"
          type="text"
          value={username}
          name="Username"
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div>
        Password
        <input
          id="password"
          type="password"
          value={password}
          name="Password"
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <button type="submit" id="login-button">Login</button>
    </form>
  )

  const blog = () => (
    <div>
      <h2>blogs</h2>
      {blogs.slice().sort((a,b) => b.likes - a.likes).map(blog =>
        <Blog key={blog.id} blog={blog} user={user} handleLike={handleLike} handleDelete={handleDelete}/>
      )}
    </div>
  )

  const blogForm = () => {
    const hideWhenVisible = { display: visible ? 'none' : '' }
    const showWhenVisible = { display: visible ? '' : 'none' }

    return (
      <div>
        <h2>Create new blog</h2>
        <div style={hideWhenVisible}>
          <button id="create" onClick={() => setVisible(true)}>Create</button>
        </div>

        <div style={showWhenVisible} className='togglableContent'>
          <BlogForm
            handleCreate={handleCreate}
          />
          <button onClick={() => setVisible(false)}>Cancel</button>
        </div>
      </div>
    )
  }


  return (
    <div>
      <Notification info={info} />
      {!user && loginForm()}
      {user && <div>
        <p>{user.name} logged in</p>
        <button onClick={handleLogout}>Log out</button>
        {blogForm()}
        {blog()}
      </div>}
    </div>
  )
}

export default App
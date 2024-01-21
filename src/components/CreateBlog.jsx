const CreateBlog = ({ addBlog, newBlog, setNewBlog }) => {
    return (
    <div>
    <h2>create new</h2>
    <form onSubmit={addBlog}>
      title: <input
        type="text" 
        value={newBlog.title}
        onChange={({ target }) => setNewBlog({...newBlog, title: target.value})}
      />
      <br/>
      author: <input 
        type="text"
        value={newBlog.author}
        onChange={({ target }) => setNewBlog({...newBlog, author: target.value})}
      />
      <br/>
      url: <input 
        type="text"
        value={newBlog.url}
        onChange={({ target }) => setNewBlog({...newBlog, url: target.value})}
      />
      <br/>
      <button type='submit'>create</button>
    </form>
    </div>
    )
  }

  export default CreateBlog
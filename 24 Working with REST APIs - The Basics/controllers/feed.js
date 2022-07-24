module.exports.getPosts = (req, res, next) => {
  res.status(200).json({ posts: [{ title: 'post title', content: 'post content' }] });
};

module.exports.postPost = (req, res, next) => {
  const { title, content } = req.body;
  // Accessing the db
  res.status(201).json({
    message: 'Post is created successfully',
    title,
    content
  })
}
const Post = require('../models/post');

module.exports.getPosts = (req, res, next) => {
  const currentPage = req.query.page || 1;
  const perPage = 2;
  let totalItems;
  Post.find().countDocuments()
    .then(count => {
      totalItems = count;
      return Post.find()
        .skip((currentPage - 1) * perPage)
        .limit(perPage);
    })
    .then(posts => {
      if (!posts) {
        res.status(404).json({
          message: 'Could not find posts.',
        })
      }
      res.status(200).json({
        message: 'Posts fetched successfully.',
        posts: posts,
        totalItems: totalItems
      });
    })
    .catch(err => {
      console.log(err);
    });
};

module.exports.postPost = (req, res, next) => {
  const { title, content } = req.body;
  console.log(req.file);
  let imageUrl = 'images/me.jpg';
  if (req.file) {
    imageUrl = req.file.path;
  }
  const post = new Post({
    title,
    content,
    imageUrl,
    creator: {
      name: 'Maximilian'
    },
  });
  post.save().then((post) => {
    res.status(201).json({
      message: 'Post is created successfully',
      post
    });
  }).catch((err) => {
    console.log(err);
  });
}

module.exports.getPost = (req, res, next) => {
  const postId = req.params.postId;
  Post.findById(postId)
    .then(post => {
      if (!post) {
        res.status(404).json({
          message: 'Could not find post.',
        })
      }
      res.status(200).json({
        message: 'Post is fetched successfully.',
        post
      });
    })
    .catch(err => {
      res.status(500).json({
        message: err
      })
    }
    );
}
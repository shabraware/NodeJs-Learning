const express = require('express');

const feedController = require('../controllers/feed');

const router = express.Router();

// GET /feed/posts
router.get('/posts', feedController.getPosts);

// GET /feed/posts/postId
router.get('/posts/:postId', feedController.getPost);

// POST /feed/post
router.post('/post', feedController.postPost);

module.exports = router;
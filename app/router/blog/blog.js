const express = require('express');
const router = express.Router();
const blogController = require('../../controller/blog/blog');
const upload = require('../../utils/imageUpload');

router
    .post('/', upload.single('image'), blogController.createBlog)
    .get('/', blogController.getBlogs)
    .get('/:id', blogController.getBlog)
    .put('/:id', upload.single('image'), blogController.updateBlog)
    .delete('/:id', blogController.deleteBlog)
    .post('/add-comment', blogController.addComment)
    .post('/add-reply', blogController.addReply)

module.exports = router;
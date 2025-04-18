const blogService = require('../../service/blog/blog');

class BlogController {
    async createBlog(req, res) {
        try {
            const { title, description } = req.body;
            const image = req.file ? req.file.path : null;
            const result = await blogService.create({ title, image, description });
            res.status(201).json(result);
        } catch (err) {
            res.status(400).json({ message: err.message });
        }
    }

    async getBlogs(req, res) {
        try {
            const blogs = await blogService.getAll();
            res.status(200).json(blogs);
        } catch (err) {
            res.status(500).json({ message: err.message });
        }
    }

    async getBlog(req, res) {
        try {
            const blog = await blogService.getById(req.params.id);
            res.status(200).json(blog);
        } catch (err) {
            res.status(404).json({ message: err.message });
        }
    }

    async updateBlog(req, res) {
        try {
            const { title, description } = req.body;
            const image = req.file ? req.file.path : null;
            const result = await blogService.update(req.params.id, { title, image, description });
            res.status(200).json(result);
        } catch (err) {
            res.status(400).json({ message: err.message });
        }
    }

    async deleteBlog(req, res) {
        try {
            const result = await blogService.delete(req.params.id);
            res.status(200).json(result);
        } catch (err) {
            res.status(404).json({ message: err.message });
        }
    }

    async addComment(req, res) {
        try {
            const { blogId, userId, comment } = req.body;
            const result = await blogService.addComment({ blogId, userId, comment });
            res.status(200).json(result);
        } catch (err) {
            res.status(404).json({ message: err.message });
        }
    }

    async addReply(req, res) {
        try {
            const { blogId, commentId, userId, reply } = req.body;
            const result = await blogService.addReply({ blogId, commentId, userId, reply });
            res.status(200).json(result);
        } catch (err) {
            res.status(404).json({ message: err.message });
        }
    }
}

module.exports = new BlogController();
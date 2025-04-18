const Blog = require("../../model/blog");

class BlogService {
    async createBlog({ title, image, description, userId }) {
        const existing = await Blog.findOne({ title });
        if (existing) throw new Error("Blog already exists");

        const blog = new Blog({
            title,
            image: image || null,
            description,
            userId: userId,
        });

        await blog.save();
        return { message: "Blog added successfully" };
    }

    async getBlogs(userId) {
        const blogs = await Blog.find({ userId });
        return { success: true, message: "List fetched successfully", result: blogs };
    }

    async getBlog({ blogId, userId }) {
        const blog = await Blog.findOne({ _id: blogId, userId });
        if (!blog) throw new Error("Blog not found");
        return { success: true, message: "Blog fetched successfully", result: blog };
    }

    async updateBlog({ blogId, title, description, image, userId }) {
        const exist = await Blog.findOne({ _id: blogId, userId });
        if (!exist) throw new Error("Blog does not exist");

        const blog = await Blog.findByIdAndUpdate(
            blogId, {
                title,
                description,
                image,
            }, { new: true }
        );
        return { success: true, message: "Blog updated successfully", result: blog };
    }

    async deleteBlog({ blogId, userId }) {
        const exist = await Blog.findOne({ _id: blogId, userId });
        if (!exist) throw new Error("Blog does not exist");
        await Blog.findByIdAndDelete(blogId);
        return { success: true, message: "Blog deleted successfully" };
    }

    async addComment({ blogId, userId, comment }) {
        const blog = await Blog.findById(blogId);
        if (!blog) throw new Error("Blog not found");

        const newComment = {
            userId,
            comment,
            replies: [],
            createdAt: new Date(),
        };

        blog.comments.push(newComment);
        await blog.save();

        return { success: true, message: "Comment added successfully", comment: newComment };
    }

    async addReply({ blogId, commentId, userId, reply }) {
        const blog = await Blog.findById(blogId);
        if (!blog) throw new Error("Blog not found");

        const comment = blog.comments.id(commentId);
        if (!comment) throw new Error("Comment not found");

        const newReply = {
            userId,
            reply,
            createdAt: new Date(),
        };

        comment.replies.push(newReply);
        await blog.save();

        return { success: true, message: "Reply added successfully", reply: newReply };
    }
}

module.exports = new BlogService();
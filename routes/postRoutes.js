const express = require("express");
const router = express.Router();
const Post = require("../models/Post");

router.get("/", async (req, res) => {
    try {
        let { page = 1, limit = 10, sortBy = "id", order = "asc" } = req.query;

        page = parseInt(page);
        limit = parseInt(limit);

        const sortOrder = order === "asc" ? 1 : -1;

        const posts = await Post.find()
            .sort({ [sortBy]: sortOrder })
            .skip((page - 1) * limit)
            .limit(limit);

        const total = await Post.countDocuments();

        res.json({
            total,
            page,
            pages: Math.ceil(total / limit),
            data: posts
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
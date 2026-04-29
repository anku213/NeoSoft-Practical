const axios = require("axios");
const Post = require("../models/Post");

const fetchAndStore = async () => {
    try {
        const { data } = await axios.get("https://jsonplaceholder.typicode.com/posts");

        await Post.deleteMany();
        await Post.insertMany(data);

        console.log("Data inserted successfully");
    } catch (error) {
        console.error("Error fetching data:", error.message);
    }
};

module.exports = fetchAndStore;
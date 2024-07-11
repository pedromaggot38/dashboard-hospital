import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    id: {
        type: String,
        default: () => new mongoose.Types.ObjectId().toString(),
        unique: true,
    },
    username: {
        type: String,
        unique: true,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        required: true,
    },
    image: {
        type: String,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    posts: [{
        type: Schema.Types.ObjectId,
        ref: 'Post',
    }],
});

const postSchema = new mongoose.Schema({
    id: {
        type: Number,
        default: 0,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    updatedAt: {
        type: Date,
        default: Date.now,
    },
    title: {
        type: String,
        required: true,
    },
    content: {
        type: String,
    },
    published: {
        type: Boolean,
        default: false,
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
    },
    userId: {
        type: String,
        required: true,
    },
});

// Middleware to auto-increment post id
postSchema.pre('save', async function (next) {
    if (this.isNew) {
        const post = await Post.findOne().sort({ id: -1 });
        this.id = post ? post.id + 1 : 1;
    }
    next();
});

// Middleware to update updatedAt
postSchema.pre('save', function (next) {
    if (this.isModified()) {
        this.updatedAt = Date.now();
    }
    next();
});

// Creating Models
const User = mongoose.model('User', userSchema);
const Post = mongoose.model('Post', postSchema);

module.exports = { User, Post };
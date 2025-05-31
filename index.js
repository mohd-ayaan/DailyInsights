// app.js (Fully converted to ES Module syntax)

// Correct way to load dotenv in ES Modules
import 'dotenv/config';

import express from 'express';
import bodyParser from 'body-parser'; // Still a valid ES Module import for now
import mongoose from 'mongoose';

// --- MongoDB Connection ---
const MONGODB_URI = process.env.MONGODB_URI;

mongoose.connect(MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log("MongoDB Connected successfully!"))
.catch(err => console.error("MongoDB connection error:", err));

// --- Mongoose Schema ---
const ComposeSchema = new mongoose.Schema({
  title: String,
  post: String
}, {
  timestamps: true
});

const Compose = mongoose.model('Compose', ComposeSchema);

// --- Express App Setup ---
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true })); // Use if you're keeping body-parser

app.set('view engine', 'ejs');

// --- Routes ---

app.get('/', async (req, res) => {
  const posts = await Compose.find();
  res.render('index', { posts });
});

app.get('/create', (req, res) => {
  res.render('create');
});

app.post("/post/create", async(req, res) => {
    await Compose.create({
    title: req.body.title,
    post: req.body.content
  });
  res.redirect("/");
});

// --- Delete Post Route ---
app.post("/posts/:id/delete", async (req, res) => {
    try {
        await Compose.findByIdAndDelete(req.params.id);
        res.redirect("/");
    } catch (error) {
        console.error("Error deleting post:", error);
        res.status(500).send("Error deleting post.");
    }
});

// GET route to display the edit form
app.get("/posts/:id/edit", async (req, res) => {
    try {
        const post = await Compose.findById(req.params.id);
        if (!post) {
            return res.status(404).send("Post not found.");
        }
        res.render("edit", { post });
    } catch (error) {
        console.error("Error fetching post for edit:", error);
        res.status(500).send("Error loading edit page.");
    }
});

// POST route to handle the submission of the edited post
app.post("/posts/:id/edit", async (req, res) => {
    try {
        const { title, content } = req.body;
        await Compose.findByIdAndUpdate(req.params.id, { title, post: content });
        res.redirect(`/posts/${req.params.id}`);
    } catch (error) {
        console.error("Error updating post:", error);
        res.status(500).send("Error updating post.");
    }
});

app.get("/posts/:id",async(req,res)=>{
  const post = await Compose.findById(req.params.id);
  res.render("posts", { post });
});

app.get('/aboutus', (req,res)=>{
  res.render("aboutus");
});

// --- Server Start ---
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
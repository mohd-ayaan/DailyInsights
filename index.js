import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();


const dbPassword = process.env.DB_PASSWORD;
const encodedPassword = encodeURIComponent(dbPassword);

mongoose.connect(`mongodb+srv://user_ayaan_31:${encodedPassword}@cluster0.dmifkqb.mongodb.net/`, {
  // useNewUrlParser: true,
  // useUnifiedTopology: true
});   


const ComposeSchema = new mongoose.Schema({
  title: String,
  post: String
}, {
  timestamps: true 
});

const Compose = mongoose.model('Compose', ComposeSchema);


const app = express();//used to create an instance of the Express.js application. This instance is stored in the variable app, which is then used to configure middleware, define routes, and start the server.
// const port = 3000;
const PORT = process.env.PORT || 3000;

app.use(express.static("public"));//used to serve static files from a directory named "public".
app.use(bodyParser.urlencoded({ extended: true }));// used to parse incoming request bodies with URL-encoded data.
app.set('view engine', 'ejs');


app.get('/', async (req, res) => {
  const posts = await Compose.find();
  res.render('index', { posts });

});

app.get('/create', (req, res) => {
  res.render('create');
  
}); 


app.post("/post/create", async(req, res) => {
  const title = req.body.title;
  const content=req.body.content;
 
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
        res.render("edit", { post }); // You'll need to create an 'edit.ejs' file
    } catch (error) {
        console.error("Error fetching post for edit:", error);
        res.status(500).send("Error loading edit page.");
    }
});

// POST route to handle the submission of the edited post
app.post("/posts/:id/edit", async (req, res) => {
    try {
        const { title, content } = req.body; // Destructure title and content from request body
        await Compose.findByIdAndUpdate(req.params.id, { title, post: content }); // 'post' is the field name in your schema
        res.redirect(`/posts/${req.params.id}`); // Redirect to the updated post's detail page
    } catch (error) {
        console.error("Error updating post:", error);
        res.status(500).send("Error updating post.");
    }
});

app.get("/posts/:id",async(req,res)=>{

const post = await Compose.findById(req.params.id);
    res.render("posts", { post });


});

app.get('/aboutus',(req,res)=>{
  res.render("aboutus");
})

// app.listen(port, () => {
//   console.log(`Listening on port: ${port}`);
// });
app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server is running on port ${PORT}`);
    // console.log(`Server is also accessible at http://localhost:${PORT}`); // For local testing
});

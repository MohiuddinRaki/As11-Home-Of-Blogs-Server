const express = require("express");
const cors = require("cors");
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
require("dotenv").config();
const app = express();
const port = process.env.PORT || 5000;

// middleWare:
app.use(cors());
app.use(express.json());

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.rxjjt.mongodb.net/?retryWrites=true&w=majority`;
console.log(uri);

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    // await client.connect();

    const userBlogCollection = client.db("userBlogDB").collection("userBlog");
    const addBlogCollection = client.db("addBlogDB").collection("addBlog");
    const wishlistCollection = client.db("wishlistDB").collection("wishlist");

    // for all add Blogs:
    app.post("/addBlog", async (req, res) => {
      const newAddBlog = req.body;
      console.log(newAddBlog);
      const result = await addBlogCollection.insertOne(newAddBlog);
      res.send(result);
    });

    app.get("/addBlog", async (req, res) => {
      const cursor = addBlogCollection.find();
      const result = await cursor.toArray();
      res.send(result);
    });

    // for get specify Blog Details when click any blog:
    app.get("/addBlog/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const result = await addBlogCollection.findOne(query);
      res.send(result);
    });

    // Add to Wishlist:
    app.post("/wishlist", async (req, res) => {
      const newWishlist = req.body;
      console.log(newWishlist);
      const result = await wishlistCollection.insertOne(newWishlist);
      res.send(result);
    });

    app.get("/wishlist", async (req, res) => {
      const cursor = wishlistCollection.find();
      const result = await cursor.toArray();
      res.send(result);
    });

    // for get specify user added Wishlist when click any add to Wishlist button:
    app.get("/wishlist/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const result = wishlistCollection.findOne(query);
      res.send(result);
    });

    // for delete:
    app.delete("/wishlist/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const result = await wishlistCollection.deleteOne(query);
      res.send(result);
    });

    // for user:
    app.post("/userBlog", async (req, res) => {
      const newUserBlog = req.body;
      console.log(newUserBlog);
      const result = await userBlogCollection.insertOne(newUserBlog);
      res.send(result);
    });

    // Send a ping to confirm a successful connection
    // await client.db("admin").command({ ping: 1 });
    console.log(
      "Pinged your deployment. You successfully connected to MongoDB!"
    );
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);

app.get("/", (req, res) => {
  res.send("As-11 Is Runnung");
});

app.listen(port, () => {
  console.log(`As-11 Is Runnung On Port ${port}`);
});

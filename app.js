/************************/
//
//   Blog-Website
//   m@nish © 2022
//
/************************/
/*----------------------------------------------------------------------------*/
require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require("mongoose");
const path = require("path");
const _ = require("lodash");
/*----------------------------------------------------------------------------*/
const app = express();
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
/*----------------------------------------------------------------------------*/
app.listen(3000, function () {});
/*----------------------------------------------------------------------------*/
/*-----------------------------DATABASE-------------------------------------*/
mongoose.connect(
  "mongodb+srv://admin-blog-website:" +
    process.env.MONGO_DB_PASSWORD +
    "@cluster0.ngpc9.mongodb.net/blogWebsiteDB"
);

const postSchema = new mongoose.Schema({
  postTitle: String,
  postContent: String,
});

const Post = mongoose.model("Post", postSchema);

/*----------------------------------------------------------------------------*/
const homeStartingContent =
  "Lacus vel facilisis volutpat est velit egestas dui id ornare. Semper auctor neque vitae tempus quam. Sit amet cursus sit amet dictum sit amet justo. Viverra tellus in hac habitasse. Imperdietellentesque adipiscing.pat est velit egestas dui id ornare. Semper auctor neque vitae tempus quam. Sit amet cursus sit amet dictum sit amet justo. Viverra tellus in hac habitasse. Imperdiet proin fermentum leo vel orci or neque vitae tempus quam. Sit amet cursus sit amet dictum sit amet justo. Viverra tellus in hac habitasse. Imperdiet proin fermentum leo vel orci porta. Donec ultrices tincidunt arcu n risus sed vulputate odio ut. Cursus mattis molestie a iaculis at erat pellentesque adipiscing.";
const aboutContent =
  "Hac habitasse platea dictumst vestibulum rhoncus est pellentesque. Dictumst vestibulum rhoncus est pellentesque elit ullamcorper. Non diam phasellus vestibulum lorem sed. Platea dictumst quisque sagittis purus sit. Egestas sed sed risus pretium quam vulputate dignissim suspendisse. Mauris in aliquam sem fringilla. Semper risus in hendrerit gravida rutrum quisque non tellus orci. Amet massa vitae tortor condimentum lacinia quis vel eros. Enim ut tellus elementum sagittis vitae. Mauris ultrices eros in cursus turpis massa tincidunt dui.";
const contactContent =
  "Scelerisque eleifend donec pretium vulputate sapien. Rhoncus urna neque viverra justo nec ultrices. Arcu dui vivamus arcu felis bibendum. Consectetur adipiscing elit duis tristique. Risus viverra adipiscing at in tellus integer feugiat. Sapien nec sagittis aliquam malesuada bibendum arcu vitae. Consequat interdum varius sit amet mattis. Iaculis nunc sed augue lacus. Interdum posuere lorem ipsum dolor sit amet consectetur adipiscing elit. Pulvinar elementum integer enim neque. Ultrices gravida dictum fusce ut placerat orci nulla. Mauris in aliquam sem fringilla ut morbi tincidunt. Tortor posuere ac ut consequat semper viverra nam libero.";

/*---------------------------------GET--------------------------------------*/
/*---------------------------HOME----------------------------------------*/
app.get("/", (req, res) => {
  Post.find({}, (err, foundPosts) => {
    res.render("home", {
      homeStartingContent: homeStartingContent,
      postArray: foundPosts,
    });
  });
});
/*----------------------------------------------------------------------------*/
/*--------------------------ABOUT------------------------------------------*/
app.get("/about", (req, res) => {
  res.render("about", {
    aboutContent: aboutContent,
  });
});
/*----------------------------------------------------------------------------*/
/*--------------------------CONTACT--------------------------------------------*/
app.get("/contact", (req, res) => {
  res.render("contact", {
    contactContent: contactContent,
  });
});
/*----------------------------------------------------------------------------*/
/*--------------------------COMPOSE--------------------------------------------*/
app.get("/compose", (req, res) => {
  res.render("compose");
});
/*--------------------------View Post--------------------------------------------*/
app.get("/post/:postId", (req, res) => {
  const postId = req.params.postId;
  //find that post by its id
  Post.findOne({ _id: postId }, (err, foundPost) => {
    if (!err && foundPost) {
      res.render("post", {
        postTitle: foundPost.postTitle,
        postContent: foundPost.postContent,
        postId: foundPost._id,
      });
    } else {
      res.send("NO post found!");
    }
  });
});
/*---------------------------------POST--------------------------------------*/
/*--------------------------COMPOSE NEW POST--------------------------------------------*/
app.post("/compose", (req, res) => {
  const newPost = new Post({
    postTitle: req.body.postTitle,
    postContent: req.body.postContent,
  });
  newPost.save((err) => {
    if (!err) {
      res.redirect("/");
    }
  });
});

/*---------------------------------POST--------------------------------------*/
/*--------------------------DELETE THE POST-----------------------------------*/
app.post("/delete", (req, res) => {
  const postIdToDelete = req.body.delete;
  Post.findByIdAndDelete(postIdToDelete, (err, deletedPost) => {
    if (!err) {
      res.redirect("/");
    }
  });
});

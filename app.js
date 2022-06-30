const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const _ = require("lodash");

const homeStartingContent = "This is Daily journal blog web applications's Home Page, here you can find all blogs written by users. Here if you want to add your blog then in navbar go to compose and you can post your blog too.";
const aboutContent = "This is daily journal blog web application. This web application build during my fullstack web development course of angela yu.Here you can easily post your daily journals and write useful blogs so every other user can read it. Here you will get regular updates. All posts are secured and safe. You can easily write your post for that you need to go to compose.but in this is version of daily journals web app without database integration and in next version of this web app i will add database integration and Google Authentication.";
const contactContent = "<h2>Developer Contact</h2><p>Name: Prins Kamariya</p><p>Email Address: kamriyaprince@gmail.com</p>";

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

let posts = [];

app.get("/", function(req, res){
  res.render("home", {
    startingContent: homeStartingContent,
    posts: posts
    });
});

app.get("/about", function(req, res){
  res.render("about", {aboutContent: aboutContent});
});

app.get("/contact", function(req, res){
  res.render("contact");
});

app.get("/compose", function(req, res){
  res.render("compose");
});

app.post("/compose", function(req, res){
  const post = {
    title: req.body.postTitle,
    content: req.body.postBody
  };
  posts.push(post);

  res.redirect("/");

});

app.get("/posts/:postName", function(req, res){
  const requestedTitle = _.lowerCase(req.params.postName);

  posts.forEach(function(post){
    const storedTitle = _.lowerCase(post.title);

    if (storedTitle === requestedTitle) {
      res.render("post", {
        title: post.title,
        content: post.content
      });
    }
  });
});

app.listen(3000, function() {
  console.log("Server started on port 3000");
});

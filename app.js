//imports all the modueles needed
const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const _ = require("lodash");

const homeStartingContent = "Lacus vel facilisis volutpat est velit egestas dui id ornare. Semper auctor neque vitae tempus quam. Sit amet cursus sit amet dictum sit amet justo. Viverra tellus in hac habitasse. Imperdiet proin fermentum leo vel orci porta. Donec ultrices tincidunt arcu non sodales neque sodales ut. Mattis molestie a iaculis at erat pellentesque adipiscing. Magnis dis parturient montes nascetur ridiculus mus mauris vitae ultricies. Adipiscing elit ut aliquam purus sit amet luctus venenatis lectus. Ultrices vitae auctor eu augue ut lectus arcu bibendum at. Odio euismod lacinia at quis risus sed vulputate odio ut. Cursus mattis molestie a iaculis at erat pellentesque adipiscing.";
const aboutContent = "Hac habitasse platea dictumst vestibulum rhoncus est pellentesque. Dictumst vestibulum rhoncus est pellentesque elit ullamcorper. Non diam phasellus vestibulum lorem sed. Platea dictumst quisque sagittis purus sit. Egestas sed sed risus pretium quam vulputate dignissim suspendisse. Mauris in aliquam sem fringilla. Semper risus in hendrerit gravida rutrum quisque non tellus orci. Amet massa vitae tortor condimentum lacinia quis vel eros. Enim ut tellus elementum sagittis vitae. Mauris ultrices eros in cursus turpis massa tincidunt dui.";
const contactContent = "Scelerisque eleifend donec pretium vulputate sapien. Rhoncus urna neque viverra justo nec ultrices. Arcu dui vivamus arcu felis bibendum. Consectetur adipiscing elit duis tristique. Risus viverra adipiscing at in tellus integer feugiat. Sapien nec sagittis aliquam malesuada bibendum arcu vitae. Consequat interdum varius sit amet mattis. Iaculis nunc sed augue lacus. Interdum posuere lorem ipsum dolor sit amet consectetur adipiscing elit. Pulvinar elementum integer enim neque. Ultrices gravida dictum fusce ut placerat orci nulla. Mauris in aliquam sem fringilla ut morbi tincidunt. Tortor posuere ac ut consequat semper viverra nam libero.";

//starts the app and allows you to use ejs, so you can pass data from js to html and vise vera
const app = express();
app.set('view engine', 'ejs');

//allows use to use bodyparser to get the value of inputs, and also the express.static allows the web app to render static elements like css and images
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

//creates an empy array of blog posts that will be added once the clien submits a post
let posts = [];

//get request for the home directory that will give the client the home.ejs page when someone goes to /
app.get("/", function(req,res){
  
  //fcuntion that will be passed through the home.ejs file, the function has the parameters text and limit, when executed the function will check the length of the text
  //then if it is long enough the function will create a new variable and select up to the limit of the functn and add elipses at the end
  //the fucntion will return the shorted text and if it the length isnt large enough it will only return the normal text
  function textLimit(text,limit){
    if(text.length > limit){
      const shorterText = text.slice(0,limit) + '...';
      return shorterText;
    } else{
      return text;
    }
  }
  //the responce to the client is sending them the home page and passing some variables throguh that will be used on the page
  //posts:posts is passing through the arry of posts when the client composes one and redirects to this get method
  //textLimit:textLimit is passing through the fucntion to the home page that will be executed to shorten the posts
  res.render("home", {posts:posts,textLimit:textLimit});
})

//sends the client the about page when they land on /about
app.get("/about", function(req,res){
  res.render("about", {aboutContent:aboutContent});
})
//sends the client the contact page when they land on /client
app.get("/contact", function(req,res){
  res.render("contact", {contactContent:contactContent});
})

//sends the client the compose page when the land on /compose
app.get("/compose", function(req,res){
  res.render("compose");
})
//sends the client error page when they land on a nonexistant page
app.get("404", function(req,res){
  res.render("404");
})

//sends the client to the post page with the corresponding post information
app.get("/posts/:titleName", function(req,res){
  // goes through each object in the posts array and lowercases the title of each post title
  // also lowercases the the input :titleName after /posts, if the array has the input title then it will render the post page and pass the title and body of specific post
  posts.forEach(function(post){
    const lowercaseTitle = _.lowerCase(post.title);
    const lowerCaseTitleName = _.lowerCase(req.params.titleName);
    
    if(lowercaseTitle.includes(lowerCaseTitleName)){
      res.render("post", {postTitle:post.title,postBody:post.body});
    }
  })
})



// creates an object which is the post and then gets the title and body properties from the inputs of the form, then it adds the object to the posts arry and
// redirects to the get request for the home directory
app.post("/compose",function(req,res){
  const post = {
    title:req.body.titleInput,
    body:req.body.bodyInput
  }
  posts.push(post);
  res.redirect("/")
})



//starts the server on port 3000 and logs once it has started

app.listen(3000, function() {
  console.log("Server started on port 3000");
});


require('dotenv').config();

const express = require("express");
const ejs = require("ejs");
const bodyParser = require("body-parser");
var _=require("lodash");
var mongoose = require("mongoose");

mongoose.connect(process.env.ATLAS_URL,function(){
    console.log("Connected");
});

const blogSchema = new mongoose.Schema({
    title: String,
    content: String
})

const Post = mongoose.model("Post", blogSchema);

const app = express();
app.set('view engine','ejs');
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended:true}));

const homeStartingContent = "Lorem Ipsum is simply dummy text of the printing Nunc facilisis enim lectus, sit amet sodales felis volutpat condimentum. Donec cursus euismod erat, non vestibulum justo vehicula at. Donec elementum faucibus sodales. Aliquam erat volutpat. Curabitur a eleifend leo. In augue ligula, vulputate ac nunc non, pulvinar hendrerit mi. Nunc dui ipsum, lacinia ac felis ut, feugiat ornare neque. Donec  Pellentesque commodo sodales tellus ut ultrices. Praesent eros libero, tempus et dapibus ut, tincidunt nec libero. Vestibulum lectus dolor, venenatis sit amet sapien in, iaculis laoreet lectus. Phasellus ut magna aliquam, lobortis leo tincidunt, porttitor massa. Curabitur diam est, vehicula ac dignissim sed, tincidunt et tortor. Nunc feugiat erat ac massa tristique eleifend. Phasellus feugiat eros et dolor fermentum consequa eleifend arcu non porta suscipit. Donec sodales vel sem vel rutrum. Vivamus in arcu sagittis, bibendum tellus et, euismod neque. Donec laoreet rutrum iaculis. Ut venenatis vitae mi at iaculis. Etiam a velit ante. In nulla ante, lacinia vel massa nec, euismod hendrerit ante. In quis ornare nisi, sit amet mattis dolor. Fusce id augue ultrices, semper elit a, rhoncus augue. Nullam auctor mattis fringilla. Nunc consectetur tincidunt tellus et dignissim. Sed nec nunc at risus ornare semper. Praesent lobortis nisi varius, mollis ligula vitae, facilisis elit. Donec volutpat non magna vel euismod. Mauris cursus ultrices lacus, eu finibus dui iaculis hendrerit."
const aboutContent = "Want to see the best about us pages? In this article, we’ll share some awesome about us page examples to inspire you Every website needs an about us page. With a good about us page, you can introduce your new blog or business to visitors. When visitors get to know you and your business better through your about page, they’ll form a better connection with you. This will make them more likely to read your content, subscribe to your email list, and become customers. Ready to create your own about us page? We’ll share the best about us pages for inspiration. Plus, tips on how to create one! But, before we dive in, let’s go over what an about us page actually is. If you want to skip ahead, you can use this table of contents";
const contactContent = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque imperdiet volutpat ex sit amet porttitor. Praesent sit amet porta ipsum, non imperdiet justo. Vestibulum dictum vestibulum massa rhoncus aliquet. Mauris bibendum magna vitae elit aliquam vehicula. Duis metus est, dapibus at velit sit amet, elementum eleifend risus. Sed at imperdiet quam. Aenean eget dapibus neque. Praesent malesuada pharetra tempus. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Morbi dapibus est tempor condimentum lacinia. Pellentesque non nulla dui. Maecenas sed iaculis sem. Integer feugiat odio diam."
const posts=[];

app.get("/",function(req,res){
    Post.find({},function(err,posts){
        res.render("home",{
            homeStartingContent:homeStartingContent,
            posts:posts
        });
    })
})

app.get("/about",function(req,res){
    res.render("about",{
        aboutContent:aboutContent
    });
});

app.get("/contact",function(req,res){
    res.render("contact",{
        contactContent:contactContent
    })
})

app.get("/compose",function(req,res){
    res.render("compose")
})

app.post("/compose",function(req,res){
    var post=new Post({
        title:req.body.title,
        content:req.body.content
    });
    post.save(function(err){
        if(!err){
            res.redirect("/");
        }
    });
    // res.redirect("/")
})



app.get("/posts/:postID",function(req,res){
    const requestedPostID = req.params.postID;
    
        Post.findOne({_id: requestedPostID}, function(err, post){

            res.render("post",{
                heading:post.title,
                startingContent:post.content
            });   
        });
    });

app.listen(3015,function(){
    console.log("The server is running on port 3015");
})
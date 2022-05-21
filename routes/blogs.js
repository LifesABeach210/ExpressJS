var express = require('express');
var router = express.Router();

var blogs = require("../public/javascripts/sampleBlogs");
const blogPosts = blogs.blogPosts;


router.get('/', function(req, res, next) {
    res.json(blogPosts);
});


router.get('/all', function(req, res){
    let sort = req.query.sort;

    res.json(sortBlogs(sort));

});


router.get('/singleBlog/:blogId', function (req, res) {
    const blogId = req.params.blogId;

    res.json(findBlogId(blogId))

})

router.get('/postBlog', (req, res, next) => {
    res.render('postBlogs');
})

router.post('/submit', function (req, res, next) {
    const newPost = {
        title: req.body.title,
        text: req.body.text,
        author: req.body.author,
        createdAt: new Date().toISOString(),
        id: String(blogPosts.length + 1)
    }
    blogPosts.push(newPost)


    res.send("got it");
})

router.get("/displayBlogs", function (req, res, next) {
    res.render("displayBlogs");
})


router.get("/displaySingleBlog", function (req, res, next) {
    res.render("displaySingleBlog");
})

router.delete('/deleteBlog/:blogId', (req, res) => {
    const blogToDelete = req.params.blogId;
    console.log(blogToDelete);
    for (let i = 0; i < blogPosts.length; i++) {
        let blog = blogPosts[i];
        if (blog.id === blogToDelete){
            blogPosts.splice(i,1);
        }
    }
    res.send("got it");

})
module.exports = router;


let findBlogId = (id) => {
    for (let i = 0; i < blogPosts.length; i++){
      let blog = blogPosts[i];
        if (blog.id === id){
            return blog;
        }
    }
}




let sortBlogs = (order) => {
    let posts = blogPosts;
    if (order === 'asc'){
        return posts.sort(function(a,b) {return new Date(a.createdAt) - new Date(b.createdAt)});
    } else if (order === 'desc'){
        return posts.sort(function(a,b) {return new Date(b.createdAt) - new Date(a.createdAt)});
    } else {
        return posts;
    }
}

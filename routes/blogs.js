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

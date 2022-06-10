var express = require('express');
var router = express.Router();
var blogs = require("../public/javascripts/sampleBlogs");
const blogPosts = blogs.blogPosts;
const { blogsDB } = require('../mongo')




router.get('/', async function(req, res, next) {

  const collection = await blogsDB().collection("post");
    const post = await collection.find({}).toArray();
        res.json(post);

    // res.json(blogPosts);
});

router.get('/authors', async function (req, res, next) {
var collection1 = await blogsDB().collection("post");
var author = await collection1.distinct('author');
let post = await collection1.find({}).toArray();
res.json({author:author,post:post});



});


router.get('/sort', async function(req, res) {
        var collection1 = await blogsDB().collection("post");




        var getPosts = (sortField, sortOrder, filterField, filterValue) => {

          var sort = {};

          sortField && sortOrder ? sort[sortField] = sortOrder : sort

          var filter = {};

          filterField && filterValue ? filter[filterField] = filterValue : filter;

          var dbResult = collection1.find(filter).sort(sort).toArray();

          return dbResult;
        };
        var post = await getPosts('title', -1, 'id');
    // let sort = req.query.sort;
      res.json(post);
    // res.json(sortBlogs(sort));

});

router.get('/singleBlog/:blogId', async function(req, res) {
        var collection2 = await blogsDB().collection('post');

        var postFind = (blogId) => {
            var blogById = blogId ? {id: blogId} : {};
            var dbresults = collection2.find(blogById).toArray();
            return dbresults;
};

var post = await postFind('9');
    // const blogId = req.params.blogId;
    //
    // res.json(findBlogId(blogId))
    res.json(post);
});

router.get('/postBlog',  function (req, res, next) {
  //var collection2 = await blogsDB().collection('post');


    res.render('postBlogs');
})

router.post('/submit', async function (req, res, next) {
var collection2 = await blogsDB().collection('post');
    collection2.insertOne({
        title: req.body.title,
        text: req.body.text,
        author: req.body.author,
        createdAt: new Date().toISOString(),
        id: await collection2.count() + 1
    });
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

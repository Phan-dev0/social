const Post = require("../model/Post");
const User = require("../model/User");
const router = require("express").Router();

//create a post
router.post("/", async (req, res) => {
    const newPost = new Post(req.body);
    try{
        const post = await newPost.save();
        return res.status(200).json(post);
    }catch(err){
        return res.status(500).json(err);
    }
});

//update a post
router.put("/:postId", async (req, res) => {
    try{
        const post = await Post.findByIdAndUpdate(req.params.postId, 
            {$set: req.body});
       
        return res.status(200).json("updated post successfully");
    }catch(err){
        return res.status(500).json(err);
    }
});

//delete a post
router.delete("/:postId", async (req, res) => {
    try{
        const deletePost = await Post.findByIdAndDelete(req.params.postId, {$set: req.body});
       
        return res.status(200).json("deleted post successfully");
    }catch(err){
        return res.status(500).json(err);
    }
});

//like and unlike a post
router.put("/:postId/likes", async (req, res) => {    
    try{
        const post = await Post.findById(req.params.postId);

        if(!post.likes.includes(req.body.userId)){
            await post.updateOne({$push: {likes: req.body.userId}});
            return res.status(200).json("The post has been liked");
        }else{
            await post.updateOne({$pull: {likes: req.body.userId}});
            return res.status(200).json("The post has been unliked");
        }

    }catch(err){
        return res.status(500).json(err);
    }
});

//get a post
router.get("/:postId" , async (req, res) => {
    try{
        const post = await Post.findById(req.params.postId);
        return res.status(200).json(post);
    }catch(err){
        return res.status(500).json(err);
    }
})

//get timeline posts
router.get("/timeline/:userId" , async (req, res) => {
    try{

        const currentUser = await User.findById(req.params.userId);
        const userPosts = await Post.find({userId: currentUser._id});
        const friendPosts = await Promise.all(
            currentUser.followerins.map(friendId => {
                return Post.find({userId: friendId})
            })
        )
        
        // const friendPosts = [];

        // for (let friendId of currentUser.followerins) {
        //     const posts = await Post.find({ userId: friendId });
        //     friendPosts.push(posts);
        // }

        return res.status(200).json(userPosts.concat(...friendPosts));
    }catch(err){
        return res.status(500).json(err);
    }
})

//get user all posts
router.get("/profile/:username" , async (req, res) => {
    try{

        const currentUser = await User.findOne({username: req.params.username});
        const userPosts = await Post.find({userId: currentUser._id});
   
        return res.status(200).json(userPosts);
    }catch(err){
        return res.status(500).json(err);
    }
})

module.exports = router;
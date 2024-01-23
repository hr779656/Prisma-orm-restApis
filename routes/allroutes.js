const express = require("express");
const router = express.Router();
const {
  createUser,
  getUsers,
  singleUser,
  updateUser,
  deleteUser
} = require("../controllers/user_controller");

const {
  createPost,
  getPosts,
  singlePost,
  updatePost,
  deletePost
} = require("../controllers/post_controller");


const {
  createComment,
  getcomments,
  singleComment,
  updateComment,
  deleteComment
} = require("../controllers/comment_controller");


// index Route =============
router.get("/", (req, res) => res.send("hellow world"));

// user Routes =============
router.post("/createuser", createUser);
router.get("/allusers", getUsers);
router.get("/user/:id", singleUser);
router.put("/updateuser/:id", updateUser);
router.delete("/deleteuser/:id", deleteUser);

// Post Routes ================
router.post("/createpost", createPost);
router.get("/allposts", getPosts);
router.get("/post/:id", singlePost);
router.put("/updatepost/:id", updatePost);
router.delete("/deletepost/:id", deletePost);

// Comment Routes ================
router.post("/createcomment", createComment);
router.get("/allcomments", getcomments);
router.get("/comment/:id", singleComment);
router.put("/updatecomment/:id", updateComment);
router.delete("/deletecomment/:id", deleteComment);


module.exports = router;

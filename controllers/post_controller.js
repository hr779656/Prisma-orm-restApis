const prisma = require("../config");

// create Post ============
const createPost = async (req, res) => {
  let { user_id, title, discription } = req.body;

  const newPost = await prisma.post.create({
    data: {
      user_id: Number(user_id),
      title,
      discription
    },
  });

  res.status(200).json({ data: newPost, msg: "post created" });
};

// get allPost ============
const getPosts = async (req, res) => {
  try {
    const posts = await prisma.post.findMany({});

    res.status(200).json({ data: posts });
  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: err });
  }
};

// get Post ============
const singlePost = async (req, res) => {
  const postId = req.params.id;

  try {
    await prisma.post
      .findFirst({
        where: {
          id: Number(postId),
        },
      })
      .then((result) => {
        res.status(200).json({ data: result });
      })
      .catch((err) => {
        res.status(404).json({ err: err });
      });
  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: err });
  }
};

// updatePost ============
const updatePost = async (req, res) => {
  const { user_id, title, discription } = req.body;
  const postId = req.params.id;

  try {
    const postUptd = await prisma.post.findFirst({
      where: {
        id: Number(postId),
      },
    });
    if (postUptd) {
      await prisma.post
        .update({
          where: {
            id: Number(postId),
          },

          data: {
            user_id: Number(user_id),
            title,
            discription
          },
        })
        .then((result) => {
          res.status(200).json({ data: result });
        })
        .catch((err) => {
          res.status(500).json({ err: err });
        });
    } else {
      res.status(404).send("post not found");
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: err });
  }
};


// DeletePost ==========
const deletePost = async (req, res)=>{
  const postId = req.params.id

  try{
    await prisma.post.delete({
      where: {
        id: Number(postId)
      }
    }).then((result)=>{
        res.status(200).json({msg: 'post deleted sucessfully', data: result})
    }).catch((err)=>{
      res.status(500).json({msg: err})
    })
  }catch(err){

  }
} 

module.exports = { createPost, getPosts, singlePost, updatePost, deletePost };

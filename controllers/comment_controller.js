const prisma = require("../config");

// create Comment ============
const createComment = async (req, res) => {
  let { user_id, post_id, comment } = req.body;


// Increase Comment Counter =============
   await prisma.post.update({
    where: {
        id: Number(post_id)
    },
    data: {
        comment_count: {
            increment: 1
        },
    },
   }) 


  const newComment = await prisma.comment.create({
    data: {
      user_id: Number(user_id),
      post_id: Number(post_id),
      comment,
    },
  });

  res.status(200).json({ data: newComment, msg: "comment created" });
};

// get allcomment ============
const getcomments = async (req, res) => {
  try {
    const comments = await prisma.comment.findMany({
      include: {
        post: {
          include: {
            user: true
          }
        }
      }
    });

    res.status(200).json({ data: comments });
  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: err });
  }
};

// get comment ============
const singleComment = async (req, res) => {
  const commentId = req.params.id;

  try {
    await prisma.comment
      .findFirst({
        where: {
          id: Number(commentId),
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

// updatecomment ============
const updateComment = async (req, res) => {
  const { user_id, post_id, comment } = req.body;
  const commentId = req.params.id;

  try {
    const commentUptd = await prisma.comment.findFirst({
      where: {
        id: Number(commentId),
      },
    });
    if (commentUptd) {
      await prisma.comment
        .update({
          where: {
            id: Number(commentId),
          },

          data: {
            user_id: Number(user_id),
            post_id: Number(post_id),
            comment,
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


// Deletecomment ==========
const deleteComment = async (req, res)=>{
  const commentId = req.params.id

// Increase Comment Counter =============
await prisma.post.update({
    where: {
        id: Number(post_id)
    },
    data: {
        comment_count: {
            decrement: 1
        },
    },
   }) 

  try{
    await prisma.comment.delete({
      where: {
        id: Number(commentId)
      }
    }).then((result)=>{
        res.status(200).json({msg: 'post deleted sucessfully', data: result})
    }).catch((err)=>{
      res.status(500).json({msg: err})
    })
  }catch(err){

  }
} 

module.exports = { createComment, getcomments, singleComment, updateComment, deleteComment };

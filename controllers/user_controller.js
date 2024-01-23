const prisma = require("../config");

// create User ============
const createUser = async (req, res) => {
  let { name, email, password } = req.body;

  const findUser = await prisma.user.findUnique({
    where: {
      email: email,
    },
  });

  if (findUser) {
    res.status(400).json({ msg: "email Already Exist Try another email" });
  }

  const newUser = await prisma.user.create({
    data: {
      name: name,
      email: email,
      password: password,
    },
  });

  res.status(200).json({ data: newUser, msg: "user created" });
};

// get allUser ============
const getUsers = async (req, res) => {
  try {
    const users = await prisma.user.findMany({
      include:{
        post: {
          select: {
            title: true,
            discription: true
        
          },
        },
      },
    });

    res.status(200).json({ data: users });
  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: err });
  }
};

// get User ============
const singleUser = async (req, res) => {
  const userId = req.params.id;

  try {
    await prisma.user
      .findFirst({
        where: {
          id: Number(userId),
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

// updateUser ============
const updateUser = async (req, res) => {
  const { name, email, password } = req.body;
  const userId = req.params.id;

  try {
    const userUptd = await prisma.user.findFirst({
      where: {
        id: Number(userId),
      },
    });
    if (userUptd) {
      await prisma.user
        .update({
          where: {
            id: Number(userId),
          },

          data: {
            name: name,
            email: email,
            password: password,
          },
        })
        .then((result) => {
          console.log(result);
          res.status(200).json({ data: result });
        })
        .catch((err) => {
          res.status(500).json({ err: err });
        });
    } else {
      res.status(404).send("user not found");
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: err });
  }
};


// DeleteUser ==========
const deleteUser = async (req, res)=>{
  const userId = req.params.id

  try{
    await prisma.user.delete({
      where: {
        id: Number(userId)
      }
    }).then((result)=>{
        res.status(200).json({msg: 'user deleted sucessfully', data: result})
    }).catch((err)=>{
      res.status(500).json({msg: err})
    })
  }catch(err){

  }
} 

module.exports = { createUser, getUsers, singleUser, updateUser, deleteUser };

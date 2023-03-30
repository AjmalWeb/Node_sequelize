const { raw } = require("mysql2");
const Sequelize = require("sequelize");
const { DataTypes, Op } = Sequelize;
const bcrypt = require("bcrypt");
const zlib = require("zlib");

const sequelize = new Sequelize("association", "root", "12345", {
  dialect: "mysql",
});

sequelize
  .authenticate()
  .then(() => {
    console.log("db connection seccess");
  })
  .catch((err) => {
    console.log(`db connection err ::: ${err}`);
  });

const User = sequelize.define(
  "user",
  {
    userName: {
      type: DataTypes.STRING,
    },
    password: {
      type: DataTypes.STRING,
    },
  },
  { timestamps: false }
);

const Post = sequelize.define(
  "post",
  {
    message: {
      type: DataTypes.STRING,
    },
  },
  { timestamps: false }
);

User.hasMany(Post, { onDelete: "CASCADE" });
Post.belongsTo(User, { onDelete: "CASCADE" });
let user, posts;

sequelize
  .sync({ alter: true })
  .then(() => {
    console.log("tables created");

    // User.bulkCreate([
    //   {
    //     userName: "Subbu",
    //     password: "Subbu123",
    //   },
    //   {
    //     userName: "Alvi",
    //     password: "Alvi123",
    //   },
    //   {
    //     userName: "sam",
    //     password: "sam123",
    //   },
    //   {
    //     userName: "alex",
    //     password: "alex123",
    //   },
    //   {
    //     userName: "som",
    //     password: "som123",
    //   },
    // ]);

    // Post.bulkCreate([
    //   { message: "this is message1" },
    //   { message: "this is message2" },
    //   { message: "this is message3" },
    //   { message: "this is message4" },
    //   { message: "this is message5" },
    //   { message: "this is message6" },
    // ]);

    // return User.findOne({ where: { userName: "alex" } }); // to add posts // remove post

    // return User.destroy({where:{userName:'alex'}}) // to remove user 

    return User.findOne()
  })
  .then((data) => {
    // user = data;                                          // to add posts
    // return Post.findAll();                                // to add posts

    // user = data;                                            // to get post counts
    // return user.countPosts();                               // to get post counts

    // user = data;                                          // to remove post
    // return Post.findOne();                                     // to remove post

    // user=data                                                 // belongs to set method
    // return Post.findOne()                                       // belongs to set method
  })
  .then((data) => {
    // posts = data;                                         // to add posts
    // return user.addPosts(posts);                          // to add posts

    // posts = data;                                       // to remove post
    // return user.removePost(posts);                         // to remove post

    posts=data                                            // belongs to set method
    posts.setUser(user)                                   // belongs to set method

    // console.log(data);
  })
  .then((data) => {
    console.log(data);
  })

  .catch((err) => {
    console.log(`error in creating user table err:::${err}`);
  });

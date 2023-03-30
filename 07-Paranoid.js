const { raw } = require("mysql2");
const Sequelize = require("sequelize");
const { DataTypes, Op } = Sequelize;
const bcrypt = require("bcrypt");
const zlib = require("zlib");

const sequelize = new Sequelize("sql_sequelize", "root", "12345", {
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
      allowNull: false,
      // get() {
      //   const rawValue = this.getDataValue("userName");
      //   return rawValue.toUpperCase();
      // },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      // set(value) {
      //   const salt = bcrypt.genSaltSync(12);
      //   const hash = bcrypt.hashSync(value, salt);
      //   this.setDataValue("password", hash);
      // },
    },
    email: {
      type: DataTypes.STRING,
      //  unique: true,
      // allowNull: false,
      // validate: {
      //   // isEmail: true,
      //   isIn:['me@soccer.org','me@soccer.com']
      // },
    },
    age: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        // isoldEnough(value) {
        //   if (value < 21) {
        //     throw new Error("too young");
        //   }
        // },
        // isNumeric:true;
        // isNumeric:{
        //   msg:'please provide a number'
        // }
      },
    },
    islogon: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    description: {
      type: DataTypes.STRING,
      // set(value) {
      //   const compressed = zlib.deflateSync(value).toString("base64");
      //   return this.setDataValue("description", compressed);
      // },
      // get() {
      //   const value = this.getDataValue("description");
      //   const uncompressed = zlib.inflateSync(Buffer.from(value, "base64"));
      //   return uncompressed.toString();
      // },
    },
    aboutUser: {
      type: DataTypes.VIRTUAL,
      // get() {
      //   return `${this.userName} ${this.description}`;
      // },
    },
  },
  {
    // validate:{
    //   usernamePassmatch(){
    //     if (this.userName === this.password){
    //       throw new Error('Password cannot be your user name!')
    //     }else {
    //       console.log('success')
    //     }
    //   }
    // }
    timestamps: true,
    paranoid: true,
    deletedAt: "timeDestroyed",
  }
);

User.sync({ alter: true })
  .then(() => {
    console.log("User table created");

    // return User.destroy({ where: { id: 3 } }); //to delelte the id3
    // return User.restore({ where: { id: 3 } }); // to restore the id3
    // return User.findAll({ where: { id: 4 }, raw: true });
    // return User.findOne(); // will return undeleted item .. ie,Id2
    // return User.findOne({paranoid:false});  // will return deleted item .. ie,id1
  })
  .then((data) => {
    console.log(data);
  })
  .catch((err) => {
    console.log(`error in creating user table err:::${err}`);
  });

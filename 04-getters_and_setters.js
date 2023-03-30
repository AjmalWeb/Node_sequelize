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

const User = sequelize.define("user", {
  userName: {
    type: DataTypes.STRING,
    allowNull: false,
    get() {
      const rawValue = this.getDataValue("userName");
      return rawValue.toUpperCase();
    },
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
    set(value) {
      const salt = bcrypt.genSaltSync(12);
      const hash = bcrypt.hashSync(value, salt);
      this.setDataValue("password", hash);
    },
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  age: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  islogon: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
  description: {
    type: DataTypes.STRING,
    set(value) {
      const compressed = zlib.deflateSync(value).toString("base64");
      return this.setDataValue("description", compressed);
    },
    get() {
      const value = this.getDataValue("description");
      const uncompressed = zlib.inflateSync(Buffer.from(value, "base64"));
      return uncompressed.toString();
    },
  },
  aboutUser: {
    type: DataTypes.VIRTUAL,
    get() {
      return `${this.userName} ${this.description}`;
    },
  },
});

User.sync({ alter: true })
  .then(() => {
    console.log("User table created");
    return User.findOne({ where: { id: 17 } });
    // return User.create({
    //   userName: "jerry",
    //   password: "51234",
    //   email: "jerry@gm.in",
    //   age: 45,
    //   description: "i am from description my data length will be very long",
    // });
  })
  .then((data) => {
    // data.forEach((element) => {
    //     console.log(element.toJSON());
    // // });
    // const { count, rows } = data;
    // console.log("count", count);
    // console.log("rows", rows);
    // console.log(data.toJSON());
    // console.log(data.userName);
    // console.log(data.password);
    // console.log(data.description);
    console.log(data.aboutUser);
  })
  .catch((err) => {
    console.log(`error in creating user table err:::${err}`);
  });

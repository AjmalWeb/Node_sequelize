const { raw } = require("mysql2");
const Sequelize = require("sequelize");
const { DataTypes, Op } = Sequelize;

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
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
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
});

User.sync({ alter: true })
  .then(() => {
    console.log("User table created");
    // return User.findAll({ raw: true }); // to avoid using toJSON()
    // return User.findAll({ where: { id: 10 }, raw: true }); // to avoid using toJSON()
    // return User.findByPk(8); //find by the primary key
    // return User.findOne({ where: { age: { [Op.or]: { [Op.lt]: 28, [Op.eq]: null } } }, }); // findOne
    // return User.findOrCreate({where:{userName:'Tommy'}}) //findorCreate
    return User.findAndCountAll({ where: { id: 5 }, raw: true }); //FindandCount
  })
  .then((data) => {
    // data.forEach((element) => {
    //     console.log(element.toJSON());
    // });
    const { count, rows } = data;
    console.log("count", count);
    console.log("rows", rows);
    // console.log(data.toJSON());
  })
  .catch((err) => {
    console.log(`error in creating user table err:::${err}`);
  });
const { raw } = require("mysql2");
const Sequelize = require("sequelize");
const { DataTypes, Op } = Sequelize;

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
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
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
});

User.sync({ alter: true })
  .then(() => {
    console.log("User table created");
    // return User.findAll({ raw: true }); // to avoid using toJSON()
    // return User.findAll({ where: { id: 10 }, raw: true }); // to avoid using toJSON()
    // return User.findByPk(8); //find by the primary key
    // return User.findOne({ where: { age: { [Op.or]: { [Op.lt]: 28, [Op.eq]: null } } }, }); // findOne
    // return User.findOrCreate({where:{userName:'Tommy'}}) //findorCreate
    return User.findAndCountAll({ where: { id: 5 }, raw: true }); //FindandCount
  })
  .then((data) => {
    // data.forEach((element) => {
    //     console.log(element.toJSON());
    // });
    const { count, rows } = data;
    console.log("count", count);
    console.log("rows", rows);
    // console.log(data.toJSON());
  })
  .catch((err) => {
    console.log(`error in creating user table err:::${err}`);
  });

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
    // const user = User.build({
    //   userName: "Ajmal",
    //   password: "12345",
    //   email: "ajm@gml.com",
    //   age: 25,
    // });
    // user.userName = "Muhammed ajmal";
    // return user.save().then(() => {
    //   console.log("new user added");
    // });

    // return User.create({
    //   userName: "mcd",
    //   password: "1234a5",
    //   email: "fajm@gml.com",
    //   age: 24,
    // })
    //   .then((data) => {
    //     console.log("new user added");
    //     console.log(data.toJSON());
    //     data.userName = "pizza";
    //     return data.save();
    //   })
    //   .then((data) => {
    //     console.log("user updated");
    //     console.log(data.toJSON());
    //   });

    //     return User.bulkCreate([
    //       {
    //         userName: "mcd1",
    //         password: "1234a5",
    //         email: "fajm@gml.com",
    //         age: 24,
    //       },
    //       {
    //         userName: "mcd2",
    //         password: "1234a5",
    //         email: "fajm@gml.com",
    //         age: 24,
    //       },
    //       {
    //         userName: "mcd3",
    //         password: "1234a5",
    //         email: "fajm@gml.com",
    //         age: 24,
    //       },
    //       {
    //         userName: "mcd4",
    //         password: "1234a5",
    //         email: "fajm@gml.com",
    //         age: 24,
    //       },
    //     ]);
    //   })
    //   .then((data) => {
    //     data.forEach((element) => {
    //       console.log(element.toJSON());
    //     });
    // return User.findAll();

    // return User.findAll({attributes:['userName','password']});

    // return User.findAll({attributes:[['userName','Userr'],['password','userpass']]}); //aliases

    // return User.findAll({
    //   attributes: [[sequelize.fn("AVG", sequelize.col("age")), "AvgAge"]],
    // }); //Aggregates

    // return User.findAll({ attributes: { exclude: ["password"] } }); //EXLUDE

    // return User.findAll({ where: { age: 24 ,userName:'ajmal'} }); //WHERE

    // return User.findAll({ limit: 3 }); //limit

    // return User.findAll({ order: [["id", "DESC"]] }); //ORDER

    // return User.findAll({attributes: [ "userName", [sequelize.fn("SUM", sequelize.col("age")), "SumAge"],],
    //   group: "userName",
    // }); //GROUP

    // return User.findAll({ where: { [Op.or]: { userName: "Ajmal", age: 25 } } });//OR operation

    // return User.findAll({ where: { age: { [Op.gt]: 24 } } }); //GT Operation

    // return User.findAll({where:sequelize.where(sequelize.fn('char_length',sequelize.col('userName')),5)}) //Where Function

    // return User.update({ userName: "Samuel" }, { where: { id: 6 } }); //UPDATE

    // return User.update({ userName: "dan" }, { where: { id: { [Op.gt]: 12 } } });// UPDATE

    // return User.destroy({ where: { id: 12 } }); // DELETE

    return User.max("age");
  })
  .then((data) => {
    // data.forEach((element) => {
    //     console.log(element.toJSON());
    // });
    
    console.log(data);
  })
  .catch((err) => {
    console.log(`error in creating user table err:::${err}`);
  });

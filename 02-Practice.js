const Sequelize = require("sequelize");
const { DataTypes, Op } = Sequelize;

const sequelize = new Sequelize("sql_sequelize", "root", "12345", {
  dialect: "mysql",
});

// sequelize
//   .authenticate()
//   .then(() => {
//     console.log("db connection seccess");
//   })
//   .catch((err) => {
//     console.log(`db connection err ::: ${err}`);
//   });

const Student = sequelize.define(
  "student",
  {
    student_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [4, 20],
      },
    },
    favourite_class: {
      type: DataTypes.STRING(25),
      defaultValue: "Computer Science",
    },
    school_year: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    subscribed: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
  },
  { freezeTableName: true, timestamps: false }
);

Student.sync()
  .then(() => {
    console.log("Student table created");

    // Student.bulkCreate(
    //   [
    //     {
    //       name: "Michel",
    //       school_year: 12,
    //     },
    //     {
    //       name: "Samuel",
    //       favourite_class: "Biology",
    //       school_year: 11,
    //       subscribed: false,
    //     },
    //     {
    //       name: "Freddy",
    //       favourite_class: "Math",
    //       school_year: 10,
    //     },
    //     {
    //       name: "Bruce",
    //       favourite_class: "History",
    //       school_year: 9,
    //       subscribed: false,
    //     },
    //     {
    //       name: "Spencer",
    //       favourite_class: "Music",
    //       school_year: 6,
    //       subscribed: false,
    //     },
    //   ],
    //   { validate: true }
    // );

    // return Student.findAll({
    //   attributes: ['name'],
    //   where: {
    //     [Op.or]: { favourite_class: "Computer Science", subscribed: true },
    //   },
    // });

    return Student.findAll({
      attributes: [
        "school_year",
        [sequelize.fn("COUNT", sequelize.col("school_year")), "num_students"],
      ],
      group: "school_year",
    });
  })
  .then((data) => {
    data.forEach((element) => {
      console.log(element.toJSON());
    });
  })
  .catch((err) => {
    console.log(err);
  });

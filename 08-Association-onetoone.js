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

const Country = sequelize.define(
  "country",
  {
    countryName: {
      type: DataTypes.STRING,
      unique: true,
    },
  },
  {
    timestamps: false,
  }
);

const Capital = sequelize.define(
  "capital",
  {
    capitalName: {
      type: DataTypes.STRING,
      unique: true,
    },
  },
  {
    timestamps: false,
  }
);

// Country.hasOne(Capital);
// Country.hasOne(Capital, { onDelete: "CASCADE" });
// Country.hasOne(Capital, { onUpdate: "CASCADE" });
// Country.hasOne(Capital, {foreignKey:'Country'});

Capital.belongsTo(Country);

let capital, country;

sequelize
  .sync({ alter: true })
  .then(() => {
    console.log("tables created");
    // Country.bulkCreate([
    //   {
    //     countryName: "Spain",
    //   },
    //   {
    //     countryName: "France",
    //   },
    //   {
    //     countryName: "Germany",
    //   },
    //   {
    //     countryName: "England",
    //   },
    // ]);

    // Capital.bulkCreate([
    //   {
    //     capitalName: "London",
    //   },
    //   {
    //     capitalName: "Madrid",
    //   },
    //   {
    //     capitalName: "Paris",
    //   },
    //   {
    //     capitalName: "Berlin",
    //   },
    // ]);

    // return Capital.findOne({where:{capitalName:'Madrid'}})   // to set Capital

    // return Country.findOne({ where: { countryName: "Spain" } });  // to get capital

    // return Country.create({ countryName:'USA'})                 //create capital

    // return Country.findOne({ where: { countryName: "France" } });   //belongsTo set country

    // return Country.destroy({ where: { countryName: "Spain" } });   // delete method
  })
  .then((data) => {
    // capital=data;                                           // to set Capital
    // return Country.findOne({where:{countryName:'Spain'}})   // to set Capital
    // country = data;                                           // to get capital
    // return country.getCapital();                              // to get capital
    // country = data;                                                     //create capital
    // return country.createCapital({capitalName:'Washington ,D.C.'})      //create capital
    // country = data;                                                     //belongsTo set country
    // return Capital.findOne({ where: { capitalName: "Paris" } });         //belongsTo set country
  })
  .then((data) => {
    // country=data;                                           // to set Capital
    // country.setCapital(capital)                            // to set Capital
    // capital = data;                                           //belongsTo set country
    // return capital.setCountry(country);                         //belongsTo set country
    // console.log(data.toJSON());
  })
  .then((data) => {
    console.log(data.toJSON());
  })

  .catch((err) => {
    console.log(`error in creating user table err:::${err}`);
  });

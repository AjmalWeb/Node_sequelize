const { raw } = require("mysql2");
const Sequelize = require("sequelize");
const { DataTypes, Op } = Sequelize;
const bcrypt = require("bcrypt");
const zlib = require("zlib");

const sequelize = new Sequelize("association", "root", "12345", {
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

const Customer = sequelize.define(
  "customer",
  {
    customerName: {
      type: DataTypes.STRING,
    },
  },
  { timestamps: false }
);

const Product = sequelize.define(
  "product",
  {
    productName: {
      type: DataTypes.STRING,
    },
  },
  { timestamps: false }
);

const CustomerProduct = sequelize.define(
  "customerproduct",
  {
    customerproduct_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
  },
  { timestamps: false }
);

Customer.belongsToMany(Product, { through: CustomerProduct });
Product.belongsToMany(Customer, { through: CustomerProduct });

let product, customer;

sequelize
  .sync({ alter: true })
  .then(() => {
    console.log("tables created");

    // Customer.bulkCreate([
    //   {
    //     customerName: "sam",
    //   },
    //   {
    //     customerName: "mike",
    //   },
    //   {
    //     customerName: "greg",
    //   },
    //   {
    //     customerName: "spencer",
    //   },
    // ]);

    // Product.bulkCreate([
    //   {
    //     productName: "laptop",
    //   },
    //   {
    //     productName: "headphone",
    //   },
    //   {
    //     productName: "mobile",
    //   },
    //   {
    //     productName: "fan",
    //   },
    // ]);

    // return Customer.findOne({ where: { customerName: "sam" } }); //adding product to customer

    return Product.findOne({ where: { productName: "mobile" } });   // adding customer to product
  })
  .then((data) => {
    // customer = data;                                            //adding product to customer
    // return Product.findAll();                                   //adding product to customer

    product = data;                                               // adding customer to product
    return Customer.findAll();                                    // adding customer to product
  })
  .then((data) => {
    // product = data;                                             //adding product to customer
    // customer.addProducts(product);                              //adding product to customer

    customer = data;                                              // adding customer to product
    product.addCustomers(customer);                               // adding customer to product
  })

  .catch((err) => {
    console.log(`error in creating user table err:::${err}`);
  });

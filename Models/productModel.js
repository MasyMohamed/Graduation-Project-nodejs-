const { Sequelize, DataTypes } = require("sequelize");
const config = require("../config/config");

const sequelize = new Sequelize({
  dialect: config.database.dialect,
  database: config.database.databaseName,
  username: config.database.username,
  password: config.database.password,
  host: config.database.host,
  port: config.database.port,
});

const Product = sequelize.define(
  "Product",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    // Model attributes are defined here
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    price: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    brand: {
      type: DataTypes.STRING,
    },
    category: {
      type: DataTypes.STRING,
    },
    product_image_url: {
      type: DataTypes.TEXT,
    },
    description: {
      type: DataTypes.TEXT,
    },
    skin_type: {
      type: DataTypes.STRING, // Corrected typo
    },
    stock_quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    tableName: "product",
    timestamps: false,
  }
);

// Test the database connection
sequelize
  .authenticate()
  .then(() => {
    console.log("Connection has been established successfully.");
  })
  .catch((err) => {
    console.error("Unable to connect to the database:", err);
  });

module.exports = { Product, sequelize };

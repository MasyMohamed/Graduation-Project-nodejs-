module.exports = {
  database: {
    dialect: "postgres",
    databaseName: process.env.DB_NAME,
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD ,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT ,
    dialectOptions: {
    ssl: {
      require: true, // Set to true to require SSL/TLS
      rejectUnauthorized: false // Set to false if you want to ignore self-signed certificates
    }
  }
  },
};

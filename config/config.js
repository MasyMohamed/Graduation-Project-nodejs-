module.exports = {
  database: {
    dialect: "postgres",
    databaseName: process.env.DB_NAME || "BeautyMate Application",
    username: process.env.DB_USER || "postgres",
    password: process.env.DB_PASSWORD || "postgres",
    host: process.env.DB_HOST || "localhost",
    port: process.env.DB_PORT || 5432,
    dialectOptions: {
    ssl: {
      require: true, // Set to true to require SSL/TLS
      rejectUnauthorized: false, // Set to false if you want to ignore self-signed certificates
    },
  },
  },
  
};

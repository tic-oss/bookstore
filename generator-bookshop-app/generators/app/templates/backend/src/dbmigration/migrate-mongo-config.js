const config = {
  mongodb: {
    url: "mongodb://127.0.0.1:27017/bookstore",
    databaseName: "bookstore",
    options: {
      useNewUrlParser: true,
      useUnifiedTopology: true
    }
  },
  migrationsDir: "migrations",

  changelogCollectionName: "changelog",

  migrationFileExtension: ".js",

  useFileHash: true,

  moduleSystem: "commonjs"
};

module.exports = config;

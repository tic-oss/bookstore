const migrateMongoConfig = require("./migrate-mongo-config");

async function runMigrateMongo() {
  try {
    // console.log('Migrate-mongo migrations completed successfully:');
  } catch (err) {
    console.error("Error running Migrate-mongo:", err);
  }
}

module.exports = { runMigrateMongo };

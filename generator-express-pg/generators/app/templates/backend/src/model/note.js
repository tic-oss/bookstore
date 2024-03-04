const pool = require("./database/db.js");

async function createTable() {
  const client = await pool.connect();
  try {
    await client.query(
          `CREATE TABLE IF NOT EXISTS note (
              id SERIAL PRIMARY KEY,
              title VARCHAR(255) ,
              description TEXT
          )`
      );
  } 
  catch (error) {
  } 
  finally {
    client.release();
  }
}

createTable();

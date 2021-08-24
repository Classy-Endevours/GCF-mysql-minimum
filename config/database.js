var mysql = require("promise-mysql");

const config = require("./index.js");

// Database setup
var pool = mysql.createPool({
  host: config.DB_HOST,
  user: config.DB_USER,
  password: config.DB_PASSWORD,
  database: config.DB_NAME,
});

/**
 * This is an wrapper method which will perform certain task build in including
 * @function
 * `beginTransaction`
 * `commit`
 * `release`
 * `rollback`
 * If any transaction fails then it will rollback to the beginTransaction state to maintain the data
 * @param { a queryString is a raw query which needs to be Executed} queryString a String | Mysql.Query as a  params
 * @param { a parameter is a set of values with the query} parameter a set of parameter which will replace the ? from the query
 * @example
 *  const user_level_1 = db.query("SELECT * FROM users")
    const user_level_2 = db.query("SELECT * FROM users where id = ?", [1])
    const result = await Promise.all([user_level_1, user_level_2])
    return result;
    @example
    const result = await db.query("SELECT * FROM users")
    return result;
    @example
    const result = db.query("SELECT * FROM users")
    .then(data => console.log(data))
    .catch(err => console.log(err))
 * @returns Execute the query and return the response to the caller
 */
const query = async (queryString, parameter) => {
  return new Promise((resolve, reject) => {
    pool.then(async (pool) => {
      const connection = await pool.getConnection();
      try {
        await connection.beginTransaction();
        const result = await connection.query(queryString, parameter);
        await connection.commit();
        await connection.release();
        resolve(result)
      } catch (e) {
        await connection.rollback();
        await connection.release();
        reject(e);
      }
    })
    .catch(reject);
  })

}

exports.query = query;

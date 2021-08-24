const { DB_HOST, DB_USER, DB_PASSWORD, DB_NAME } = process.env
const config = {
    DB_HOST,
    DB_USER,
    DB_PASSWORD,
    DB_NAME,
}

module.exports = config
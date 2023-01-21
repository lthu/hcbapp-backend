require('dotenv').config()


const { Pool } = require('pg')

const pool = new Pool({
  user: process.env.user,
  host: process.env.host,
  port: 5432,
  password: process.env.password
})

module.exports = {
  query: (text, params) => pool.query(text, params),
}
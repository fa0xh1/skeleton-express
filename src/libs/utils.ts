import dotenv from 'dotenv'
process.env.NODE_ENV = process.env.NODE_ENV || 'development'
process.env.APP_ENV = process.env.APP_ENV || 'development'

dotenv.config({
  path: `${__dirname}/../../config/${process.env.APP_ENV}.env`,
})
export const JWT_SECRET = process.env['JWT_SECRET'] || 'secret'
export const DB_CONFIG = {
  db_name: process.env['DB_NAME'] || 'db_local',
  db_user: process.env['DB_USER'] || 'root',
  db_password: process.env['DB_PASSWORD'] || 'root',
  config: {
    dialect: process.env['DB_DIALECT'] || 'mysql',
    port: process.env['DB_PORT'] || '3306',
  },
}
if (JWT_SECRET == 'secret') {
  console.log('No JWT secret string. Set JWT_SECRET environment variable.')
  process.exit(1)
}

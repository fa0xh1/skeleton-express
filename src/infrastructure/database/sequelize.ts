import { Sequelize } from 'sequelize'
import { DB_CONFIG } from '../../libs/utils'
// const env = process.env.NODE_ENV || 'development'
// // eslint-disable-next-line @typescript-eslint/no-var-requires
// const config = require(__dirname + '/../../config.js')[env]

// const sequelize = config.url
//   ? new Sequelize(config.url, config)
//   : new Sequelize(config.database, config.username, config.password, config)
const { db_name, db_user, db_password } = DB_CONFIG
const sequelize = new Sequelize(db_name, db_user, db_password, {
  dialect: 'mysql',
  port: 3306,
})

export { Sequelize, sequelize }

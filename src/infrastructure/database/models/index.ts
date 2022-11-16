// import { Sequelize } from 'sequelize'
// import { DB_CONFIG } from '../../../../src/libs/utils'
// // const env = process.env.NODE_ENV || 'development'
// // // eslint-disable-next-line @typescript-eslint/no-var-requires
// // const config = require(__dirname + '/../../config.js')[env]

import { Permission } from './permission'
import { Role } from './role'
import { RolePermission } from './role-permission'
import { User } from './user'
import { UserRole } from './user-role'
// import { Company } from './company'
// import { Bank } from './bank'
// import { PaymentMethod } from './payment-method'
// import { Permission } from './permission'
// // // const sequelize = config.url
// // //   ? new Sequelize(config.url, config)
// // //   : new Sequelize(config.database, config.username, config.password, config)
// // const { db_name, db_user, db_password } = DB_CONFIG
// // const sequelize = new Sequelize(db_name, db_user, db_password, {
// //   dialect: 'mysql',
// //   port: 3306,
// // })

// export { Sequelize, sequelize }

User.belongsToMany(Role, {
  through: UserRole,
  foreignKey: 'user_id',
  otherKey: 'role_id',
  // as: 'role',
})

Role.belongsToMany(User, {
  through: UserRole,
  foreignKey: 'role_id',
  otherKey: 'user_id',
})

Permission.belongsToMany(Role, {
  through: RolePermission,
  foreignKey: 'permission_id',
  otherKey: 'role_id',
})

Role.belongsToMany(Permission, {
  through: RolePermission,
  foreignKey: 'role_id',
  otherKey: 'permission_id',
})

export { Role, RoleInstance } from './role'
export { User, UserInstance } from './user'
export { Permission, PermissionInstance } from './permission'
export { RolePermission } from './role-permission'
export { Company, CompanyInstance } from './company'
export { Bank, BankInstance } from './bank'
export { PaymentMethod, PaymentMethodInstance } from './payment-method'

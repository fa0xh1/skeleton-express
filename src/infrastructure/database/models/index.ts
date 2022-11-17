import { Permission } from './permission'
import { Role } from './role'
import { RolePermission } from './role-permission'
import { User } from './user'
import { UserRole } from './user-role'

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

import { UnmarshalledRoleHasPermission } from '../../../domain/models/role-permission'
import { Model, DataTypes } from 'sequelize'
import { sequelize } from '../sequelize'

interface RolePermissionAttributes {
  role_id: string
  permission_id: string
}

interface RolePermissionInstance
  extends Model<RolePermissionAttributes>,
    RolePermissionAttributes {
  createdAt?: Date
  updatedAt?: Date
}

const RolePermission = sequelize.define<
  RolePermissionInstance,
  UnmarshalledRoleHasPermission
>('role_has_Permission', {
  role_id: {
    allowNull: false,
    type: DataTypes.STRING,
  },
  permission_id: {
    allowNull: false,
    type: DataTypes.STRING,
  },
})
RolePermission.removeAttribute('id')
RolePermission.sync({ alter: { drop: false } })

export { RolePermission }

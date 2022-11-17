import { Model, Optional, DataTypes } from 'sequelize'
import { sequelize } from '../sequelize'

interface RolePermissionAttributes {
  id: string
  role_id: string
  permission_id: string
}

type RolePermissionCreationAttributes = Optional<RolePermissionAttributes, 'id'>

interface RolePermissionInstance
  extends Model<RolePermissionAttributes, RolePermissionCreationAttributes>,
    RolePermissionAttributes {
  createdAt?: Date
  updatedAt?: Date
}

const RolePermission = sequelize.define<RolePermissionInstance>(
  'Role_has_Permission',
  {
    id: {
      allowNull: false,
      autoIncrement: false,
      primaryKey: true,
      type: DataTypes.UUID,
      unique: true,
    },
    role_id: {
      allowNull: true,
      type: DataTypes.STRING,
    },
    permission_id: {
      allowNull: true,
      type: DataTypes.STRING,
    },
  },
)
RolePermission.sync({ alter: { drop: false } })

export { RolePermission }

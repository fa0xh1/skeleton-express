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
  created_at: Date
  updated_at: Date
  deleted_at: Date
}
//fix git

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
      allowNull: false,
      type: DataTypes.STRING,
    },
    permission_id: {
      allowNull: false,
      type: DataTypes.STRING,
    },
  },
  {
    underscored: true,
    paranoid: true,
  },
)
RolePermission.sync({ alter: { drop: false } })

export { RolePermission }

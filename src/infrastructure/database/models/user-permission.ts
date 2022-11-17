import { Model, Optional, DataTypes } from 'sequelize'
import { sequelize } from '../sequelize'

interface UserPermissionAttributes {
  id: string
  user_id: string
  permission_id: string
}

type UserPermissionCreationAttributes = Optional<UserPermissionAttributes, 'id'>

interface UserPermissionInstance
  extends Model<UserPermissionAttributes, UserPermissionCreationAttributes>,
    UserPermissionAttributes {
  created_at: Date
  updated_at: Date
  deleted_at: Date
}
//fix git

const UserPermission = sequelize.define<UserPermissionInstance>(
  'user_has_Permission',
  {
    id: {
      allowNull: false,
      autoIncrement: false,
      primaryKey: true,
      type: DataTypes.UUID,
      unique: true,
    },
    user_id: {
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
UserPermission.sync({ alter: { drop: false } })

export { UserPermission }

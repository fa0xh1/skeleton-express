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
  createdAt?: Date
  updatedAt?: Date
}

const UserPermission = sequelize.define<UserPermissionInstance>(
  'user_has_Permission',
  {
    id: {
      allowNull: false,
      autoIncrement: false,
      primaryKey: true,
      type: DataTypes.CHAR,
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
)
UserPermission.sync({ alter: { drop: false } })

export { UserPermission }

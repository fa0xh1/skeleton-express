import { Model, Optional, DataTypes } from 'sequelize'
import { sequelize } from '../sequelize'

interface UserRoleAttributes {
  id: string
  user_id: string
  role_id: string
}

type UserRoleCreationAttributes = Optional<UserRoleAttributes, 'id'>

interface UserRoleInstance
  extends Model<UserRoleAttributes, UserRoleCreationAttributes>,
    UserRoleAttributes {
  createdAt?: Date
  updatedAt?: Date
}

const UserRole = sequelize.define<UserRoleInstance>('user_has_role', {
  id: {
    allowNull: false,
    autoIncrement: false,
    primaryKey: true,
    type: DataTypes.UUID,
    unique: true,
  },
  user_id: {
    allowNull: true,
    type: DataTypes.STRING,
  },
  role_id: {
    allowNull: true,
    type: DataTypes.STRING,
  },
})
UserRole.sync({ alter: { drop: false } })

export { UserRole }

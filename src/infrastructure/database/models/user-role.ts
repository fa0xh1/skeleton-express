import { UnmarshalledUserHasRole } from '../../../domain/models/user-role'
import { Model, DataTypes } from 'sequelize'
import { sequelize } from '../sequelize'

interface UserRoleAttributes {
  user_id: string
  role_id: string[]
}

interface UserRoleInstance
  extends Model<UserRoleAttributes>,
    UserRoleAttributes {
  createdAt?: Date
  updatedAt?: Date
}

const UserRole = sequelize.define<UserRoleInstance, UnmarshalledUserHasRole>(
  'user_has_role',
  {
    user_id: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    role_id: {
      allowNull: false,
      type: DataTypes.STRING,
    },
  },
)

UserRole.removeAttribute('id')
UserRole.sync({ alter: { drop: false } })

export { UserRole }

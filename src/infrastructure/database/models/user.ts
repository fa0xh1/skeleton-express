import * as Sequelize from 'sequelize'
import { sequelize } from '../sequelize'
import { UnmarshalledUser } from '../../../domain/models/user'
import bcrypt from 'bcrypt'
import { Role } from '../../../domain/models/role'

interface UserAttributes {
  id: string
  email: string
  username: string
  password: string
}

type UserCreationAttributes = Sequelize.Optional<UserAttributes, 'id'>
interface UserInstance
  extends Sequelize.Model<UserInstance, UserCreationAttributes>,
    UserAttributes {
  created_at: Date
  updated_at: Date
  deleted_at: Date
  comparePassword: (password: string) => Promise<boolean>
  addRole: Sequelize.BelongsToManyAddAssociationMixin<Role, string | string[]>
  removeRole: Sequelize.BelongsToManyRemoveAssociationMixin<
    Role,
    string | string[]
  >
}

const User = sequelize.define<UserInstance, UnmarshalledUser>(
  'user',
  {
    id: {
      type: Sequelize.STRING,
      primaryKey: true,
    },
    email: Sequelize.STRING,
    password: Sequelize.STRING,
    username: Sequelize.STRING,
  },
  {
    underscored: true,
    paranoid: true,
  },
)

User.beforeSave(async (user: UserInstance) => {
  if (user.password) {
    user.password = bcrypt.hashSync(user.password, bcrypt.genSaltSync(10))
  }
})

User.prototype.comparePassword = async function (
  password: string,
): Promise<boolean> {
  return bcrypt.compare(password, this.password)
}
User.sync({ alter: { drop: false } })

export { User, UserInstance }

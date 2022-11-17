import * as Sequelize from 'sequelize'
import { sequelize } from '../sequelize'
import { Permission } from '../../../domain/models/permission'

interface RoleAttributes {
  id: string
  name: string
  description: string
}

type RoleCreationAttributes = Sequelize.Optional<RoleAttributes, 'id'>

interface RoleInstance
  extends Sequelize.Model<RoleAttributes, RoleCreationAttributes>,
    RoleAttributes {
  created_at: Date
  updated_at: Date
  deleted_at: Date
  addPermission: Sequelize.BelongsToManyAddAssociationMixin<
    Permission,
    string | string[]
  >
  removePermission: Sequelize.BelongsToManyRemoveAssociationMixin<
    Permission,
    string | string[]
  >
}
//fix git

const Role = sequelize.define<RoleInstance>(
  'role',
  {
    id: {
      allowNull: false,
      autoIncrement: false,
      primaryKey: true,
      type: Sequelize.DataTypes.UUID,
      unique: true,
    },
    name: {
      allowNull: true,
      type: Sequelize.DataTypes.STRING,
    },
    description: {
      allowNull: true,
      type: Sequelize.DataTypes.STRING,
    },
  },
  {
    underscored: true,
    paranoid: true,
  },
)
Role.sync({ alter: { drop: false } })

export { Role, RoleInstance }

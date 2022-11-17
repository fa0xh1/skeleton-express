import * as Sequelize from 'sequelize'
import { sequelize } from '../sequelize'
import { Permission } from '../../../domain/models/permission'
import { UnmarshalledRole } from '../../../domain/models/role'

interface RoleAttributes {
  id: string
  name: string
  description: string
}

type RoleCreationAttributes = Sequelize.Optional<RoleAttributes, 'id'>

interface RoleInstance
  extends Sequelize.Model<RoleAttributes, RoleCreationAttributes>,
    RoleAttributes {
  createdAt?: Date
  updatedAt?: Date
  addPermission: Sequelize.BelongsToManyAddAssociationMixin<
    Permission,
    string | string[]
  >
  removePermission: Sequelize.BelongsToManyRemoveAssociationMixin<
    Permission,
    string | string[]
  >
}

const Role = sequelize.define<RoleInstance, UnmarshalledRole>('role', {
  id: {
    allowNull: false,
    autoIncrement: false,
    primaryKey: true,
    type: Sequelize.DataTypes.UUID,
    unique: true,
  },
  name: {
    allowNull: false,
    type: Sequelize.DataTypes.STRING,
  },
  description: {
    allowNull: true,
    type: Sequelize.DataTypes.STRING,
  },
})
Role.sync({ alter: { drop: false } })

export { Role, RoleInstance }

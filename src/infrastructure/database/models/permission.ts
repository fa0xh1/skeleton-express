import { Model, Optional, DataTypes } from 'sequelize'
import { sequelize } from '../sequelize'

interface PermissionAttributes {
  id: string
  name: string
  description: string
}

type PermissionCreationAttributes = Optional<PermissionAttributes, 'id'>

interface PermissionInstance
  extends Model<PermissionAttributes, PermissionCreationAttributes>,
    PermissionAttributes {
  created_at: Date
  updated_at: Date
  deleted_at: Date
}
//fix git

const Permission = sequelize.define<PermissionInstance>(
  'permission',
  {
    id: {
      allowNull: false,
      autoIncrement: false,
      primaryKey: true,
      type: DataTypes.UUID,
      unique: true,
    },
    name: {
      allowNull: true,
      type: DataTypes.STRING,
    },
    description: {
      allowNull: true,
      type: DataTypes.STRING,
    },
  },
  {
    underscored: true,
    paranoid: true,
  },
)
Permission.sync({ alter: { drop: false } })

export { Permission, PermissionInstance }

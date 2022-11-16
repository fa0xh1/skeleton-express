import * as Sequelize from 'sequelize'
import { UnmarshalledBank } from '../../../../src/domain/models/bank'
import { sequelize } from '../sequelize'

interface BankAttributes {
  id: string
  name: string
}

type BankCreationAttributes = Sequelize.Optional<BankAttributes, 'id'>

interface BankInstance
  extends Sequelize.Model<BankAttributes, BankCreationAttributes>,
    BankAttributes {
  created_at?: Date
  updated_at?: Date
  deleted_at?: Date
}

const Bank = sequelize.define<BankInstance, UnmarshalledBank>(
  'banks',
  {
    id: {
      allowNull: false,
      primaryKey: true,
      type: Sequelize.DataTypes.STRING,
      unique: true,
    },
    name: {
      allowNull: false,
      type: Sequelize.DataTypes.STRING,
      unique: true,
    },
  },
  {
    underscored: true,
    paranoid: true,
  },
)
Bank.sync({ alter: { drop: false } })

export { Bank, BankInstance }

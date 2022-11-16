import * as Sequelize from 'sequelize'
import { UnmarshalledPaymentMethod } from '../../../../src/domain/models/payment-method'
import { sequelize } from '../sequelize'

interface PaymentMethodAttributes {
  id: string
  name: string
}

type PaymentMethodCreationAttributes = Sequelize.Optional<
  PaymentMethodAttributes,
  'id'
>

interface PaymentMethodInstance
  extends Sequelize.Model<
      PaymentMethodAttributes,
      PaymentMethodCreationAttributes
    >,
    PaymentMethodAttributes {
  created_at?: Date
  updated_at?: Date
  deleted_at?: Date
}

const PaymentMethod = sequelize.define<
  PaymentMethodInstance,
  UnmarshalledPaymentMethod
>(
  'payment_methods',
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
PaymentMethod.sync({ alter: { drop: false } })

export { PaymentMethod, PaymentMethodInstance }

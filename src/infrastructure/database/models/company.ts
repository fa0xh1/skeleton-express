import * as Sequelize from 'sequelize'
import { UnmarshalledCompany } from '../../../../src/domain/models/company'
import { sequelize } from '../sequelize'

interface CompanyAttributes {
  id: string
  company_name: string
  company_code: string
  type: string
  email: string
  website: string
  status: string
}

type CompanyCreationAttributes = Sequelize.Optional<CompanyAttributes, 'id'>

interface CompanyInstance
  extends Sequelize.Model<CompanyAttributes, CompanyCreationAttributes>,
    CompanyAttributes {
  created_at?: Date
  updated_at?: Date
  deleted_at?: Date
}

const Company = sequelize.define<CompanyInstance, UnmarshalledCompany>(
  'companies',
  {
    id: {
      allowNull: false,
      primaryKey: true,
      type: Sequelize.DataTypes.STRING,
      unique: true,
    },
    company_name: {
      allowNull: true,
      type: Sequelize.DataTypes.STRING,
    },
    company_code: {
      allowNull: true,
      type: Sequelize.DataTypes.STRING,
    },
    type: {
      allowNull: true,
      type: Sequelize.DataTypes.STRING,
    },
    email: {
      allowNull: true,
      type: Sequelize.DataTypes.STRING,
    },
    website: {
      allowNull: true,
      type: Sequelize.DataTypes.STRING,
    },
    status: {
      allowNull: true,
      type: Sequelize.DataTypes.ENUM('active', 'inactive'),
    },
  },
  {
    underscored: true,
    paranoid: true,
  },
)
Company.sync({ alter: { drop: false } })

export { Company, CompanyInstance }

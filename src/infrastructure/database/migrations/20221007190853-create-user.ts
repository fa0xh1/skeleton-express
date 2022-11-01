import { QueryInterface, DataTypes, QueryTypes } from 'sequelize'
module.exports = {
  up: (queryInterface: QueryInterface): Promise<void> =>
    queryInterface.sequelize.transaction(async (transaction) => {
      await queryInterface.createTable('Users', {
        id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: DataTypes.INTEGER,
        },
        role_id: {
          type: DataTypes.INTEGER,
        },
        email: {
          type: DataTypes.STRING,
        },
        password: {
          type: DataTypes.STRING,
        },
        fullname: {
          type: DataTypes.STRING,
        },
        phone: {
          type: DataTypes.STRING,
        },
        createdAt: {
          allowNull: false,
          type: DataTypes.DATE,
        },
        updatedAt: {
          allowNull: false,
          type: DataTypes.DATE,
        },
      })
    }),
  down: (queryInterface: QueryInterface): Promise<void> =>
    queryInterface.sequelize.transaction(async () => {
      await queryInterface.dropTable('Users')
    }),
}

module.exports = {
    async up(queryInterface: any, Sequelize: any) {
      await queryInterface.createTable('loans', {
        id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: Sequelize.INTEGER
        },
        user_id: {
          type: Sequelize.INTEGER,
          references: {
            model: "users",
            key: "id"
          }
        },
        jumlah: {
          type: Sequelize.FLOAT
        },
        createdAt: {
          allowNull: false,
          type: Sequelize.DATE
        },
        updatedAt: {
          allowNull: false,
          type: Sequelize.DATE
        }
      });
    },
    async down(queryInterface: any, Sequelize: any) {
      await queryInterface.dropTable('Loans');
    }
  };
import { Sequelize } from 'sequelize'

export const sequelize: Sequelize = new Sequelize({
  database: 'pmdb',
  dialect: 'postgres',
  username: 'admin',
  password: 'admin',
  port: 5433
})

// export default { sequelize }
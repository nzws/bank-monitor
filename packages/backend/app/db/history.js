import Sequelize from 'sequelize';

const History = sequelize => {
  return sequelize.define('history', {
    id: {
      allowNull: false,
      primaryKey: true,
      unique: true,
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV4
    },
    UID: Sequelize.STRING,
    bankId: Sequelize.STRING,
    name: Sequelize.STRING,
    amount: Sequelize.INTEGER,
    balance: Sequelize.INTEGER,
    date: Sequelize.DATE,
    data: Sequelize.JSON
  });
};

export default History;

import Sequelize from 'sequelize';

const Status = sequelize => {
  return sequelize.define('status', {
    UID: {
      type: Sequelize.STRING,
      allowNull: false,
      primaryKey: true
    },
    bankId: {
      type: Sequelize.STRING,
      allowNull: false,
      primaryKey: true
    },
    running: Sequelize.BOOLEAN,
    lastUpdatedAt: Sequelize.DATE,
    balance: Sequelize.INTEGER
  });
};

export default Status;

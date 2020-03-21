import Sequelize from 'sequelize';

const Notification = sequelize => {
  return sequelize.define('notification', {
    id: {
      primaryKey: true,
      unique: true,
      type: Sequelize.INTEGER,
      autoIncrement: true
    },
    UID: Sequelize.STRING,
    type: Sequelize.STRING,
    data: Sequelize.JSON
  });
};

export default Notification;

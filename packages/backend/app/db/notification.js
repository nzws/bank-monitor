import Sequelize from 'sequelize';

const Notification = sequelize => {
  return sequelize.define('notification', {
    id: {
      allowNull: false,
      primaryKey: true,
      unique: true,
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV4
    },
    UID: Sequelize.STRING,
    type: Sequelize.STRING,
    data: Sequelize.JSON
  });
};

export default Notification;

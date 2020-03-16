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
    title: Sequelize.STRING,
    body: Sequelize.TEXT
  });
};

export default Notification;

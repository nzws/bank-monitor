import Sequelize from 'sequelize';

const FCMGroup = sequelize => {
  return sequelize.define('fcm-group', {
    UID: {
      primaryKey: true,
      type: Sequelize.STRING
    },
    token: Sequelize.STRING
  });
};

export default FCMGroup;

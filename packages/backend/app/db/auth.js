import crypto from 'crypto';
import Sequelize from 'sequelize';

const Auth = sequelize => {
  return sequelize.define('auth', {
    token: {
      primaryKey: true,
      type: Sequelize.STRING,
      set() {
        this.setDataValue('token', crypto.randomBytes(32).toString('hex'));
      }
    },
    deviceToken: {
      allowNull: true,
      type: Sequelize.STRING
    },
    device: {
      allowNull: false,
      type: Sequelize.TEXT
    },
    IP: Sequelize.STRING,
    UID: Sequelize.STRING,
    isDeleted: {
      allowNull: true,
      type: Sequelize.DATE
    }
  });
};

export default Auth;

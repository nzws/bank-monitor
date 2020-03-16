import Sequelize from 'sequelize';

import Auth from './auth';
import History from './history';
import Notification from './notification';
import FCMGroup from './fcmgroup';

const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: './db.sqlite'
});

const db = {
  tables: {
    Auth,
    History,
    Notification,
    FCMGroup
  }
};

Object.keys(db.tables).forEach(key => {
  db.tables[key] = db.tables[key](sequelize);
});

export default db;

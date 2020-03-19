import Sequelize from 'sequelize';

import Auth from './auth';
import History from './history';
import Notification from './notification';
import Status from './status';

const isDevelopment = process.env.NODE_ENV === 'development';
const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: './db.sqlite',
  benchmark: isDevelopment,
  logging: isDevelopment ? console.log : false,
  dialectOptions: {
    timezone: 'Asia/Tokyo'
  }
});

const db = {
  tables: {
    Auth,
    History,
    Notification,
    Status
  }
};

Object.keys(db.tables).forEach(key => {
  db.tables[key] = db.tables[key](sequelize);
});

export default db;

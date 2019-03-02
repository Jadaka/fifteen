import knex from 'knex';
import { DB_HOST, DB_USER, DB_PASSWORD }
    from '../server/config';

const db = knex({
  client: 'mysql2',
  connection: {
    host : DB_HOST,
    user : DB_USER,
    password : DB_PASSWORD,
    database : 'fifteen',
  },
});

const createTables = async () => {
  return createUserTable();
};

const createUserTable = async () => {
  return db.schema.hasTable('user').then((exists) => {
    if (exists) {
      console.log('table user exists.');
      return;
    };

    return db.schema.createTable('user', function (table) {
      table.increments();
      table.string('username');
      table.integer('experience').notNullable();
      table.integer('pinks').notNullable();
      table.timestamps();
    })
      .then((result) => {
        console.log('table user created.');
      });
  });
};

(async () => {
  await createTables();
})();

import knex from 'knex';
import { DB_HOST, DB_USER, DB_PASSWORD, DB_NAME }
    from '../server/config';

const db: knex = knex({
  client: 'mysql2',
  connection: {
    host : DB_HOST,
    user : DB_USER,
    password : DB_PASSWORD,
    database : DB_NAME,
  },
});

db.schema.createTable('users', function (table) {
  table.increments();
  table.string('username');
  table.integer('experience').notNullable();
  table.integer('pinks').notNullable();
  table.timestamps();
})

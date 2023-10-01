import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  await knex.raw(
    `INSERT INTO users(id, username, password) VALUES ('550e8400-e29b-41d4-a716-446655440000', 'test', 'test');
     INSERT INTO counters(id, user_id, count) VALUES ('550e8400-e29b-41d4-a716-446655440000', '550e8400-e29b-41d4-a716-446655440000', 0);`,
  );
  await knex.raw(
    `INSERT INTO users(id, username, password) VALUES ('550e8400-e29b-41d4-a716-446655440001', 'test2', 'test2');
     INSERT INTO counters(id, user_id, count) VALUES ('550e8400-e29b-41d4-a716-446655440001', '550e8400-e29b-41d4-a716-446655440001', 0);`,
  );
}

export async function down(knex: Knex): Promise<void> {}

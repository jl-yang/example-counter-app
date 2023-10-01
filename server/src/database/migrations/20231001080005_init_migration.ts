import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  await knex.raw(`
        CREATE TABLE users (
            id UUID PRIMARY KEY,
            username text,
            password text,
            is_log_in boolean DEFAULT FALSE,
            UNIQUE (username, password)
        );
        
        CREATE TABLE counters (
            id UUID PRIMARY KEY, 
            user_id UUID, 
            count integer, 
            CONSTRAINT fk_user_id 
                FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
        );

        CREATE INDEX counters_user_id_idx ON counters (user_id);`);
}

export async function down(knex: Knex): Promise<void> {
  await knex.raw(`
        DROP TABLE IF EXISTS counters CASCADE;
        DROP TABLE IF EXISTS users CASCADE;`);
}

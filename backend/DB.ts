import { Pool } from 'pg';

export default new Pool({
    user: '',
    host: 'smarthomes.postgres.database.azure.com',
    database: 'wattage',
    password: "",
    port: 5432,
    max: 20,
    ssl: true,
    idleTimeoutMillis: 30000
});

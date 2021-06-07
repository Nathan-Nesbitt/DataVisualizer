import pool from '../DB';

class MainController {

    public async summary(req, res, next) {
        try {
            const client = await pool.connect();

            const sql = 'SELECT "Wattage" as y, TO_CHAR("DateTime", \'YYYY-MM-DD\') as x, "Serial_Number" as name FROM readings GROUP BY "DateTime", "Serial_Number", "Wattage" ORDER BY "DateTime"';
            const { rows } = await client.query(sql);
            const data = rows;

            client.release();

            res.send(data);

        } catch (error) {
            res.status(400).send(error);
        }
    }

    public async get_serial_nums(req, res, next) {
        try {
            const client = await pool.connect();

            const sql = 'SELECT DISTINCT "Serial_Number" FROM readings ORDER BY "Serial_Number"';
            const { rows } = await client.query(sql);
            const data = rows;

            client.release();

            res.send(data);
        } catch (error) {
            res.status(400).send(error);
        }
    }

    public async get_device_ids(req, res, next) {
        try {
            const client = await pool.connect();

            var serial_number = req.query.serial_number;

            var sql = 'SELECT DISTINCT "Device_ID" FROM readings ORDER BY "Device_ID"';
            var params = [];

            if (serial_number) {
                sql = 'SELECT DISTINCT "Device_ID" FROM readings WHERE "Serial_Number" = $1 ORDER BY "Device_ID"';
                params = [serial_number];
            }

            const { rows } = await client.query(sql, params);
            const data = rows;

            client.release();

            res.send(data);
        } catch (error) {
            res.status(400).send(error);
        }
    }

    public async get_limited_data(req, res, next) {
        try {
            const client = await pool.connect();
            var sql, params;
            var device_id = req.query.device_id;
            var serial_number = req.query.serial_number;

            if (device_id && serial_number) {
                sql = 'SELECT SUM("Wattage") as y, TO_CHAR("DateTime", \'YYYY-MM-DD HH24:MI:SS\') as x FROM readings WHERE "Wattage" IS NOT NULL AND "Device_ID" = $1 AND "Serial_Number" = $2 GROUP BY "DateTime" ORDER BY "DateTime"';
                params = [device_id, serial_number];
            }

            else if (device_id) {
                sql = 'SELECT SUM("Wattage") as y, TO_CHAR("DateTime", \'YYYY-MM-DD HH24:MI:SS\') as x FROM readings WHERE "Wattage" IS NOT NULL AND "Device_ID" = $1 GROUP BY "DateTime" ORDER BY "DateTime"';
                params = [device_id]
            }

            else if (serial_number) {
                sql = 'SELECT SUM("Wattage") as y, TO_CHAR("DateTime", \'YYYY-MM-DD HH24:MI:SS\') as x FROM readings WHERE "Wattage" IS NOT NULL AND "Serial_Number" = $1  GROUP BY "DateTime" ORDER BY "DateTime"';
                params = [serial_number];
            }
            const { rows } = await client.query(sql, params);
            const data = rows;

            client.release();

            res.send(data);
        } catch (error) {
            res.status(400).send(error);
        }
    }
}

export default MainController;
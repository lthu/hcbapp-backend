const db = require('./dbconfig.js');

const getAllRides = (req, res) => {
    db.query('SELECT * FROM journeys LIMIT 10000 OFFSET 1', (err, result) => {
    if (err)
        console.error(err);
    else
        res.json(result.rows);
    })
}

const getRideById = (req, res) => {
    const query = {
        text: 'SELECT * FROM journeys WHERE id = $1',
        values: [req.params.id],
    }

    db.query(query, (err, result) => {
        if (err) {
            return console.error('Error executing query', err.stack)
        } else {
            if (result.rows.length > 0)
                res.json(result.rows)
            else 
                res.status(404).end();
        }
    })
}

const getAllStations = (req, res) => {
    db.query('SELECT * FROM stations', (err, result) => {
    if (err)
        console.error(err);
    else
        res.json(result.rows);
    })
}

const getStationById = (req, res) => {
    const query = {
        text: 'SELECT * FROM stations WHERE station_id = $1',
        values: [req.params.id]
    }
    
    db.query(query, (err, result) => {
        if (err) {
            return console.error('Error executing query', err.stack)
        } else {
            if (result.rows.length > 0)
                res.json(result.rows)
            else 
                res.status(404).end();
        }
    })
}


module.exports = {
    getAllRides: getAllRides,
    getRideById: getRideById,
    getStationById: getStationById,
    getAllStations: getAllStations,
}
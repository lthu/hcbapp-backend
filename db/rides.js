const db = require('./dbconfig.js');


// Get a list of ALL the rides.
// To consider: is this the best practice as there are more than 1.6 million records in the database.
const getAllRides = (res) => {
    db.query('SELECT * FROM journeys;', (err, result) => {
    if (err)
        console.error(err);
    else
        res.json(result.rows);
    })
}

// Get ride details by id number.
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


// Get a list of all the stations: name and station_id?
const getAllStations = (req, res) => {
    db.query('SELECT * FROM stations', (err, result) => {
    if (err)
        console.error(err);
    else
        res.json(result.rows);
    })
}

// Get details of individual station by station_id number. 
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
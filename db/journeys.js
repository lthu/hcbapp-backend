const db = require('./dbconfig.js');


// Get a list of ALL the rides.
// To consider: is this the best practice as there are more than 1.6 million records in the database.
const getAllJourneys = (res) => {
    db.query('SELECT * FROM journeys;', (err, result) => {
    if (err)
        console.error(err);
    else
        res.json(result.rows);
    })
}

// Get ride details by id number.
const getJourneyById = (req, res) => {
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
        text: 'SELECT S.station_id, S.name, COUNT(J.id) AS returned_journeys_total, (SELECT COUNT(*) FROM journeys WHERE departure_station_id = $1) AS departed_journeys_total, AVG(distance) AS avg_return_distance, (SELECT AVG(distance) FROM journeys WHERE departure_station_id = $1) AS avg_departure_distance ,S.address, S.city, S.operator, S.capacity, S.coordinate_x, S.coordinate_y FROM stations S LEFT JOIN journeys J ON S.station_id = J.return_station_id WHERE S.station_id = $1 GROUP BY S.station_id, S.name, S.address, S.city, S.operator, S.capacity, S.coordinate_x, S.coordinate_y',
        values: [req.params.id]
    }
    
    db.query(query, (err, result) => {
        if (err) {
            return console.error('Error executing query', err.stack)
        } else {
            if (result.rows.length > 0)
                res.json(result.rows);
            else 
                res.status(404).end();
        }
    })
}
const getTop5ReturnStationsById = (req, res) => {
    const query = {
        text: 'SELECT S.station_id, S.name, count(J.return_station_id) as count FROM journeys J LEFT JOIN stations S ON J.return_station_id = S.station_id WHERE J.departure_station_id = $1 GROUP BY S.station_id, S.name ORDER BY count DESC LIMIT 6 OFFSET 0',
        values: [req.params.id]
    }
    
    db.query(query, (err, result) => {
        if (err) {
            return console.error('Error executing query', err.stack)
        } else {
            if (result.rows.length > 0)
                res.json(result.rows);
            else 
                res.status(404).end();
        }
    })
}
const getTop5DepartureStationsById = (req, res) => {
    const query = {
        text: 'SELECT S.name, count(J.departure_station_id) as count FROM journeys J LEFT JOIN stations S ON J.departure_station_id = S.station_id WHERE J.return_station_id = $1 GROUP BY S.name ORDER BY count DESC LIMIT 5 OFFSET 0',
        values: [req.params.id]
    }
    
    db.query(query, (err, result) => {
        if (err) {
            return console.error('Error executing query', err.stack)
        } else {
            if (result.rows.length > 0)
                res.json(result.rows);
            else 
                res.status(404).end();
        }
    })
}

module.exports = {
    getAllJourneys: getAllJourneys,
    getJourneyById: getJourneyById,
    getStationById: getStationById,
    getTop5ReturnStationsById: getTop5ReturnStationsById,
    getTop5DepartureStationsById: getTop5DepartureStationsById,
    getAllStations: getAllStations,
}
const express = require('express');
const bodyParser = require('body-parser');
const query = require('./db/rides.js');
const app = express();
app.use(bodyParser.json());

const port = 3000;


app.get("/api/rides", query.getAllRides)

app.get("/api/rides/:id", query.getRideById)
app.get("/api/stations/:id", query.getStationById)
app.get("/api/stations/", query.getAllStations)

//app.post("/api/movies/", query.addMovie)
//app.delete("/api/movies/:id", query.deleteMovie)
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
})
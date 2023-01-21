const express = require('express');
const bodyParser = require('body-parser');
const query = require('./db/journeys.js');
const app = express();
app.use(bodyParser.json());

const port = 3000;


app.get("/api/journeys", query.getAllJourneys)
app.get("/api/journeys/:id", query.getJourneyById)
app.get("/api/stations/:id", query.getStationById)
app.get("/api/stations/", query.getAllStations)

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
})
const express = require('express');
const bodyParser = require('body-parser');
const query = require('./db/journeys.js');
const app = express();
const cors = require('cors')

app.use(cors({origin: 'http://localhost:4200'}));

app.use(bodyParser.json());

const port = 3000;



app.get("/api/journeys", query.getAllJourneys)
app.get("/api/journeys/:id", query.getJourneyById)
app.get("/api/stations/:id", query.getStationById)
app.get("/api/stations/", query.getAllStations)
app.get("/api/stations/top5ReturnStations/:id", query.getTop5ReturnStationsById)
app.get("/api/stations/top5DepartureStations/:id", query.getTop5DepartureStationsById)

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
})
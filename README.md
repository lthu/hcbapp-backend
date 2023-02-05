# Helsinki City Bike App Backend

This backend is built with Express.js a nodejs framework.

## Tables for SQL
For my project I used PostgreSQL and created the following tables.

### Journeys
`CREATE TABLE journeys (id SERIAL PRIMARY KEY, departure_time TIMESTAMP, return_time TIMESTAMP, departure_station_id INT, return_station_id INT,distance INT DEFAULT 0, duration int DEFAULT 0 NOT NULL);`

### Stations
`CREATE TABLE stations (id SERIAL PRIMARY KEY, station_id INT, name VARCHAR(255), name_swe VARCHAR(255), address VARCHAR(255), address_swe VARCHAR(255), city VARCHAR(50), city_swe VARCHAR(50), operator VARCHAR(100), capacity INT DEFAULT 0 NOT NULL, coordinate_x FLOAT, coordinate_y FLOAT);`

### Fixing the datasets

For starters I removed all double entries from datasets with:

`perl -ne 'print if $SEEN{$_}++' < 2021-05.csv >> rides_doubles_removed.csv`

`perl -ne 'print if $SEEN{$_}++' < 2021-06.csv >> rides_doubles_removed.csv`

`perl -ne 'print if $SEEN{$_}++' < 2021-07.csv >> rides_doubles_removed.csv`

Next was to remove unnecessary quotation marks. At the same time I cut the fields I wanted to include in the database.

`awk -v v='"' 'BEGIN{FS=OFS=v}{gsub(",","",$2);print }' rides_doubles_removed.csv > rides_cleaned.csv`

`awk -v v='"' 'BEGIN{FS=OFS=v}{gsub(",","",$4);print }' rides_cleaned.csv  | cut -f 1,2,3,5,7,8 -d , | sed 's/\...//' >  rides_final.csv`

### Importing to SQL

For importing data to PostgreSQL I used the builtin copy command for stations:

`COPY stations(station_id, name, name_swe, address, address_swe, city, city_swe, operator, capacity, coordinate_x, coordinate_y) FROM '/path/to/data.csv' DELIMITER ',';`

And for the journeys:

`COPY journeys(departure_time, return_time, departure_station_id, return_station_id, distance, duration) FROM '/path/to/data.csv' DELIMITER ',', FORMAT CSV;`

### Removing short journeys

As we didn't want to include journeys that lasted less than 10 seconds or were shorter than 10 meters:

`lauri=# SELECT COUNT(*) FROM journeys WHERE duration < 10 OR distance < 10;`

resulted in 57957 rows that I simply deleted from the database.


### Additional
For default there is a limit for amount of journeys fetched from db. To modify the limit look for SQL command under getAllJourneys function.
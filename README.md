### hotel-location

#### Task

Back-end: write, document and test an API with the below endpoints:
* api/properties?at=LAT,LONG	//Returns the property around Lat/Lon
* api/bookings	//Creates a booking for a property.
* api/properties/PROPERTY_ID/bookings	//Returns the bookings for a property

Include a minimal front-end (e.g. a static view) and an API docs.

#### How to run this project

###### Run it with docker
Requirements:
* docker
* docker-compose

Instructions:
* Clone this repo
* Go to the repo root
* Copy the .env.example file to .env (you can modify port settings, database default params will work)
* Run ``` make up ``` if you use Linux (if not you can run ``` docker-compose up -d```).
* Run ``` make node ``` (or ```docker exec -it hotel_location_node_nusspaumer_container bash```).
* Inside the container run ```npm run migration``` to create the database.

###### Run it without docker
Requirements:
* Node 12

Instructions:
* Clone this repo
* Go to the repo root
* Copy the .env.example file to .env (configure your database & port settings)
* Run ```npm run migration``` to create the database.

Postman collection: https://www.getpostman.com/collections/f755f53600a0a0881834

#### Test
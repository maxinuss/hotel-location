### hotel-location

#### Task

Back-end: write, document and test an API with the below endpoints:
* api/properties?at=LAT,LONG	//Returns the property around Lat/Lon
* api/bookings	//Creates a booking for a property.
* api/properties/PROPERTY_ID/bookings	//Returns the bookings for a property

Include a minimal front-end (e.g. a static view) and an API docs.

### How to run this project

#### Get Google places key

* Follow the instructions: https://developers.google.com/places/web-service/get-api-key?hl=es
* You can create a project to handle this key.
* Then you need to enable Places API for this key. Please go to "Library" and search for Places API and enable it.
* To be sure if your setup is successful, you can test this URL with your API key:
```https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=-33.8670522,151.1957362&radius=500&types=food&name=harbour&key={YOUR API KEY}```
The response must be a json object with a lot of information.

#### Run it with docker
Requirements:
* docker
* docker-compose
* Google places key

Instructions:
* Clone this repo
* Go to the repo root
* Copy the .env.example file to .env (you can modify port settings and , database default params will work)
* Be sure that you add your google places key in .env file.
* Run ``` make up ``` if you use Linux (if not you can run ``` docker-compose up -d```).
* Run ``` make node ``` (or ```docker exec -it hotel_location_node_nusspaumer_container bash```).
* Inside the container run ```npm run migration``` to create the database.

#### Run it without docker
Requirements:
* Node 12
* Google Places Key

Instructions:
* Clone this repo
* Go to the repo root
* Copy the .env.example file to .env (configure your database & port settings)
* Be sure that you add your google places key in .env file.
* Run ```npm run migration``` to create the database.

#### Endpoints

###### List properties: ```GET``` http://{{URL}}/api/properties?at={{LAT}},{{LONG}}

Response
```
{
    "success": true,
    "data": [
        {
            "id": "ChIJWbSN8q5ZwokRpLN00upxy8g",
            "name": "Hotel Pennsylvania",
            "rating": 2.8,
            "vicinity": "401 7th Ave, New York",
            "latLong": "40.7499775, -73.9910082"
        }
    ]
}
```

###### Add booking: ```POST``` http://{{URL}}/api/bookings

Payload:

```
{
	"userId": 1,
	"propertyId": 90
}
```

Response
```
{
    "success": true,
    "data": {
        "id": 19,
        "property_id": 90,
        "user_id": 1,
        "creation_datetime": "2020-02-27T22:51:48.500Z"
    }
}
```

###### Get one booking: ```GET``` http://{{URL}}/api/properties/{{ID}}/bookings

Response:
```
{
    "success": true,
    "data": {
        {
            "id": 18,
            "property_id": 90,
            "user_id": 1,
            "creation_datetime": "2020-02-25T08:45:05.859Z"
        },
        {
            "id": 19,
            "property_id": 90,
            "user_id": 7,
            "creation_datetime": "2020-02-27T22:51:48.500Z"
        }
    }
}
```

Postman collection: https://www.getpostman.com/collections/f755f53600a0a0881834

#### Test
To run test:

* if you use Docker ```make node``` (or ```docker exec -it hotel_location_node_nusspaumer_container bash```) and ```npm test```
* if you dont use Docker ```npm test```

#### Minimal front end
In your browser
``` http://{{URL}}/index.html ```
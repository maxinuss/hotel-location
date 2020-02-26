.PHONY: up down

MAKEPATH := $(abspath $(lastword $(MAKEFILE_LIST)))
PWD := $(dir $(MAKEPATH))

up:
	docker-compose up -d --build

down:
	docker-compose down

node:
	docker exec -it hotel_location_node_nusspaumer_container bash

postgre:
	docker exec -it hotel_location_db_nusspaumer_container bash
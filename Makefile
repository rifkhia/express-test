include .env

create-migration:
	$(eval timestamp := $(shell date +%s))
	touch migrations/$(timestamp)_${name}.up.sql
	touch migrations/$(timestamp)_${name}.down.sql

up-migration:
	migrate --path=migrations/ \
			--database "postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}/${DB_NAME}" up

rollback-migration:
	migrate --path=migrations/ \
			--database "postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}/${DB_NAME}" down


FROM postgres:16

LABEL author="Xcho"
LABEL description="Xcho Database"
LABEL version="1.0"

ENV POSTGRES_PASSWORD 123456
ENV POSTGRES_DB xcho

COPY /initdb/xcho.sql /docker-entrypoint-initdb.d/

# TO BUILD AND RUN DOCKER
# docker build -t xcho-database .
# docker run -d --name xcho-database -p 2502:5432 xcho-database

# TO DUMP (EXPORT) SQL
# docker exec postgres-engine pg_dump -h localhost -U postgres xcho > xcho.sql
FROM postgres:latest

LABEL author="Xcho" 
LABEL description="Xcho Database" 
LABEL version="1.0"  

COPY *.sql /docker-entrypoint-initdb.d/

# TO BUILD AND RUN DOCKER
# docker build -t xcho-database:latest .
# docker run --name xcho-database -p 5432:5432 -e POSTGRES_PASSWORD=123456 -d postgres

# TO DUMP (EXPORT) SQL
# docker exec postgres-engine pg_dump -h localhost -U postgres xcho > test.sql
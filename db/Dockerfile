FROM postgres:16

LABEL author="Xcho"
LABEL description="Xcho Database"
LABEL version="1.0"

ENV POSTGRES_PASSWORD 123456
ENV POSTGRES_DB xcho

RUN localedef -i th_TH -c -f UTF-8 -A /usr/share/locale/locale.alias th_TH.UTF-8
# ENV LANG th_TH.utf8

COPY ./initdb/xcho.sql /docker-entrypoint-initdb.d/

# TO BUILD AND RUN DOCKER
# docker build -t xcho-database .
# docker run -d --name xcho-database -p 2502:5432 xcho-database

# TO DUMP (EXPORT) SQL
# docker exec postgres-engine pg_dump -h localhost -U postgres xcho > xcho.sql
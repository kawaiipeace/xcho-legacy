FROM postgres:17

LABEL author="Xcho"
LABEL description="Xcho Database"
LABEL version="1.0"

RUN localedef -i th_TH -c -f UTF-8 -A /usr/share/locale/locale.alias th_TH.UTF-8
ENV LANG=th_TH.utf8
ENV USE_PGXS=1
ENV TZ=Asia/Bangkok
ENV PG_INITDB_OPTS "--locale=C --encoding=UTF8"

RUN apt-get update && \
    apt-get install -y postgresql-server-dev-17 postgresql-17-cron make gcc git curl libkrb5-dev && \
    apt-get clean

RUN git clone --branch main https://github.com/pgaudit/pgaudit.git /tmp/pgaudit && \
    cd /tmp/pgaudit && \
    make && \
    make install && \
    rm -rf /tmp/pgaudit

COPY ./initdb/xcho.sql /docker-entrypoint-initdb.d/

EXPOSE 5432

CMD ["postgres"]
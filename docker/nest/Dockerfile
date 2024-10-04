ARG APP_MODE=dev

FROM node:20.11.0 as base

WORKDIR /opt/app

RUN apt update && apt install -y chromium

RUN chmod +x /usr/bin/chromium

FROM base AS dev

COPY /docker/nest/scripts/entrypoint.sh /

RUN chmod +x /entrypoint.sh

USER node

ENTRYPOINT ["/entrypoint.sh"]

FROM base AS prod

COPY /app .

RUN npm install
RUN npm run build

CMD ["npm", "run", "start:prod"]

FROM ${APP_MODE} AS final

FROM node:latest

ENV PORT=3000
ENV TZ=America/New_York

WORKDIR /app
COPY ./dist/apps/api/package.json /app/
RUN npm install
COPY ./dist/apps/api/ /app/
COPY .docker.env /app/.env
CMD ["node", "main.js"]
EXPOSE ${PORT}
FROM node:latest

ENV PORT=3000
ENV TZ=America/New_York

WORKDIR /app
COPY package.json /app/
RUN npm install
COPY . /app/
COPY .docker.env /app/.env
CMD ["npm", "run", "start"]
EXPOSE ${PORT}
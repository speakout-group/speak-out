FROM node:lts-alpine
WORKDIR /app
COPY ./dist/apps/api .
COPY ./k8s/api/ca-certificate-mongo.crt .
ENV PORT=3000
EXPOSE ${PORT}
RUN npm install --production
# dependencies that nestjs needs
RUN npm install pg
CMD node ./main.js

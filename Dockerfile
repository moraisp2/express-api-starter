FROM node:lts-alpine AS DEV
WORKDIR /usr/app/
ENV HTTPS_PROXY http:\\moraisp2:*@10.74.51.1:80
COPY ./package.json .
RUN --mount=type=secret,id=mysecret export $(cat /run/secrets/mysecret | xargs)
RUN npm install
COPY . .
RUN npm run test

FROM node:lts-alpine AS PROD
ENV NODE_ENV production
ENV PORT 80
ENV HTTPS_PROXY http:\\moraisp2:*@10.74.51.1:80
WORKDIR /usr/app/
COPY --from=DEV /usr/app/src ./src
COPY --from=DEV /usr/app/package.json .
RUN --mount=type=secret,id=mysecret export $(cat /run/secrets/mysecret | xargs)
RUN npm install --production
EXPOSE 80
ENTRYPOINT ["npm", "start"]
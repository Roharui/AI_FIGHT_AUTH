FROM node:14

WORKDIR /usr/src/app

COPY ./dist .

EXPOSE 3001
CMD ["node", "bundle.js"]
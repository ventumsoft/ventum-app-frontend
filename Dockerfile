FROM node:14

ENV BASE_URL=http://localhost
ENV API_SITE=jhi7h
ENV API_ORIGIN=http://api.ventumprint.local
ENV API_URL=http://api.ventumprint.local/site/jhi7h/

WORKDIR /app

COPY package*.json ./

RUN npm ci

COPY . .

RUN npm run build

ENV HOST=0
ENV PORT=80

EXPOSE 80

CMD [ "npm", "run", "start" ]

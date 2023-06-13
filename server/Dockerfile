FROM node:18.6

WORKDIR /app
COPY package.json .
RUN yarn install
COPY . .
RUN yarn prisma generate
RUN yarn build

CMD ["yarn", "run" , "start:deploy"]

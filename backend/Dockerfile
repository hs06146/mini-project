FROM node:18

WORKDIR /mini-project/
COPY ./package.json /mini-project/
COPY ./yarn.lock /mini-project/
RUN yarn install

COPY . /mini-project/

CMD yarn start
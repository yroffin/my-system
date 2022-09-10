from node:latest
workdir /app
copy *.json /app/
run npm install
copy *.js /app/
copy src /app/src
run /app/node_modules/.bin/ng build

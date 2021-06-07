# Data Visualizer

A simple data visualization tool using React and TypeScript. This was written
on a Windows box.

## Setup

To install the dependencies for both the front and back end you simply need to 
start in the root, run `npm install`. Then go into the `frontend` directory and
run `npm install`.

You will need to update the `backend/DB.ts` file to the username and password for the database. It **must be escaped** for example `\` must be `\\`. 

## Build

To build the whole application on windows you can simply run 
`npm run build-all`. If you want to build them individually for whatever reason
you can also run `npm build` within each directory (root for backend, frontend 
for the frontend)

## Run

To start the application for dev you can run `npm run dev` in the root to start
the API. You can then navigate in a separate terminal to the frontend folder 
`/frontend` and run the same command to start the front end. The API runs on
`localhost:8080` while the front end runs on `localhost:3000`

For production on Windows run `npm run start-windows` in the root, and navigate
to `localhost:8080`. On linux run `npm start`. This could be triggered 
by pm2 as well by passing the required `PRODUCTION=TRUE` parameter before the
command. E.G. `PRODUCTION=TRUE pm2 start npm -- start`
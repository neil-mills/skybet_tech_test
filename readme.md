# Skybet JS Tech Test

## Tech choices

For state management I have used Redux.

To integrate websockets more closely with Redux, I have implemented a custom dispatch method which passes the message type and payload directly to the reducer when the websocket message received event is fired. I have created individual reducer and action files for event, markets and outcomes. 

For UI stying I have used styled components which keeps my codebase more modular and removes any CSS inheritance issues.

For testing I have used Jest along with React testing library. I enjoy working with RTL as it integrates more closely with the DOM than Enzyme and is more intuitive to use.

## Running the app

The app is in the `/frontend` directory within a Docker container. To spin up the app, cd to the root and run `docker-compose up --build`

## Tests

To run tests, cd to `/frontend` and run `npm run test`. Due to time constraints ive not been able to complete all unit testing.

### TODO
- Complete unit testing for Betslip
- Add loading state

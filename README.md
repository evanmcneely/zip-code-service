# Zip and Postal Code Lookup Service

## Getting Started

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

This concurrently starts the server on port 4000.\
Visit [http://localhost:4000](http://localhost:4000) to use Apollo sandbox.

### `npm test`

Runs Jest tests

## If I had more time

- Revisit error handling to offer more specific error messages to the user depending on whether the ZipCode doesn't exist or if there is a network error. This would make the user experience better as there are some errors the user should know details about (ie. incorrect use of the app - wrong zip code format, etc.).
- Add tests for the React UI or do a more thorough manual test. I spent more time here than I anticipated and am still concerened about some little bugs that might still exist.
- If decreasing lataency was a priority, we could add a caching layer at the server to check if we have already queried the Zippoppotamus API recently with the same zip code (this would speed the response up when I query 90210 over and over again).

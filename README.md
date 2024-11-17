-- Isla Message Parser

The solution has been written in TypeScript and an Express server. Unit tests are written in Jest.

In order to run the application, clone this repo and run the following commands on the terminal
cd isa-message-parser
npm install
npm run dev

In order to test the application, run the following command:
npm run test (To test)
I've used Postman to test the endpoint
Note: The message wasn't a correct JSON so needed an extra "\" - hope that is okay.

I've written the solution using functional program paradigm, so lots of small, modular functions that only do one thing.

The benefit of doing it this way is that it's easy to test, extend and even modify business logic as the codebase scales provided there's enough tests. One of the biggest benefits of this style is that it helps you move incredibly fast without breaking things.

However, one of the disadvantages is that you might end up writing duplicate code (Which can always be packaged up separately). Furthermore, it can be slow to do integration tests where you have to mock the responses from the smaller functions.

It's also easy to read, and understand what's going on.

Step by step guide:

- Starting point is index.ts
- The api layer has a router called patientDiagnosis.ts
- The controller is where the business logic sits, this is responsible for the following: - validate the message - Step 1: Get all the segments - Step 2: Validate all the segments and turn this into a JSON (To make it easy to work with) - Step 3: Get patient records - Step 4: Get patient diagnosis

This can be easily extended to extract more fields, or modify the message segments as required.

I've separted the routes in the routes folder (API layer), and the controller contains the main bit of business logic.

In this scenario, if I was going to interact with the db, this would have gone into a models folder

db connection, etc. could be stored in config.

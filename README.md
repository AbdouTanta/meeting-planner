# Meeting Planner Demo API

This project was built using Node, Typescript and Express framework.

To run the project locally, the steps to follow are:
1. Add an **.env** file at the root of the project, following the structure provided at **.env.example**.
2. Run `npm install` to install dependencies.
3. Run `npx prisma migrate dev`  to create and populate the database (SQLite).
4. Run `npm run dev` to spin up the server.
5. Run `npm run test` to run tests.

## Endpoints:
* POST /reservation
```
body: {
  startHour: number;
  type: string;
  numberOfPeople: number;
}
```
Example: 
```
body: {
  startHour: 8;
  type: "RS";
  numberOfPeople: 2;
}
```
* GET /reservation/:id

The id should be provided in the post reservation response if successful.

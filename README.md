# Node.js MongoDB User API

A small REST API built with Express and Mongoose for creating, listing, updating,
and deleting users in MongoDB.

## Requirements

- Node.js and npm
- A MongoDB server, local or hosted

## Setup

1. Install dependencies:

   ```bash
   npm install
   ```

2. Create a `.env` file in the project root and set `MONGODB_URI` to the MongoDB
   connection URI **without a database name**. The app adds `/testdb` to this
   URI when connecting.

   For a local MongoDB server:

   ```dotenv
   MONGODB_URI=mongodb://127.0.0.1:27017
   ```

   Make sure MongoDB is running and accepting connections on port `27017`.

3. Start the API:

   ```bash
   node server.js
   ```

The server listens at `http://localhost:3000`. It exits with an error if
`MONGODB_URI` is missing; check the startup output to confirm the database
connection succeeded.

## API

All endpoints use JSON. A user has the following fields:

| Field | Type | Required |
| --- | --- | --- |
| `name` | String | Yes |
| `email` | String | Yes; must be unique |
| `age` | Number | No |

### Create a user

`POST /users`

```bash
curl -X POST http://localhost:3000/users \
  -H 'Content-Type: application/json' \
  -d '{"name":"Ada Lovelace","email":"ada@example.com","age":36}'
```

Returns the created user with status `201`.

### List users

`GET /users`

```bash
curl http://localhost:3000/users
```

Returns an array of users.

### Update a user

`PUT /users/:id`

```bash
curl -X PUT http://localhost:3000/users/USER_ID \
  -H 'Content-Type: application/json' \
  -d '{"age":37}'
```

Replace `USER_ID` with the user's MongoDB document ID. Returns the updated user,
or `404` if no user exists with that ID.

### Delete a user

`DELETE /users/:id`

```bash
curl -X DELETE http://localhost:3000/users/USER_ID
```

Replace `USER_ID` with the user's MongoDB document ID. Returns a success
message, or `404` if the user was not found.

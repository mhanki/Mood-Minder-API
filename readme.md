# Mood Minder API

[Mood Minder's](https://github.com/mhanki/Mood-Minder) Node.js based API.

## Installation

1. Clone the repository: `git clone https://github.com/mhanki/Mood-Minder-API.git`
2. Install the dependencies: `npm install`
3. Setup the database by running SQL commands
4. Configure access if needed

## Usage

To start the API server, run the following command:

```bash
npm start
```

By default, the server will run on port 8000. You can access the API at http://localhost:8000.

## Endpoints

The following endpoints are available:

**Users & Auth**  
- `POST /users`: Create a new user.  
- `POST /auth`: Generate a JWT token by providing valid credentials. 

**Feelings & Environments**
- `GET /feelings`: Retrieves all feeling entries.
- `GET /feelings/:id`: Retrieves a specific feeling.
- `GET /environments`: Retrieves all environments entries.
- `GET /environments/:id`: Retrieves a specific environment. 

**Logs** (Protected routes, require authentication)
- `GET /logs`: Retrieves all user logs.
- `GET /logs/:id`: Retrieves a specific log.
- `POST /logs`: Creates a new log.
- `PUT /logs/:id`: Updates a specific log.
- `DELETE /logs/:id`: Deletes a specific log.

**Posts** (Protected routes, require authentication)
- `GET /posts`: Retrieves all user posts.
- `GET /posts/:id`: Retrieves a specific post.
- `POST /posts`: Creates a new post.
- `PUT /posts/:id`: Updates a specific post.
- `DELETE /posts/:id`: Deletes a specific post.


### Request Examples

**Register a new user**

```http
POST /users
content-type: application/json

{
  "name": "Jane",
  "username": "Jane123",
  "email": "jane.doe@gmail.com",
  "password": "123"
}
```

**Login and create a JWT token**

Requeset
```http
POST /auth
content-type: application/json

{
  "email": "jane.doe@gmail.com",
  "password": "123"
}
```

Response
```http
Status: 200 OK
content-type: application/json

{ 
  "token": <JWT_TOKEN>, 
  "email": "jane.doe@gmail.com",
  "password": "123"
}
```

**Retrieve all feelings**

Request
```http
GET /feelings
```

Response
```http
Status: 200 OK
content-type: application/json

[
  {
    "ID": 1,
    "name": "horrible",
    "rank": 1
  },
  {
    "ID": 2,
    "name": "terrible",
    "rank": 2
  },
  ...
]
```

**Retrieve all environments**

Request

```http
GET /environments
```

Response

```http
Status: 200 OK
content-type: application/json

[
  {
    "ID": 1,
    "name": "at work"
  },
  {
    "ID": 2,
    "name": "outdoors"
  },
  ...
]
```

**Retrieve all user logs (protected route)**

```http
GET /logs
Authorization: Bearer <JWT_TOKEN>
```

**Retrieve a specific log (protected route)**

```http
GET /logs/:id
Authorization: Bearer <JWT_TOKEN>
```

**Add a log (protected route)**

```http
POST /logs
content-type: application/json
Authorization: Bearer <JWT_TOKEN>

{
  "feeling": <FEELING_ID>, 
  "environment": <ENVIRONMENT_ID>
}
```

**Get a specific post (protected route)**

Request
```http
GET /posts/1
Authorization: Bearer <JWT_TOKEN>
```

Response
```http
Status: 200 OK
content-type: application/json

{
  "post": {
    "ID": 1,
    "content": "New Post",
    "is_private": 1,
    "created_at": "2023-03-01T06:17:25.000Z",
    "updated_at": null,
    "user_id": 17
  }
}
```

**Add a post (protected route)**

```http
POST /posts
content-type: application/json
Authorization: Bearer <JWT_TOKEN>

{
  "content": "A new post",
  "isPrivate": 0
}
```


## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for more information.
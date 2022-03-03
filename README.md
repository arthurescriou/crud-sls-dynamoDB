# CRUD Serverless

## Prerequisite

- nodejs
- yarn
- serverless
- docker

## Launch in local

Launch dynamoDB

```
docker run -d -p 8000:8000 amazon/dynamodb-local
```

Run serverless in local

```
serverless offline
```

## Paths

### Entity

#### CRUD

```
{URL}/{entity}/{method}/{id}
```

method :

- create
- read
- update
- delete

entity : a string longer than 3 characters

id : must be unique at creation

#### List

To list all entities use this url (without id).
(The method is ignored).

```
{URL}/list/{entity}
```

### Login

```
{URL}/login //POST
```

with body :

```json
{ "login": "string", "password": "string" }
```

The login return a JWT in string.

If you want to enable verification you can verify the Authorizations header with the function from `jwt.js`

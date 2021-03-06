# Back-end
# DevDeskQueue
## Endpoints

| Action                      | URL                        | Method | Response           |
| :-------------------------- | :------------------------- | :----- | :----------------- |
| Can reach API               | /                          | GET    |  valid 200 OK      |
| register a user             | /auth/register             | POST   |  valid 201 Created |
| login a user                | /auth/login                | POST   |  valid 200 OK      |
| can get a list of users     | /users                     | GET    |  valid 200 OK      |
| can update a user           | /users/:id                 | PUT    |  valid 200 OK      |
| can view all tickets        | /tickets                   | GET    |  valid 200 OK      |
| can view ticket by ID       | /tickets/:id               | GET    |  valid 200 OK      |
| can add a ticket            | /tickets                   | POST   |  valid 201 Created |
| can view your tickets       | /tickets/users/:id         | GET    |  valid 200 OK      |
| can update your ticket      | /tickets/:id/user/:uid     | PUT    |  valid 200 OK      |
| can delete your ticket      | /tickets/:id/user/:uid     | DELETE |  valid 200 OK      |
| helper can update status    | /tickets/:id               | PATCH  |  valid 200 OK      |
| can add a comment           | /tickets/:id/comments      | POST   |  valid 201 Created |
| can delete your comment     | /tickets/:id/comments/:cid | DELETE |  valid 200 OK      |
| can view tickets from slack | /slack/tickets             | GET    |  valid 200 OK      |
 

## REGISTRATION DATA

| PROPERTY               | TYPE              | EXAMPLE          | Notes                          |
| :-------------------   | :---------------- | :--------------  | :----------------------------- |
| name                   |  string           | "name"           | required                       |
| email                  |  string           | "email@mail.com" | required                       |
| password               |  string           | "password"       | required                       |
| cohort                 |  string           | "web29"          | required                       |
| student                |  boolean          | true             | must select either student     |
| helper                 |  boolean          | false            | or helper or both              |

## LOGIN DATA

| PROPERTY               | TYPE              | EXAMPLE          | Notes                          |
| :-------------------   | :---------------- | :--------------  | :----------------------------- |
| email                  |  string           | "email@mail.com" | required                       |
| password               |  string           | "password"       | required                       |

## TICKET DATA

| PROPERTY               | TYPE              | EXAMPLE          | Notes                          |
| :-------------------   | :---------------- | :--------------  | :----------------------------- |
| subject                |  string           | "test"           | required                       |
| ticket_text            |  string           | "ticket text"    | required                       |
| user_id                |  number           | 1                | set by token                   |
| tried                  |  string           | "ive tried"      | optional                       |
| category               |  string           | "help"           | optional
| status_id              |  number           | 1                | 4 options, set to 1 by default |

## COMMENT DATA

| PROPERTY               | TYPE              | EXAMPLE          | Notes                          |
| :-------------------   | :---------------- | :--------------  | :----------------------------- |
| ticket_id              |  number           | 1                | set with params                |
| commenter_id           |  number           | 1                | set by token                   |
| comment                |  "string"         | "comment"        | required                       |


### THINGS TO NOTE ###
#### Statuses
- statuses default to 1 or "submitted" when you submit, the "helper" can modify this using the patch described above

```json
[
        {id: 1, status: "submitted"},
        {id: 2, status: "in progress"},
        {id: 3, status: "returned to queue"},
        {id: 4, status: "complete"}
]
```

#### AXIOS REQUESTS
- some of the axios requests rely on more than one parameter. if you do not supply all the parameters, you will not be able to complete the request. 

### DATA REQUIRED FOR REGISTER

```json
{
        "name": "string",
        "email": "string",
        "password": "string",
        "cohort": "string",
        "student": boolean,
        "helper": boolean
}
```
### DATA REQUIRED FOR LOGIN

```json
{
        "email": "string",
        "password": "string"
}
```

### DATA REQUIRED TO POST TICKET

```json
{
        "subject": "string",
        "ticket_text": "string"
}
```

### DATA REQUIRED TO POST COMMENT

```json
{
        "comment":"string"
}
```
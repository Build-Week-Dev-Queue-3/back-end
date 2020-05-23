# Back-end

## Endpoints

| Action               | URL               | Method | Response           |
| :------------------- | :---------------- | :----- | :----------------- |
| Can reach API        | /                 | GET    |  valid 200 OK      |
| register a user      | /auth/register    | POST   |  valid 201 Created |
| login a user         | /auth/login       | POST   |  valid 200 OK      |


## REGISTRATION DATA

| PROPERTY               | TYPE              | EXAMPLE          | Notes                     |
| :-------------------   | :---------------- | :--------------  | :------------------------ |
| name                   |  string           | "name"           | required                  |
| email                  |  string           | "email@mail.com  | required                  |
| password               |  string           | "password"       | required                  |
| cohort                 |  string           | "web29"          | required                  |
| student                |  boolean          | true             | must select either student|
| helper                 |  boolean          | false            | or helper or both         |

## LOGIN DATA

| PROPERTY               | TYPE              | EXAMPLE          | Notes                     |
| :-------------------   | :---------------- | :--------------  | :------------------------ |
| email                  |  string           | "email@mail.com  | required                  |
| password               |  string           | "password"       | required                  |

## DATA STRUCTURE

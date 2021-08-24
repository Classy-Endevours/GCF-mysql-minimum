## Introduction
This project a starter kit for one who wants to use `promise-mysql` with `google cloud function`
This includes a connection to the database with the following scenario covering

![image](https://user-images.githubusercontent.com/75172719/130656713-10a2ee4d-8a82-4b66-bd80-867804605ef3.png)

Following is the details step to the above diagram:
- Get the pool connection
- A query will be passed to the method
- From the connection, begin the transaction. The record will be monitored and freezed
- Query will get executed with the parameters provided
- if everything goes fine then transaction would be commited and connection will be released
- If something went wrong then transaction will get rollbacked and connection will be released
- Following data will be returned

## Process
#### Environment
- DB_HOST=localhost # for dev
- DB_USER=
- DB_PASSWORD=
- DB_NAME=

*note*: by default it will look for `users` table in the connected database

#### run the application
To run the application following commands will do the job
- `cd <project-directory>`
- `npm i`
- update the `.env` from `.env.sample`
- `npm start`
- go to route `http://localhost:8080/`
- result will be shown

#### Example
following are the example of how to make it use
1. Import the database from the file `config/database.js`
```
const result = await db.query("SELECT * FROM users")
return result
```

```
const user_level_1 = db.query("SELECT * FROM users")
const user_level_2 = db.query("SELECT * FROM users where id = ?", [1])
const result = await Promise.all([user_level_1, user_level_2])
return result;
```

```
const query = db.query("SELECT * FROM users")
query.then(...).catch(...)
```

This project is a minimum example of GCF and mysql

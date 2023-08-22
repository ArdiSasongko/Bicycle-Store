# Documentation REST API

To create a REST API for this project, I am using the NestJS framework. The utilization of the NestJS framework is due to its structured design pattern, which is MVC, facilitating the categorization of each section. In this project, I am employing the PostgreSQL database, which comprises 3 tables: user, bicycle, and history.

# Table User
## SIGN UP
* Method : Post
* URL : auth/:userType/signUp

In the user table, I differentiate it into two categories: ADMIN and BUYER. This is done to restrict permissions for both user types.

* Response
<pre> 
{
    "response": "Register Success",
    "status": 200,
    "message": "Register Success",
    "name": "HttpException"
}
</pre>

When registering as an admin, the user requires a product key. The URL associated with this functionality can only be accessed by admins.

## Generated Product Key
* Method : Post
* Headers : Bearer Token
* URL : /auth/ADMIN/ProductKey

* Response

<pre>
$2b$10$rMqYTWMt6QHunra/stCbd.T2bPl3vpA5e1wNLsmA7b5TLzHQWU/46
</pre>

## SIGN IN
* Method : Post
* URL : /auth/:userType/signIn

In the user table, I differentiate it into two categories: ADMIN and BUYER. This is done to restrict permissions for both user types.

* Response
<pre> 
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJhZG1pbjEyM0BnbWFpbC5jb20iLCJpYXQiOjE2OTI2NzQzNzYsImV4cCI6MTY5MjY3Nzk3Nn0.zflS9YuCZEFmQ2jT2jk-6rJeSzAYQZKaL-oY7mMd90I
</pre>

# Table Bicycle

## Get Bicycles

* Method : Get
* URL : /bicycle/
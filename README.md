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

* ADMIN ONLY
* Method : Post
* Headers : Bearer Token
* URL : /auth/ADMIN/ProductKey

* Response

<pre>
{
    $2b$10$rMqYTWMt6QHunra/stCbd.T2bPl3vpA5e1wNLsmA7b5TLzHQWU/46
}
</pre>

## SIGN IN
* Method : Post
* URL : /auth/:userType/signIn

In the user table, I differentiate it into two categories: ADMIN and BUYER. This is done to restrict permissions for both user types.

* Response
<pre> 
{
    eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJhZG1pbjEyM0BnbWFpbC5jb20iLCJpYXQiOjE2OTI2NzQzNzYsImV4cCI6MTY5MjY3Nzk3Nn0.zflS9YuCZEFmQ2jT2jk-6rJeSzAYQZKaL-oY7mMd90I
}
</pre>

# Table Bicycle

## Get Bicycles

* Method : Get
* URL : /bicycle/

* Response
<pre>
[
    {
        "id": "number",
        "merk": "MERK",
        "category": "CATEGORY",
        "name": "string"
    }
]
</pre>
## Get Bicycle

* Method : Get
* URL : /bicycle/:id/

* Response
<pre>
{
    "id": "number",
    "merk": "MERK",
    "category": "CATEGORY",
    "name": "string",
    "price": "number",
    "amount": "number"
}
</pre>
## Add Bicycle

* ADMIN ONLY
* Method : Post
* Headers : Bearer Token
* URL : /bicycle/

* Response
<pre>
{
    "response": {
        "id": "number",
        "merk": "MERK",
        "category": "CATEGORY",
        "name": "string",
        "price": "number",
        "amount": "number"
    },
    "status": 201,
    "message": "Http Exception",
    "name": "HttpException"
}
</pre>
## Edit/Update Bicycle

* ADMIN ONLY
* Method : Put
* Headers : Bearer Token
* URL : /bicycle/:id/

* Response
<pre>
{
    "response": {
        "id": "number",
        "merk": "MERK",
        "category": "CATEGORY",
        "name": "string",
        "price": "number",
        "amount": "number"
    },
    "status": 200,
    "message": "Http Exception",
    "name": "HttpException"
}
</pre>
## Delete Bicycle

* ADMIN ONLY
* Method : Delete
* Headers : Bearer Token
* URL : /bicycle/:id/

* Response
<pre>
{
    "Success Deleted ${bicycle.name}"
}
</pre>
## Buy Bicycle

* Method : Post
* Headers : Bearer Token
* URL : /bicycle/:id/buy

* Response
<pre>
{
    "Success Buy ${bicycle.name}"
}
</pre>
## Tabel History

## Buy Bicycle

* Method : Post
* Headers : Bearer Token
* URL : /bicycle/:id/buy

* Response
<pre>
{
    "Success Buy ${bicycle.name}"
}
</pre>
## Get History

* Method : Get
* Headers : Bearer Token
* URL : /user/history/

* Response
<pre>
[
    {
        "date": "Date",
        "amount": "number",
        "total_price": "number",
        "bicycle": {
            "id": "number",
            "name": "string",
            "price": "number",
            "merk": "MERK",
            "category": "CATEGORY"
        }
    },
]
</pre>
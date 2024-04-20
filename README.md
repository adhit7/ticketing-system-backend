# Ticketing System API

Ticketing System API is used for queries raised by users and will be solved by company.It has realtime chatting functionality for seamless experience<br>
Frontend Repo - https://github.com/adhit7/ticketing-system-frontend

# Userflow(Three role based functionalities)
1.Admin:<br >
  -Create a batch, learner and mentor.<br >
  -Assigning mentor toward their batch queries from the learner<br >
  -Can know what are all the conversation is happening and also can close the query with the solution<br >

2.Learner:<br >
  -Create a query.<br >
  -Can chat with the their batch mentor once the query is assigned from admin and also close the query with the solution<br >

3.Mentor:<br >
  -Chat with the learner query that is assigned from admin towards the mentor and also close the query with the solution<br >

# Example
Admin: (To get into admin route, you have to just remove other login route names and add <b>/admin/login</b> at end of the url)<br >
-Email: admin@gmail.com <br >
-password: 12345 <br >

## Local Setup (Create your own .env file and add your variables in it)

```sh
$ git clone https://github.com/adhit7/ticketing-system-frontend.git
```

```sh
$ cd ticketing-system-backend
```

```sh
$ npm install
```

```sh
$ npm run server
```

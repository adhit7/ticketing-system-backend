## 🚀 Ticketing System API

Ticketing System API is a full-stack application built using the MERN stack, designed to manage user queries with role-based access for Admins, Learners, and Mentors. The platform features real-time chat functionality, enabling seamless communication and efficient resolution of queries.<br>
Frontend Repo - https://github.com/adhit7/ticketing-system-frontend

## 🌟 Key Features

### Admin:
- Create batches, learners, and mentors.
- Assign mentors to batch queries raised by learners.
- Monitor ongoing conversations and close queries with solutions.
- Email Verification: Automatically send credentials (including a temporary password) to learners and mentors via email when creating their accounts. They can later change this password.

### Learner:
- Create and submit queries.
- Chat with the assigned batch mentor and close queries upon resolution.

### Mentor:
- Engage in real-time chat with learners regarding their assigned queries.
- Close queries after providing solutions.


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

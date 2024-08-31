## 🚀 Ticketing System - <a href="https://zen-class-query.netlify.app/" target="_blank">Open Zen Class Query</a>


Ticketing System is a full-stack application built using the MERN stack, designed to manage user queries with role-based access for Admins, Learners, and Mentors. The platform features real-time chat functionality, enabling seamless communication and efficient resolution of queries.<br>
Frontend Repo - https://github.com/adhit7/ticketing-system-frontend <br>
Backend Deployed link - https://ticketing-system-backend-gdz3.onrender.com/

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

## 📸 Screenshots

Login Page
![Login Page](https://github.com/user-attachments/assets/672400c5-9b8e-439f-8b02-81690abbbc37)

Admin Home Page
![Admin Home  Page](https://github.com/user-attachments/assets/350ce383-9f8c-4e01-8946-76c387a57f64)

Learner Home Page
![Learner Home Page](https://github.com/user-attachments/assets/9ab36d22-61d7-4d1c-b414-8cfcc3838f91)



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

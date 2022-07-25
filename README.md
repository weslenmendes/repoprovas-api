# <p align = "center">RepoProvas API</p>

<p align = "center">
   <img src="https://i.ibb.co/yhdTdPM/exam.png" alt="" width="200" />
</p>
<br/><br/><br/>
<div align="center">
  <img src="https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white" />
  <img src="https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white">
  <img src="https://img.shields.io/badge/Express.js-404D59?style=for-the-badge">
  <img src="https://img.shields.io/badge/Prisma-3982CE?style=for-the-badge&logo=Prisma&logoColor=white" />
  <img src="https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white" />
  <img src="https://img.shields.io/badge/Git-E34F26?style=for-the-badge&logo=git&logoColor=white" />
  <img src="https://img.shields.io/badge/Heroku-430098?style=for-the-badge&logo=heroku&logoColor=white" />
</div>

## 📋 Description

This application is an api for a test management, where the goal is for students to share past exams that can help other students. The user can see the tests that have been placed on the system and add new ones, when a new test is added, an email is sent to all users of the application.

---

## 💻 Technologies and concepts covered

- Node.js
- TypeScript
- Prisma
- Postgres
- Jest and SuperTest
- JWTs
- REST APIs
- ORMs
- Automated Tests
- Relational Database
- Layered Architecture

---

## 🚀 Routes

### User register

```yml
POST /sign-up
    - headers: {}
    - body: {
        "email": string,                ## a valid e-mail
        "password": string              ## a word with at least 8 characters between letters and numbers
      }
```

### User login

```yml
POST /sign-in
    - headers: {}
    - body: {
        "email": string,                ## a valid e-mail
        "password": string,             ## a word with at least 8 characters between letters and numbers
        "confirmPassword": string       ## the same pattern of password
      }
```

### Add test

```yml
POST /tests/create
    - headers: {
        "Authorization": "Bearer <token>"
      }
    - body: {
        "name": "Test about React",
        "pdfUrl": "http(s)://pdflocal.com/react.pdf",
        "category": "Projeto",
        "discipline": "3",
        "teacher": "1"
      }

## category, discipline and teacher can be the name field or the id field, as long as it is a string
```

### Get test by discipline

```yml
GET /tests/view?orderBy=discipline
    - headers: {
        "Authorization": "Bearer <token>"
      }
    - body: {}
```

### Get test by teacher

```yml
GET /tests/view?orderBy=teacher
    - headers: {
        "Authorization": "Bearer <token>"
      }
    - body: {}
```

---

# 🏁 Getting Started

This project needs the Node.js platform to run, so you need to install [Node.js](https://nodejs.org/en/download/) and [npm](https://www.npmjs.com/) first, in order to test the project. Remember to launch you database locally and create a `.env` file with the environment variables listed on `.env.example`. To run the tests it is necessary to have a .env.test in the root of the project, follow the example shown in .env.test.example.

Then, clone the repository with:

```
git clone https://github.com/weslenmendes/repoprovas-api.git
```

So, in the project directory, you can run:

```
npm install
```

to install the dependencies.

Then, run

```
npm run dev
```

to run the server.

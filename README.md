# Markdown Notes

Markdown Notes is a simple web app that allows a user to keep track of a list of markdown-styled notes. Once an account has been created the user can add notes, edit notes, remove notes, and edit his/her account. The idea came from [this](https://github.com/florinpop17/app-ideas) repository. I created this site because it seemed like a good starting place to expand my understanding of how to build a full stack application with MERN.

## Table of Contents

- [Tech Stack](#tech-stack)
  - [Front End](#front-end)
  - [Back End](#back-end)
- [Local Setup](#local-setup)
- [Demo](#demo)

## Tech Stack

#### Front-end

- React
- react-router-dom
- react-transition-group
- redux
- bootstrap/reactstrap
- moment
- marked
- axios

#### Back-end

- Node
- express
- jsonwebtoken
- MongoDB/mongoose
- bryptjs
- dotenv
- concurrently
- nodemon

## Local Setup

1. Add your Mongo URI and a JWT token secret to the `.env` file.
2. Run the following commands

   ```
   git clone https://github.com/CShatto99/Markdown-Notes.git

   cd Markdown-Notes

   npm run installDep
   ```

3. Servers
   ```
    Option 1 (runs backend and frontend servers):

    npm run dev

    Option 2 (for running both the servers individually):

    npm run server (runs backend server only)

    npm run client (runs frontend server only)
   ```

## DEMO

#### LINK - [Markdown Notes](https://markdown-notes.herokuapp.com)

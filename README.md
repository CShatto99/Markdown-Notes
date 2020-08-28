# Markdown Notes

Demo: [MarkdownNotes](https://markdown-notes.herokuapp.com/)

### Introduction

Markdown Notes is a simple web app that allows a user to keep track of a list of markdown-styled notes. Once an account has been created the user can add notes, edit notes, remove notes, and edit his/her account. The idea came from [this](https://github.com/florinpop17/app-ideas) repository. I created this site because it seemed like a good starting place to expand my understanding of how to build a full stack application with MERN. 

### What I learned

* Built a REST API using Node.js, Express.js, & MongoDB to efficiently handle HTTP client requests
* Created a user login/registration system with bcryptjs and JWT for encryption and authentication
* Constructed and styled the UI with React and bootstrap.
* Used Redux and Redux Toolkit for app state management.

### Local Development

If you would like to clone and manipulate the project on your machine, follow the steps below.

```bash
# Create a directory
mkdir myDir
cd myDir

# Initialize a Git repository
git init

# Enable Sparse Checkouts
git config core.sparsecheckout true

# Tell Git which directories you want
echo MarkdownNotes/ >> .git/info/sparse-checkout

# Add the remote
git remote add -f origin https://github.com/CShatto99/MERN_Projects.git

# Fetch the files
git pull origin master

# In the MarkdownNotes root directory run
cd client
npm install
cd ..
npm install

# Add your Mongo URI and JWT secret to the .env file

# Run the dev script
npm run dev
```

const express = require('express')
const connectDB = require('./config/db')
const path = require('path')
const app = express()

connectDB()

app.use(express.json())

app.use('/api/user', require('./routes/api/user'))
app.use('/api/auth', require('./routes/api/auth'))
app.use('/api/note', require('./routes/api/note'))

if(process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'))

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
  })
}

const port = process.env.PORT || 5000

app.listen(port, () => console.log(`Server listening on port ${port}`))

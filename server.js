const express = require('express')
const cors = require('cors')
const cookieParser = require('cookie-parser')
const connectDB = require('./config/db')
const path = require('path')
const app = express()


app.use(cors({
  origin: 'http://localhost:5000',
  credentials: true
}))
app.use(cookieParser())
app.use(express.json())

connectDB()

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

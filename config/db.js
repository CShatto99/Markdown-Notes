require('dotenv').config()
const mongoose = require('mongoose')

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false
    })

    console.log('MongoDB Connected')
  } catch(err) {
    console.error(err.message)
    res.status(500).send('Server error')
  }
}


module.exports = connectDB

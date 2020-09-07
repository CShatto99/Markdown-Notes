const express = require('express')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const router = express.Router()
const auth = require('../../middleware/auth')

const User = require('../../models/User')
const genAccessToken = require('../../utils/genAccessToken')

// @route GET /api/auth
// @desc  Load a user
// @access Private
router.get('/', auth, async (req, res) => {
  try {
    const user = await User.findById({ _id: req.user._id }).select('-password -notes')
    res.json(user)
  } catch(err) {
    res.status(500).send('Server error')
  }
})

// @route DELETE /api/auth
// @desc  Delete a user
// @access Private
router.delete('/', auth, async (req, res) => {
  try {
    await User.findByIdAndDelete({ _id: req.user._id })

    res.status(204)
  } catch(err) {
    console.error(err.message)
    res.status(500).json({ msg: "Server error, try again later" });
  }
})

// @route PUT /api/auth
// @desc  Update a user
// @access Private
router.put('/', auth, async (req, res) => {
  try {
    const { name, email } = req.body

    if(!name || !email)
      return res.status(400).json({ msg: 'Please enter a name and email' })

    const existingUser = await User.findOne({ email })

    if(existingUser && req.user._id !== existingUser._id.toString())
      return res.status(409).json({ msg: 'User already exists' })

    const updatedUser = await User.findByIdAndUpdate(
      { _id: req.user._id },
      { name, email },
      { new: true }
    ).select('-password -notes')

    res.json(updatedUser)
  } catch(err) {
    console.error(err.message)
    res.status(500).json({ msg: "Server error, try again later" });
  }
})

// @route GET /api/auth/token
// @desc  Refresh a user
// @access Public
router.get('/token', (req, res) => {
  try {
    const token = req.cookies.token 

    if(!token)
      return res.json({ accessToken: "" })

    const decoded = jwt.verify(token, process.env.REFRESH_SECRET_TOKEN)

    const accessToken = genAccessToken({ _id: decoded._id})

    res.json({ accessToken })

  } catch(err) {
    res.status(401).json({ msg: 'Invalid token' })
  }
})

// @route DELETE /api/auth/logout
// @desc  Refresh a user
// @access Public
router.delete('/logout', (req, res) => {
  if(req.cookies.token) {
    res.clearCookie('token')
    return res.json({ msg: 'Logout successful' })
  }
  
  res.status(204).send()
})

module.exports = router

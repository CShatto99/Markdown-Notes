const express = require('express')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const router = express.Router()
const auth = require('../../middleware/auth')

const User = require('../../models/User')

// @route GET /api/auth
// @desc  Load a user
// @access Private
router.get('/', auth, async (req, res) => {
  try {
    const user = await User.findById({ _id: req.user._id }).select('-password -notes')
    res.json(user)
  } catch(err) {
    console.error(err.message)
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
    res.status(500).send('Server error')
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
    res.status(500).send('Server error')
  }
})

module.exports = router

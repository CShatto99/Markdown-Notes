const express = require('express')
const router = express.Router()
const auth = require('../../middleware/auth')

const User = require('../../models/User')
const Note = require('../../models/Note')

router.use(auth)

// @route GET /api/note
// @desc Get user notes
// @access Private
router.get('/', async (req, res) => {
  try {
    const user = await User.findById({ _id: req.user._id })

    res.json(user.notes)

  } catch(err) {
    console.error(err.message)
    res.status(500).send('Server error')
  }
})

// @route POST /api/note
// @desc Create a note
// @access Private
router.post('/', async (req, res) => {
  try {
    if(!req.body.note)
      return res.status(400).json({ msg: 'Please enter a note' })

    const user = await User.findById({ _id: req.user._id })

    user.notes.push({ note: req.body.note })

    await user.save()

    res.json(user.notes[user.notes.length-1])

  } catch(err) {
    console.error(err.message)
    res.status(500).send('Server error')
  }
})

// @route DELETE /api/note/:_id
// @desc Delete a note by id
// @access Private
router.delete('/:_id', async (req, res) => {
  try {
    const user = await User.findById({ _id: req.user._id })

    user.notes = user.notes.filter(note => note._id.toString() !== req.params._id)

    await user.save()

    res.json(user.notes)

  } catch(err) {
    console.error(err.message)
    res.status(500).send('Server error')
  }
})

// @route PUT /api/note/:_id
// @desc Edit a note by id
// @access Private
router.put('/:_id', async (req, res) => {
  try {
    if(!req.body.note)
      return res.status(400).json({ msg: 'Please enter a note' })

    const user = await User.findById({ _id: req.user._id })

    user.notes.map(note => {
      if(note._id.toString() === req.params._id)
        note.note = req.body.note
    })

    await user.save()

    res.json(user.notes)

  } catch(err) {
    console.error(err.message)
    res.status(500).send('Server error')
  }
})

module.exports = router

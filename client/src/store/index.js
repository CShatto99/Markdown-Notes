import { configureStore } from '@reduxjs/toolkit'
import { combineReducers } from 'redux'
import auth from './auth'
import note from './note'
import alert from './alert'

const reducer = combineReducers({
  auth,
  note,
  alert
})

const store = configureStore({ reducer })

export default store

import React, { Fragment } from 'react'
import { Redirect } from 'react-router-dom'
import {
  Jumbotron,
  Button,
  Spinner,
  Alert
} from 'reactstrap'
import { useDispatch, useSelector } from 'react-redux'
import { logout } from '../../store/auth'
import { clearAlert } from '../../store/alert'
import DeleteAccount from './DeleteAccount'
import EditAccount from './EditAccount'

const Account = ({ match }) => {
  const dispatch = useDispatch()
  const { isAuthenticated, loading, user } = useSelector(state => state.auth)
  const { type } = useSelector(state => state.alert)

  if(!isAuthenticated)
    return <Redirect to='/login' />

  if(type === 409 || type === 401) {
    setTimeout(() => dispatch(clearAlert()), 5000)
  }

  return (
    <Jumbotron className='text-center'>
      {loading ?
        <Spinner color='primary'/> : (
        <Fragment>
          {(type === 409 || type === 401) && <Alert color='danger'>The email you entered was taken, changes were ignored.</Alert>}
          <h1>{user.name}</h1>
          <p className='lead'>{user.email}</p>
          <hr/>
            <EditAccount />
            <Button onClick={() => dispatch(logout())} className='mr-3 is-mobile' color='primary'>
              Logout <i className="fa fa-sign-out" aria-hidden="true"></i>
            </Button>
            <DeleteAccount />
        </Fragment>
      )}
    </Jumbotron>
  )
}

export default Account

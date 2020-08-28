import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Redirect } from 'react-router-dom'
import {
  Button,
  Form,
  FormGroup,
  Label,
  Input,
  Alert
} from 'reactstrap'
import { login } from '../../store/auth'
import { clearAlert } from '../../store/alert'

const Login = () => {
  const dispatch = useDispatch()
  const { isAuthenticated } = useSelector(state => state.auth)
  const { msg } = useSelector(state => state.alert)
  const [state, setState] = useState({
    email: '',
    password: ''
  })

  const onChange = e => {
    setState({
      ...state,
      [e.target.name]: e.target.value
    })
  }

  const onSubmit = e => {
    e.preventDefault()

    const { email, password } = state

    dispatch(login({ email, password }))
  }

  if(isAuthenticated) return <Redirect to='/home' />

  return (
    <div>
      <div className='form-title'>
        <h2 className='text-center'>Login</h2>
      </div>
      <div className='form-section'>
        <Form onSubmit={e => onSubmit(e)}>
          {msg && <Alert color='danger'>{msg}</Alert>}
          <small className='text-danger'>* = required</small>
          <FormGroup>
            <Label for='email'>Email <span className='text-danger'>*</span></Label>
            <Input
              type='email'
              id='email'
              name='email'
              placeholder='Enter your email'
              value={state.email}
              onChange={e => onChange(e)}
            />
          </FormGroup>
          <FormGroup>
            <Label for='password'>Password <span className='text-danger'>*</span></Label>
            <Input
              type='password'
              id='password'
              name='password'
              placeholder='Enter your password'
              value={state.password}
              onChange={e => onChange(e)}
            />
          </FormGroup>
          <div className='text-center'>
            <Button className='mr-3 is-mobile' color='primary'>
              Login <i className="fa fa-sign-in" aria-hidden="true"></i>
            </Button>
            <Button href='/' className='is-mobile' color='light' onClick={() => dispatch(clearAlert())}>
              <i className="fa fa-arrow-left" aria-hidden="true"></i> Go Back
            </Button>
          </div>
        </Form>
      </div>
    </div>
  )
}

export default Login

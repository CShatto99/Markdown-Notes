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
import { register } from '../../store/auth'
import { clearAlert } from '../../store/alert'

const Register = () => {
  const dispatch = useDispatch()
  const { isAuthenticated } = useSelector(state => state.auth)
  const { msg } = useSelector(state => state.alert)
  const [state, setState] = useState({
    name: '',
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

    const { name, email, password } = state

    const user = { name, email, password }

    dispatch(register(user))
  }

  if(isAuthenticated) return <Redirect to='/home' />

  return (
    <div>
      <div className='form-title'>
        <h2 className='text-center'>Register</h2>
      </div>
      <div className='form-section'>
        <Form onSubmit={e => onSubmit(e)}>
          {msg && <Alert color='danger'>{msg}</Alert>}
          <small className='text-danger'>* = required</small>
          <FormGroup>
            <Label for='name'>Name <span className='text-danger'>*</span></Label>
            <Input
              type='text'
              id='name'
              name='name'
              placeholder='Enter your name'
              value={state.name}
              onChange={e => onChange(e)}
            />
          </FormGroup>
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
              Register <i className="fa fa-sign-in" aria-hidden="true"></i>
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

export default Register

import React, { Fragment, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  Form,
  FormGroup,
  Label,
  Input,
  Alert
} from 'reactstrap'
import { editAccount } from '../../store/auth'
import { clearAlert } from '../../store/alert'

const EditAccount = () => {
  const dispatch = useDispatch()
  const { user } = useSelector(state => state.auth)
  const { msg } = useSelector(state => state.alert)
  const [state, setState] = useState({
    isOpen: false,
    name: user.name,
    email: user.email
  })

  const toggle = () => {
    setState({
      ...state,
      isOpen: !state.isOpen,
      email: user.email
    })

    if(msg)
      dispatch(clearAlert())
  }

  const onChange = e => {
    setState({
      ...state,
      [e.target.name]: e.target.value
    })
  }

  const onSubmit = e => {
    e.preventDefault()

    dispatch(editAccount({ name: state.name, email: state.email }))

    if(state.name && state.email)
      toggle()
  }

  return (
    <Fragment>
      <Button onClick={toggle} className='mr-3 is-mobile' color='primary'>
        Edit Account <i className="fa fa-pencil-square-o" aria-hidden="true"></i>
      </Button>
      <Modal isOpen={state.isOpen}>
        <ModalHeader toggle={toggle}>
          Edit Your Account
        </ModalHeader>
        <ModalBody>
          <Form onSubmit={e => onSubmit(e)}>
            {msg && <Alert color='danger'>{msg}</Alert>}
            <FormGroup>
              <Label for='name'>Name</Label>
              <Input
                type='text'
                id='name'
                name='name'
                placeholder='Edit your name'
                value={state.name}
                onChange={e => onChange(e)}
              />
            </FormGroup>
            <FormGroup>
              <Label for='email'>Email</Label>
              <Input
                type='email'
                id='email'
                name='email'
                placeholder='Edit your email'
                value={state.email}
                onChange={e => onChange(e)}
              />
            </FormGroup>
            <Button color='primary' block>Save Changes</Button>
            <Button onClick={toggle} color='light' block>Cancel</Button>
          </Form>
        </ModalBody>
      </Modal>
    </Fragment>
  )
}

export default EditAccount

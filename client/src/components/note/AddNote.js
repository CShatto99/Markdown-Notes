import React, { useState } from 'react'
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
import { createNote } from '../../store/note'
import { clearAlert } from '../../store/alert'

const AddNote = () => {
  const dispatch = useDispatch()
  const { msg } = useSelector(state => state.alert)
  const[state, setState] = useState({
    isOpen: false,
    note: ''
  })

  const toggle = () => {
    setState({
      ...state,
      note: '',
      isOpen: !state.isOpen
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

    dispatch(createNote({ note: state.note }))

    if(state.isOpen && state.note)
      toggle()
  }

  return (
    <div>
      <Button onClick={toggle} color='primary' block>Add Note</Button>
      <Modal isOpen={state.isOpen} toggle={toggle}>
        <ModalHeader toggle={toggle}>Add a Note to Your List</ModalHeader>
        <ModalBody>
          <Form onSubmit={e => onSubmit(e)}>
            {msg && <Alert color='danger'>{msg}</Alert>}
            <FormGroup>
              <Label for='note'>Note</Label>
              <Input
                type='textarea'
                id='note'
                name='note'
                placeholder='Enter a markdown note'
                value={state.note}
                onChange={e => onChange(e)}
              />
            </FormGroup>
            <hr/>
            <Button color='primary' block>Add Note</Button>
            <Button onClick={toggle} color='light' block>Cancel</Button>
          </Form>
        </ModalBody>
      </Modal>
    </div>
  )
}

export default AddNote

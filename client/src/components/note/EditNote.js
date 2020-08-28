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
import { editNote } from '../../store/note'
import { clearAlert } from '../../store/alert'

const EditNote = ({ _id, note }) => {
  const dispatch = useDispatch()
  const { msg } = useSelector(state => state.alert)
  const [state, setState] = useState({
    isOpen: false,
    note: note
  })

  const toggle = () => {
    setState({
      ...state,
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

    dispatch(editNote({ _id, note: state.note }))

    if(state.isOpen && state.note)
      toggle()
  }

  return (
    <Fragment>
      <Button
        className='float-right ml-1'
        size='sm'
        color='primary'
        onClick={toggle}
      >
        <i className="fa fa-pencil-square-o" aria-hidden="true"></i>
      </Button>
      <Modal isOpen={state.isOpen}>
        <ModalHeader toggle={toggle}>Edit Note</ModalHeader>
        <ModalBody>
          <Form onSubmit={e => onSubmit(e)}>
            {msg && <Alert color='danger'>{msg}</Alert>}
            <FormGroup>
              <Label for='note'>Note</Label>
              <Input
                type='textarea'
                id='note'
                name='note'
                placeholder='Edit note'
                value={state.note}
                onChange={e => onChange(e)}
              />
            </FormGroup>
            <hr/>
            <Button color='primary' block>Save Changes</Button>
            <Button onClick={toggle} color='light' block>Cancel</Button>
          </Form>
        </ModalBody>
      </Modal>
    </Fragment>
  )
}

export default EditNote

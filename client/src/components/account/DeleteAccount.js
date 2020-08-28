import React, { Fragment, useState } from 'react'
import { useDispatch } from 'react-redux'
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody
} from 'reactstrap'
import { deleteUser } from '../../store/auth'

const DeleteAccount = () => {
  const dispatch = useDispatch()
  const [isOpen, setIsOpen] = useState(false)

  const toggle = () => setIsOpen(!isOpen)

  const onClick = () => {
    dispatch(deleteUser())

    toggle()
  }

  return (
    <Fragment>
      <Button onClick={toggle} className='is-mobile' color='danger'>
        Delete Account <i className="fa fa-trash" aria-hidden="true"></i>
      </Button>
      <Modal isOpen={isOpen}>
        <ModalHeader toggle={toggle}>
          Warning
        </ModalHeader>
        <ModalBody>
          <p>This will permanently delete your account and all of its content.</p>
          <p>
            Are you sure?
            <Button onClick={onClick} className='ml-2' color='danger' size='sm'>Yes</Button>
            <Button onClick={toggle} className='ml-2' color='primary' size='sm'>No</Button>
          </p>
        </ModalBody>
      </Modal>
    </Fragment>
  )
}

export default DeleteAccount

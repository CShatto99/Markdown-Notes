import React, { Fragment, useState, useEffect } from 'react'
import { Redirect } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import Moment from 'react-moment'
import marked from 'marked'
import { CSSTransition, TransitionGroup } from 'react-transition-group'
import {
  Button,
  ListGroup,
  ListGroupItem,
  Spinner,
  Alert
} from 'reactstrap'
import AddNote from './AddNote'
import EditNote from './EditNote'
import { getNotes, deleteNote } from '../../store/note'
import { clearAlert } from '../../store/alert'

const NoteList = () => {
  const dispatch = useDispatch()
  const { isAuthenticated, } = useSelector(state => state.auth)
  const { notes, loading } = useSelector(state => state.note)
  const { msg, type } = useSelector(state => state.alert)
  const [inProp, setInProp] = useState(false)

  useEffect(() => {
    if(isAuthenticated) dispatch(getNotes())
  }, [isAuthenticated, dispatch])

  const rawMarkup = note => {
    let rawMarkup = marked(note)
    return { __html: rawMarkup }
  }

  const onClickDelete = _id => {
    dispatch(deleteNote(_id))

    setInProp(!inProp)
  }

  if(type === 401)
    setTimeout(() => dispatch(clearAlert()), 5000)

  if(!isAuthenticated)
    return <Redirect to='/' />

  return (
    <div>
      {loading ?
        <div className='d-flex justify-content-center'>
          <Spinner size='lg' color='light'/>
        </div> :
        <Fragment>
          {type === 401 && (<Alert color='danger'>{msg}</Alert>)}
          <ListGroup className='mb-2 text-center' >
            <ListGroupItem className='list-group-item-cust'>
              <h2>Your Markdown Notes</h2>
            </ListGroupItem>
            <ListGroupItem className='list-group-item-cust'>
              <AddNote />
            </ListGroupItem>
          </ListGroup>
          {notes.length === 0 ?
            <ListGroup className='mb-2 text-center'>
              <ListGroupItem className='list-group-item-cust'>
                <h4>It looks like you haven't created a note.</h4>
              </ListGroupItem>
            </ListGroup> :
            <ListGroup>
              <TransitionGroup>
                {notes.map(({ note, _id, date }) => (
                  <CSSTransition key={_id} timeout={500} classNames='note-item'>
                    <ListGroup className='mb-1' key={_id}>
                      <ListGroupItem className='list-group-item-cust'>
                        <small><Moment format='MMM Do, YYYY hh:mm:ss A'>{date}</Moment></small>
                        <Button
                          className='float-right ml-1'
                          size='sm'
                          color='danger'
                          onClick={() => onClickDelete(_id)}
                        >
                          <i className="fa fa-trash" aria-hidden="true"></i>
                        </Button>
                        <EditNote _id={_id} note={note} />
                      </ListGroupItem>
                      <ListGroupItem className='list-group-item-cust'>
                          <i className="fa fa-sticky-note" aria-hidden="true"></i>
                          <span dangerouslySetInnerHTML={rawMarkup(note)} />
                      </ListGroupItem>
                    </ListGroup>
                  </CSSTransition>
                ))}
              </TransitionGroup>
            </ListGroup>
          }
        </Fragment>
      }
    </div>
  )
}

export default NoteList

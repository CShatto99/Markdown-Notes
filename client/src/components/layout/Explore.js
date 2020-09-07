import React, { Fragment, useEffect } from 'react'
import { Redirect } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import Moment from 'react-moment'
import marked from 'marked'
import {
  ListGroup,
  ListGroupItem,
  Spinner,
  Alert
} from 'reactstrap'
import { getAllNotes } from '../../store/note'

const Explore = () => {
  const dispatch = useDispatch()
  const { isAuthenticated, } = useSelector(state => state.auth)
  const { allNotes, loading } = useSelector(state => state.note)
  const { msg, status } = useSelector(state => state.alert)

  useEffect(() => {
    if(isAuthenticated) dispatch(getAllNotes())
  }, [isAuthenticated, dispatch])

  const rawMarkup = note => {
    let rawMarkup = marked(note)
    return { __html: rawMarkup }
  }

  if(!isAuthenticated)
    return <Redirect to='/' />

  return (
    <div>
      {loading ?
        <div className='d-flex justify-content-center'>
          <Spinner size='lg' color='light'/>
        </div> :
        <Fragment>
          {status === 401 && (<Alert color='danger'>{msg}</Alert>)}
          <ListGroup className='mb-2 text-center' >
            <ListGroupItem className='list-group-item-cust'>
              <h2>Public Markdown Notes</h2>
            </ListGroupItem>
          </ListGroup>
          {allNotes.length === 0 ?
            <ListGroup className='mb-2 text-center'>
              <ListGroupItem className='list-group-item-cust'>
                <h4>No notes available.</h4>
              </ListGroupItem>
            </ListGroup> :
            <ListGroup className='mb-5'>
              {allNotes.map(({ _id, name, notes }) => (
                <Fragment key={_id}>
                  {notes.map(({ note, _id, date }) => (
                    <ListGroup className='mb-1' key={_id}>
                      <ListGroupItem className='list-group-item-cust'>
                      <h3>{name}</h3>
                        <small><Moment format='MMM Do, YYYY hh:mm:ss A'>{date}</Moment></small>
                      </ListGroupItem>
                      <ListGroupItem className='list-group-item-cust'>
                          <i className="fa fa-sticky-note" aria-hidden="true"></i>
                          <span dangerouslySetInnerHTML={rawMarkup(note)} />
                      </ListGroupItem>
                    </ListGroup>
                  ))}
                </Fragment>
              ))}
            </ListGroup>
          }
        </Fragment>
      }
    </div>
  )
}

export default Explore

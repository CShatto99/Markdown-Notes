import React from 'react'
import { Redirect} from 'react-router-dom'
import {
  Jumbotron,
  Button
} from 'reactstrap'
import { useSelector } from 'react-redux'

const Hero = () => {
  const { isAuthenticated } = useSelector(state => state.auth)

  if(isAuthenticated)
    return <Redirect to='/home' />

  return (
    <Jumbotron className='text-center'>
      <h1>Welcome to Markdown Notes</h1>
      <p className='lead'>
        This is a simple web app that allows you to keep track of a list of{' '}
        <a
          className='std-link'
          target='_blank'
          rel='noopener noreferrer'
          href='https://en.wikipedia.org/wiki/Markdown#:~:text=Markdown%20is%20a%20lightweight%20markup,using%20a%20plain%20text%20editor.'
        >
          markdown
        </a>{' '}
        notes
      </p>
      <hr />
      <Button href='/register' className='mr-3 is-mobile' color='primary'>
        Register <i className="fa fa-sign-in" aria-hidden="true"></i>
      </Button>
      <Button href='/login' className='is-mobile' color='light'>
        Login <i className="fa fa-sign-in" aria-hidden="true"></i>
      </Button>
    </Jumbotron>
  )
}

export default Hero

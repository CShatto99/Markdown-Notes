import React, { Fragment, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import {
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  Collapse,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Container
} from 'reactstrap'
import { logout } from '../../store/auth'

const AppNavbar = () => {
  const dispatch = useDispatch()
  const { isAuthenticated, loading, user } = useSelector(state => state.auth)
  const [isOpen, setIsOpen] = useState(false)

  const toggle = () => setIsOpen(!isOpen)

  const userLinks = (
    <Fragment>
      <NavItem>
        <Link className='nav-link' to='/explore'>Explore</Link>
      </NavItem>
      <NavItem>
        <Link className='nav-link' to='/home'>Home</Link>
      </NavItem>
      <NavItem>
        
      </NavItem>
      <NavItem>
        
      </NavItem>
      <UncontrolledDropdown nav inNavbar>
        <DropdownToggle nav caret>
          Profile
        </DropdownToggle>
        <DropdownMenu right>
          <DropdownItem>
            {user && (<Link className='nav-link' to={`/account/${user._id}`}>Account</Link>)}
          </DropdownItem>
          <DropdownItem divider />
          <DropdownItem>
            <NavLink onClick={() => dispatch(logout())} style={{cursor: 'pointer'}}>Logout</NavLink>
          </DropdownItem>
        </DropdownMenu>
      </UncontrolledDropdown>
    </Fragment>
  )

  const guestLinks = (
    <Fragment>
      <NavItem>
        <Link className='nav-link' to='/login'>Login</Link>
      </NavItem>
      <NavItem>
        <Link className='nav-link' to='/register'>Register</Link>
      </NavItem>
    </Fragment>
  )

  return (
    <div>
      <Navbar className='mb-5' dark expand='sm'>
        <Container>
          <NavbarBrand href='/'>Markdown Notes | <small>Welcome{isAuthenticated && user && <span>, {user.name}</span>}</small></NavbarBrand>
          <NavbarToggler onClick={toggle}/>
          <Collapse isOpen={isOpen} navbar>
            <Nav className='ml-auto' navbar>
              {isAuthenticated && !loading && user ? userLinks : guestLinks}
              <NavItem>
                <NavLink className='nav-item' target='_blank' href='https://github.com/CShatto99/MERN_Projects/tree/master/MarkdownNotes'>Github</NavLink>
              </NavItem>
            </Nav>
          </Collapse>
        </Container>
      </Navbar>
    </div>
  )
}

export default AppNavbar

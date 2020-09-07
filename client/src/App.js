import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { Container } from 'reactstrap'
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import PrivateRoute from './components/routing/PrivateRoute'
import AppNavbar from './components/layout/AppNavbar'
import Hero from './components/layout//Hero'
import NoteList from './components/note/NoteList'
import Register from './components/auth/Register'
import Login from './components/auth/Login'
import Account from './components/account/Account'
import Explore from './components/layout/Explore'
import NotFound from './components/NotFound'
import store from './store'
import { Provider } from 'react-redux'
import { refreshUser } from './store/auth'

const App = () => {
  useEffect(() => {
    store.dispatch(refreshUser())
  })

  return (
    <div className="App">
      <Router>
        <Provider store={store}>
          <AppNavbar />
          <Container>
            <Switch>
              <Route exact path='/' component={Hero} />
              <PrivateRoute exact path='/home' component={NoteList} />
              <Route exact path='/register' component={Register} />
              <Route exact path='/login' component={Login} />
              <PrivateRoute exact path='/account/:_id' component={Account} />
              <PrivateRoute exact path='/explore' component={Explore} />
              <Route component={NotFound} />
            </Switch>
          </Container>
        </Provider>
      </Router>
    </div>
  );
}

export default App;

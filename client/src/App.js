import './App.css';
import { Fragment, useEffect } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import store from './store';
import { loadUser } from './actions/auth';

import { Navbar } from './components/layout/Navbar';

function App() {
  useEffect(() => {
    store.dispatch(loadUser());
  }, []);
  return (
    <Fragment>
      <Router>
        <Route exact path='/' component={Navbar} />
      </Router>
    </Fragment>
  );
}

export default App;

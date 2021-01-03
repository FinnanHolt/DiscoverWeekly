import './App.css';
import { Fragment } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import { Navbar } from './components/layout/Navbar';

function App() {
  return (
    <Fragment>
      <Router>
        <Route exact path='/' component={Navbar} />
      </Router>
    </Fragment>
  );
}

export default App;

import './App.css';
import { Fragment, useEffect } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import store from './store';
import { loadUser } from './actions/auth';
import Landing from './components/layout/Landing';
import { Provider } from 'react-redux';

function App() {
  useEffect(() => {
    store.dispatch(loadUser());
  }, []);
  return (
    <Provider store={store}>
      <Fragment>
        <Router>
          <Route exact path='/' component={Landing} />
        </Router>
      </Fragment>
    </Provider>
  );
}

export default App;

import React, { Component } from 'react';
import { render } from 'react-dom';
import { Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { applyMiddleware, createStore, combineReducers, compose } from 'redux';
import { ConnectedRouter, routerMiddleware, routerReducer } from 'react-router-redux';
import { createEpicMiddleware, combineEpics } from 'redux-observable';
import createHistory from 'history/createBrowserHistory';

import App from './components/app';
import appReducer from './components/app/reducer';

import './styles/manifest.styl';

const epicMiddleware = createEpicMiddleware();

const history = createHistory();
const routeMiddleware = routerMiddleware(history);

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const mainStore = createStore(
  combineReducers({
    app: appReducer,
    routing: routerReducer,
  }),
  composeEnhancers(applyMiddleware(epicMiddleware, routeMiddleware))
);

epicMiddleware.run(combineEpics(
  // epics here
))

class Root extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <Provider store={this.props.store}>
        <ConnectedRouter history={history}>
          <div>
            <Route exact path="/" render={() => <App />} />
          </div>
        </ConnectedRouter>
      </Provider>
    );
  }
}

render(
  <Root store={mainStore} />,
  document.getElementById('app')
);

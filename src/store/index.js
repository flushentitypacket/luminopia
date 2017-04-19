import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { createLogger } from 'redux-logger';
import reducers from './reducers';
import sagas from './sagas';

const sagaMiddleware = createSagaMiddleware();
export default createStore(
  reducers,
  applyMiddleware(sagaMiddleware),
  applyMiddleware(createLogger({
    collapsed: () => true,
  })),
);
sagaMiddleware.run(sagas);

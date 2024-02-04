import { createStore } from 'redux';
import { reducer } from './reducers';

const getInitialState = () => {
  const localStorageState = localStorage.getItem('reduxState');
  return localStorageState ? JSON.parse(localStorageState) : undefined;
};

const store = createStore(
  reducer,
  getInitialState(),
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
);

store.subscribe(() => {
  const reduxState = store.getState();
  localStorage.setItem('reduxState', JSON.stringify(reduxState));
});

export default store;

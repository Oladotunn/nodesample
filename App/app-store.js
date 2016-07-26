import { createStore } from 'redux';
import triblApp from './app-reducers';
const appStore = createStore(triblApp);

export default appStore;

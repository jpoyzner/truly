import {createStore, applyMiddleware} from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension';
import reducers from './reducers'
import ContactsService from './contactsservice';

export default createStore(
	reducers, {
		contacts: null,
	},
	composeWithDevTools(applyMiddleware(ContactsService)));
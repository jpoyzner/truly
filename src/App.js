import React from 'react';
import { Provider } from 'react-redux';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import Store from './store/store';
import Contacts from './components/Contacts';

export default () => (
	<Provider store={Store}>
	  <Router>
	  	<div>
	    	<Route path="/" component={Contacts} />
			</div>
	  </Router>
	</Provider>
);
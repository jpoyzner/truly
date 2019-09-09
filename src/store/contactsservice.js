const JSON_SERVER_PORT = 4000;

export default store => next => action => {
  next(action);
	switch (action.type) {
  	case 'getContacts':
  		fetch(`http://localhost:${JSON_SERVER_PORT}/contacts`)
        .then(res => res.json())
        .then(response => {
          //console.log('Success:', JSON.stringify(response));
          next({type: 'setContacts', data: response});
        })
        .catch(error => console.error('Error:', error));	      

    	break;
    default: return false;
	}
};
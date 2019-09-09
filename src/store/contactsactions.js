export default (state, action) => {
  switch (action.type) {
	 	case 'setContacts':
	 		state.contacts = action.data;
	 		return state;
	  default: return false;
	}
};

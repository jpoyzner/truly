import contactsActions from './contactsactions';

const reducers = [
	contactsActions,
];

export default (state, action) => {
 const newState = { ...state };
 // eslint-disable-next-line
 for (const reducer of reducers) {
   const reducedState = reducer(newState, action);
   if (reducedState) {
     return reducedState;
   }
 }

 return state;
};
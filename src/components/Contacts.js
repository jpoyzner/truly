import React, { useState } from 'react';
import { connect } from 'react-redux';
import $ from 'jquery';
import Store from '../store/store';
import './Contacts.scss';

function Contacts(props) {
  const filter = useFilterInput('');
  const contacts = useContacts(props.contacts);

  return (
    <div className="contacts-page">
      <div className="filter">
        <span>FILTER BY: </span>
        <input className="filter" { ...filter } />
      </div>
      {contacts.value ?
        contacts.value.map((contact, index) => {
          const { value: filterText } = filter;
          if (filterText.length && contact.name.toLowerCase().indexOf(filterText.toLowerCase()) === -1) {
            return;
          }

          const contactClasses = ['contact-item'];
          if (contact.error) {
            contactClasses.push('error');
          }

          return (
            <div className={contactClasses.join(' ')} key={index}>
              <div>{contact.name}</div>
              <div>{contact.number}</div>
              <div>{contact.context}</div>
            </div>
          );
        })
        : "LOADING..."
      }
    </div>
  );
}

function useFilterInput(initialValue) {
  const [value, setValue] = useState(initialValue);
  
  return {
    value,
    onChange: (e) => {
      const { value } = e.target;
      setValue(value);
    },
  }
}

function useContacts(contacts) {
  if (!contacts) {
    Store.dispatch({type: 'getContacts'});
  }

  if (!Array.isArray(contacts)) {
    return [];
  }

  return {
    value:
      contacts.reduce((contactsAcc, contact) => {
        const digits = contact.number.replace(/[^A-Za-z0-9]/g, '')
        const preparedContact = { ...contact };
        if (digits.length !== 11 && digits.length !== 12) { //if it has +# or +## intl prefix before the 10 digits
          preparedContact.error = true; // error state contacts shown in red
        } else {
          // find length of international prefix by counting digits
          const intlPrefixLength = digits.length === 11 ? 1 : 2;
          preparedContact.number = gete164Number(digits.slice(intlPrefixLength));
        }

        contactsAcc.push(preparedContact);
        return contactsAcc;
      }, []),
  }
}

// n param is 'numbers' (for shorter syntax)
function gete164Number(n) {
  return `(${n[0]}${n[1]}${n[2]}) ${n[3]}${n[4]}${n[5]}-${n[6]}${n[7]}${n[8]}${n[9]}`;
}

export default connect((state) => ({
  contacts: state.contacts,
}))(Contacts);

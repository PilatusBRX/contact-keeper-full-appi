import React, { useContext, useRef, useEffect } from 'react';
import { ContactContext } from '../../context/contact/ContactContext';

const ContactFilter = () => {
  const text = useRef('');
  const { filterContacts, clearFilter, filtered } = useContext(ContactContext);

  useEffect(() => {
    if (filtered === null) {
      text.current.value = '';
    }
  });

  const onChange = (e) => {
    if (text.current.value !== '') {
      filterContacts(e.target.value);
    } else {
      clearFilter();
    }
  };

  return (
    <form>
      <input
        ref={text}
        type='text'
        placeholder='Filter Contacts...'
        onChange={onChange}
      />
    </form>
  );
};

export default ContactFilter;

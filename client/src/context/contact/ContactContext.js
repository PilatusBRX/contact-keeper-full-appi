import React, { useReducer, createContext } from 'react';
import axios from 'axios';
import ContactReducer from './ContactReducer';
export const ContactContext = createContext();

const ContactContextProvider = (props) => {
  const initialState = {
    contacts: null,
    current: null,
    filtered: null,
    error: null,
  };

  const [state, dispatch] = useReducer(ContactReducer, initialState);

  // Get Contacts
  const getContacts = async () => {
    try {
      const res = await axios.get('/api/contacts');

      dispatch({
        type: 'GET_CONTACTS',
        contacts: res.data,
      });
    } catch (err) {
      dispatch({
        type: 'CONTACT_ERROR',
        contacts: err.response.msg,
      });
    }
  };

  // Add Contact
  const addContact = async (contact) => {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    try {
      const res = await axios.post('/api/contacts', contact, config);

      dispatch({
        type: 'ADD_CONTACT',
        contacts: res.data,
      });
    } catch (err) {
      dispatch({
        type: 'CONTACT_ERROR',
        contacts: err.response.msg,
      });
    }
  };

  // Delete Contact
  const deleteContact = async (id) => {
    try {
      await axios.delete(`/api/contacts/${id}`);

      dispatch({
        type: 'DELETE_CONTACT',
        contacts: id,
      });
    } catch (err) {
      dispatch({
        type: 'CONTACT_ERROR',
        contacts: err.response.msg,
      });
    }
  };

  // Update Contact
  const updateContact = async (contact) => {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    try {
      const res = await axios.put(
        `/api/contacts/${contact._id}`,
        contact,
        config
      );

      dispatch({
        type: 'UPDATE_CONTACT',
        contacts: res.data,
      });
    } catch (err) {
      dispatch({
        type: 'CONTACT_ERROR',
        contacts: err.response.msg,
      });
    }
  };

  // Clear Contacts
  const clearContacts = () => {
    dispatch({ type: 'CLEAR_CONTACTS' });
  };

  // Set Current Contact
  const setCurrent = (contact) => {
    dispatch({ type: 'SET_CURRENT', contacts: contact });
  };

  // Clear Current Contact
  const clearCurrent = () => {
    dispatch({ type: 'CLEAR_CURRENT' });
  };

  // Filter Contacts
  const filterContacts = (text) => {
    dispatch({ type: 'FILTER_CONTACTS', contacts: text });
  };

  // Clear Filter
  const clearFilter = () => {
    dispatch({ type: 'CLEAR_FILTER' });
  };

  return (
    <ContactContext.Provider
      value={{
        contacts: state.contacts,
        current: state.current,
        filtered: state.filtered,
        error: state.error,
        addContact,
        deleteContact,
        setCurrent,
        clearCurrent,
        updateContact,
        filterContacts,
        clearFilter,
        getContacts,
        clearContacts,
      }}
    >
      {props.children}
    </ContactContext.Provider>
  );
};

export default ContactContextProvider;

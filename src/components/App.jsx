import { useState, useEffect } from 'react';
import { Contacts } from './Contacts';
import { Filter } from './Filter';
import { Forma } from './Forma';
import { nanoid } from 'nanoid';
import {Container} from "./App.styled"

export const App = () => {
  const [contacts, setContacts] = useState(JSON.parse(window.localStorage.getItem('contacts')) ?? 
  [
  { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
  { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
  { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
  { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
])
    const [filter, setFilter] = useState('');

        
    useEffect(() =>{
      
            const localString = JSON.stringify(contacts)
           window.localStorage.setItem('contacts', localString)
    
    }, [contacts])


  const getVisibleContacts = () => {
    const normalizedFilter = filter.toLowerCase();
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(normalizedFilter)
    );
  };

  const changeFilter = event => {
    setFilter(event.currentTarget.value);
  };

  const addContacts = (name, number) => {
    const contact = {
      id: nanoid(),
      name,
      number,
    };
    setContacts(pravState => [contact, ...pravState]);
  };

  const deleteContact = contactId => {
    setContacts(prevState =>
      prevState.filter(contact => contact.id !== contactId)
    );
  };


  const visiblContacts = getVisibleContacts();

  return (
    <Container>
      <h1>Phonebook</h1>
      <Forma onSubmit={addContacts} arr={contacts} />
      <h2>Contacts</h2>
      <Filter value={filter} onChange={changeFilter} />
      <Contacts contacts={visiblContacts} onDeleteContacts={deleteContact} />
    </Container>
  );
};



import { Component } from 'react';
import { Contacts } from './Contacts';
import { Filter } from './Filter';
import { Forma } from './Forma';
import { nanoid } from 'nanoid';
import {Container} from "./App.styled"

export class App extends Component {
  state = {
    contacts: [ 
      { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
      { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
      { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
      { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
  ],
    filter: '',
  };


  componentDidMount() {
    const contactsInLocalStorage = localStorage.getItem('contacts');
    const parsedContacrs = JSON.parse(contactsInLocalStorage)

    if(parsedContacrs) {
      this.setState({contacts: parsedContacrs})
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.contacts !== prevState.contacts) {
      localStorage.setItem('contacts', JSON.stringify(this.state.contacts));
    }
  }


  getVisibleContacts = () => {
    const normalizedFilter = this.state.filter.toLowerCase();
    return this.state.contacts.filter(contact =>
      contact.name.toLowerCase().includes(normalizedFilter)
    );
  };

  changeFilter = event => {
    this.setState({ filter: event.currentTarget.value });
  };

  addContacts = (name, number) => {
    const contact = {
      id: nanoid(),
      name,
      number,
    };
    this.setState(pravState => {
      return { contacts: [contact, ...pravState.contacts] };
    });
  };

  deleteContact = (contactId) => {
    this.setState(prevState =>({contacts: prevState.contacts.filter(contact => contact.id !== contactId)})
      
    )
  };

  render() {
    const visiblContacts = this.getVisibleContacts();

    return (
      <Container>
        <h1>Phonebook</h1>
        <Forma onSubmit={this.addContacts} arr={this.state.contacts} />
        <h2>Contacts</h2>
        <Filter value={this.state.filter} onChange={this.changeFilter} />
        <Contacts
          contacts={visiblContacts}
          onDeleteContacts={this.deleteContact}
        />
      </Container>
    );
  }
}
import { ContactForm } from './ContactForm/ContactForm';
import { ContactList } from './ContactList/ContactList';
import { Filter } from './Filter/Filter';
import { Title, Subtitle, Container } from './App.styled';
import { AiFillContacts, AiFillBook } from 'react-icons/ai';
import 'react-toastify/dist/ReactToastify.css';

export const App = () => {
  return (
    <Container>
      <Title>
        <AiFillBook size="36" />
        Phonebook
      </Title>
      <ContactForm />

      <Subtitle>
        <AiFillContacts size="36" />
        Contacts
      </Subtitle>
      <Filter />
      <ContactList />
    </Container>
  );
};

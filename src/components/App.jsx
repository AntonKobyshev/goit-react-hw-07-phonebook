import { ContactForm } from './ContactForm/ContactForm';
import { ContactList } from './ContactList/ContactList';
import { Filter } from './Filter/Filter';
import { Title, Subtitle, Container } from './App.styled';
import { AiFillContacts, AiFillBook } from 'react-icons/ai';
import 'react-toastify/dist/ReactToastify.css';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { fetchContacts } from 'redux/operations';
import { getIsLoading, getError } from 'redux/selectors';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { Loader } from './Loader/Loader';

export const App = () => {

  const dispatch = useDispatch();
  const isLoading = useSelector(getIsLoading);
  const error = useSelector(getError);

    if (error) {
    Notify.failure(error);
    
  }

  useEffect(() => {
    dispatch(fetchContacts());
  }, [dispatch]);

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
      {isLoading ? <Loader /> : <ContactList />}
    </Container>
  );
};

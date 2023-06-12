import { Formik } from 'formik';
import { useSelector, useDispatch } from 'react-redux';
import { getContacts } from 'redux/selectors';
import { addContact } from 'redux/contactsSlice';
import * as yup from 'yup';
import { nanoid } from 'nanoid';
import { ToastContainer, toast } from 'react-toastify';
import React from 'react';
import {
  ContainerForm,
  Input,
  Label,
  Wrapper,
  ErrorMsg,
  Btn,
} from './ContactForm.styled';
import { IoMdPersonAdd } from 'react-icons/io';
import { BsFillTelephoneFill, BsPersonFill } from 'react-icons/bs';

const notifyOptions = {
  position: 'top-right',
  autoClose: 3000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
  theme: 'colored',
};

const schema = yup.object().shape({
  name: yup
    .string()
    .trim()
    .matches(
      /^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$/,
      'Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d`Artagnan'
    )
    .required(),
  number: yup
    .string()
    .trim()
    .matches(
      /\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}/,
      'Phone number must be digits and can contain spaces, dashes, parentheses and can start with +'
    )
    .required(),
});

const initialValues = {
  id: '',
  name: '',
  number: '',
};

export const ContactForm = () => {
  const dispatch = useDispatch();
  const contacts = useSelector(getContacts);

  const handleSubmit = (values, { resetForm }) => {
    const newContact = {
      id: 'id-' + nanoid(),
      name: values.name,
      number: values.number,
    };

    if (
      contacts.find(
        contact =>
          contact.name.toLowerCase().trim() ===
          newContact.name.toLowerCase().trim()
      )
    ) {
      return toast.error(
        `${newContact.name} is already in contacts`,
        notifyOptions
      );
    }

    if (
      contacts.find(
        contact => contact.number.trim() === newContact.number.trim()
      )
    ) {
      return toast.error(
        `The number ${newContact.number} is already in contacts`,
        notifyOptions
      );
    }

    dispatch(addContact(newContact));

    resetForm();
  };

  return (
    <>
      <Formik
        initialValues={initialValues}
        onSubmit={handleSubmit}
        validationSchema={schema}
      >
        <ContainerForm autoComplete="off">
          <Wrapper>
            <Label htmlFor="name">
              <BsPersonFill size="20" />
              Name:
            </Label>
            <Input
              name="name"
              type="text"
              id="name"
              pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
              title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
              required
            />
            <ErrorMsg name="name" component="div" />
          </Wrapper>

          <Wrapper>
            <Label htmlFor="number">
              <BsFillTelephoneFill size="20" />
              Number:
            </Label>
            <Input
              name="number"
              type="tel"
              id="number"
              pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
              title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
              required
            />
            <ErrorMsg name="number" component="div" />
          </Wrapper>

          <Btn type="submit">
            <IoMdPersonAdd size="24" />
            Add contact
          </Btn>
        </ContainerForm>
      </Formik>
      <ToastContainer />
    </>
  );
};

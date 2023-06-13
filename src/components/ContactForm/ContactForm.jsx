import { Formik } from 'formik';
import { useSelector, useDispatch } from 'react-redux';
import { getContacts } from 'redux/selectors';
import { addContact } from 'redux/operations';
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
  name: yup.string().min(2).max(70).required(),
  phone: yup.number().min(4).required(),
});

const initialValues = {
  id: '',
  name: '',
  phone: '',
};

export const ContactForm = () => {
  const dispatch = useDispatch();
  const contacts = useSelector(getContacts);

  const handleSubmit = (values, { resetForm }) => {
    const newContact = {
      id: 'id-' + nanoid(),
      name: values.name,
      phone: values.phone,
    };

    if (
      contacts.find(
        contact => contact.name.toLowerCase() === newContact.name.toLowerCase()
      )
    ) {
      return toast.error(
        `${newContact.name} is already in contacts`,
        notifyOptions
      );
    }

    if (contacts.find(contact => contact.phone === newContact.phone)) {
      return toast.error(
        `The number ${newContact.phone} is already in contacts`,
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
            <Label htmlFor="phone">
              <BsFillTelephoneFill size="20" />
              Number:
            </Label>
            <Input
              name="phone"
              type="tel"
              id="phone"
              attern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
              title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
              required
            />
            <ErrorMsg name="phone" component="div" />
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

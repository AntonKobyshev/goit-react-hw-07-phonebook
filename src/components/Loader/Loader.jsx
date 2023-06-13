import { ColorRing } from 'react-loader-spinner';
import { Container } from './Loader.styled';

export const Loader = () => {
  return (
    <Container>
      <ColorRing
        visible={true}
        height="180"
        width="180"
        ariaLabel="blocks-loading"
        wrapperStyle={{ justifyContent: 'center' }}
        wrapperClass="blocks-wrapper"
        colors={['#e15b64', '#f47e60', '#f8b26a', '#abbd81', '#849b87']}
      />
    </Container>
  );
};

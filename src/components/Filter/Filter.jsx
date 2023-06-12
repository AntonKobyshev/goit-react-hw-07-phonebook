import { useDispatch, useSelector } from 'react-redux';
import { getContactFilter } from 'redux/selectors';
import { setContactFilter } from 'redux/filterSlice';
import { Wrapper, Label, Input } from './Filter.styled';
import { BiSearchAlt2 } from 'react-icons/bi';

export const Filter = () => {
  const dispatch = useDispatch();
  const filterValue = useSelector(getContactFilter);

  return (
    <Wrapper>
      <Label htmlFor="filter">
        <BiSearchAlt2 size="24" />
        Find contacts by name
      </Label>
      <Input
        name="filter"
        type="text"
        id="filter"
        value={filterValue}
        onChange={e => dispatch(setContactFilter(e.currentTarget.value))}
      />
    </Wrapper>
  );
};

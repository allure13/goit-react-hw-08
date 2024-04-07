import { useDispatch, useSelector } from 'react-redux';
import css from './SearchBox.module.css';
import { changeFilter } from '../../redux/filters/slice';
import { selectNameFilter } from '../../redux/filters/selectors';
import { useId } from 'react';

export default function SearchBar() {
  const dispatch = useDispatch();
  const filter = useSelector(selectNameFilter);
  const nameId = useId();

  return (
    <div className={css.div}>
      <h2>Find contacts by name</h2>
      <label htmlFor={nameId}></label>
      <input
        name="filter"
        type="text"
        value={filter}
        id={nameId}
        onChange={e => dispatch(changeFilter(e.target.value))}
      />
    </div>
  );
}

import { useDispatch, useSelector } from 'react-redux';
import css from './SearchBox.module.css';
import { changeFilter } from '../../redux/filters/slice';
import { selectFilter } from '../../redux/filters/selectors';

export default function SearchBar() {
  const dispatch = useDispatch();
  const filter = useSelector(selectFilter);

  return (
    <div className={css.div}>
      <p>Find contacts by name</p>
      <input
        type="text"
        value={filter}
        onChange={e => dispatch(changeFilter(e.target.value))}
      />
    </div>
  );
}

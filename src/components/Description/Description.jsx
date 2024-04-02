import css from './Description.module.css';

export default function Description() {
  return (
    <>
      <p className={css.text}>
        Our contacts app is a simple and effective tool to manage all your
        contacts in one place. Easily add, edit, and delete contacts, and
        quickly find the contact you need using search and filter functions.
      </p>
      <p className={css.text}>
        Developed by <span className={css.name}>Ihor Chepliaka</span>
      </p>
    </>
  );
}

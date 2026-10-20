import './NotFound.css';

function NotFound({ title, text }) {
  return (
    <section className="not-found">
      <span className="not-found__icon" role="img" aria-label="Nenhum resultado" />
      {title && <h2 className="not-found__title">{title}</h2>}
      <p className="not-found__text">{text}</p>
    </section>
  );
}

export default NotFound;

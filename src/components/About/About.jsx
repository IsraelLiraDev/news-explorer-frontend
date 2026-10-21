import authorImage from '../../images/author.jpg';
import './About.css';

function About() {
  return (
    <section className="about">
      <img className="about__photo" src={authorImage} alt="Foto do autor do projeto" />
      <div className="about__info">
        <h2 className="about__title">Sobre o autor</h2>
        <p className="about__text">
          Meu nome é Israel Lira, sou desenvolvedor FullStack e criador do SharkBooking, uma
          plataforma SaaS multiempresa de agendamentos, além de vários outros sistemas que
          desenvolvo e mantenho em produção.
        </p>
        <p className="about__text">
          Trabalho com HTML, CSS, JavaScript, React, Vite, Node.js, Express, MongoDB, PostgreSQL,
          autenticação com JWT, APIs REST, Nginx e PM2, e publico meus projetos em servidor próprio.
        </p>
        <p className="about__text">
          Minha experiência no bootcamp foi incrível: aprendi muito, aprimorei bastante o que já
          sabia e me profissionalizei. Hoje posso ajudar clientes a tirar ideias do papel, do
          front-end ao back-end.
        </p>
      </div>
    </section>
  );
}

export default About;

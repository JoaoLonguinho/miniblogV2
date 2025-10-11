import styles from './About.module.css'
import { Link } from 'react-router-dom'

const About = () => {
  return (
    <div className={styles.about}>
      <h2>Sobre o Mini<span>Blog</span></h2>
      <p>Este projeto é construído com o intuíto de desenvolver as habilidades do desenvolvedor João Longuinho em React.</p>
      <Link to="/posts/new" className='btn'>Criar um post</Link>
    </div>
  )
}

export default About

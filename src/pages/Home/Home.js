import styles from './Home.module.css'

// Hooks

import { useNavigate, Link } from 'react-router-dom'
import { useState } from 'react'
import { useFetchDocuments } from '../../hooks/useFetchDocuments';

// components
import PostDetails from '../../components/PostDetails/PostDetails';

const Home = () => {
  const [query, setQuery] = useState("");
  const { documents: posts, loading } = useFetchDocuments("posts");

  const handleSubmit = (e) => {
    e.preventDefault()
  }
  return (
    <div className={styles.home}>
      <h1>Posts recentes</h1>
      <form onSubmit={handleSubmit} className='styles.search_form'>
        <input type="text" placeholder='Pesquisar post' value={query} onChange={(e) => setQuery(e.target.value)} />
        <button className="btn btn-dark">Pesquisar</button>
      </form>
      {posts && posts.map((post) => ( <PostDetails key={post.id} post={post}/> ))}
      <div>
        {/* Criar validação de usuário logado */}
        {posts && posts.length === 0 && (
          <div className={styles.noposts}><p>Ainda não temos posts, seja o primeiro a postar</p><Link to="/posts/new" className='btn'>Só se for agora!</Link></div>
        )}
      </div>
    </div>
  )
}

export default Home

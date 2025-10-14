// CSS
import styles from './Search.module.css'
//hooks
import { useFetchDocuments } from "../../hooks/useFetchDocuments"
import { useQuery } from "../../hooks/useQuery"
// Components
import PostDetails from "../../components/PostDetails/PostDetails";


import { Link } from "react-router-dom";


const Search = () => {
    const query = useQuery();

    const search = query.get("q");

    const { documents: posts } = useFetchDocuments("posts", search)

    return (
        <div className={styles.search_container}>
            <h2>Resultado da pesquisa...</h2>
            <div>
                {posts && posts.length === 0 && (
                    <div>
                        <h3 className={styles.noposts}>Sem posts encontrados </h3>
                        <Link to="/" className="btn btn-dark">Voltar para página principal</Link>
                    </div>
                )}
                {posts && posts.map((post) => (
                    <PostDetails key={post.id} post={post} />
                ))}
            </div>
        </div>
    )
}

export default Search

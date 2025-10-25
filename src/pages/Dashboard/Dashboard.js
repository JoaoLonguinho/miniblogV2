import styles from "./Dashboard.module.css"
import { Link } from "react-router-dom"

// hooks
import { useAuthValue } from "../../context/AuthContext"
import { useFetchDocuments } from "../../hooks/useFetchDocuments"


const Dashboard = () => {
    const { user } = useAuthValue()
    const uid = user.uid;

    const {documents: posts, loading, error} = useFetchDocuments("posts", null, uid)

    return (
        <div>
            <h2>Dashboard</h2>
            <p>Gerencie suas publicações</p>
            {posts && posts.length === 0 ? (
                <div className={styles.noposts}>
                    <p>Você ainda não tem publicações.</p>
                    <Link to="/posts/new/" className="btn">Criar meu primeiro post</Link>
                </div>
            ) : (
                <div>
                    <p>Seus posts:</p>
                </div>
            )}

            {posts && posts.map((post) => (
                <h3 key={post.id}>{post.title}</h3>
            ))}
        </div>
    )
}

export default Dashboard

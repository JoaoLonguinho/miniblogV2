import styles from "./Dashboard.module.css"
import { Link } from "react-router-dom"

// hooks
import { useAuthValue } from "../../context/AuthContext"
import { useFetchDocuments } from "../../hooks/useFetchDocuments"


const Dashboard = () => {
    const { user } = useAuthValue()
    const uid = user.uid;

    // Posts do usuário
    const posts = [];

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

                </div>
            )}
        </div>
    )
}

export default Dashboard

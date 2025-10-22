import styles from './Post.module.css'
//hooks
import { useParams } from 'react-router-dom'
import { useFetchDocument } from '../../hooks/useFetchDocument'

const Post = () => {
    const { id } = useParams()
    const { document: post, loading } = useFetchDocument("posts", id);

    return (
        <div className={styles.post_container}>
            {loading && <p>Carregando post...</p>}
            {post && (
                <>
                    <img src={post.image} alt={post.title} />
                    <h1>{post.title}</h1>
                    <p>{post.description}</p>
                    <h2>Criado por: {post.createdBy}</h2>
                    <div className={styles.tags}>
                        {post.tagsArray.map((tag) => (
                            <p key={tag}>#{tag}</p>
                        ))}
                    </div>
                </>
            )}
        </div>
    )
}

export default Post

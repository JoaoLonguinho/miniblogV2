import styles from './PostDetails.module.css'
import { Link } from "react-router-dom"

const PostDetails = ({ post }) => {
    return (
        <div className={styles.post_detail}>
            <h2>{post.title}</h2>
            <img className={styles.post_image} src={post.image} alt={post.title}></img>
            <p className={styles.createdBy}>Postado por: {post.createdBy}</p>
            <p>{post.description}</p>
            <div className={styles.tags}>
                {post.tagsArray.map((tag) => (
                    <div className="tags" key={tag}>
                        <p>#{tag}</p>
                    </div>
                ))}
            </div>
            <Link className="btn btn-outline" to={`/posts/${post.id}`}>Ler mais...</Link>
        </div>
    )
}

export default PostDetails

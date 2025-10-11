import styles from './PostDetails.module.css'
import { Link } from "react-router-dom"

const PostDetails = ({ post }) => {
    return (
        <div className={styles.postDetailContainer}>
            <h2>{post.title}</h2>
            <img src={post.image} alt={post.title}></img>
            <p>{post.description}</p>
            <div>
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

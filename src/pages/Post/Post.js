import { useParams } from 'react-router-dom'
import styles from './Post.module.css'
//hooks

const Post = () => {
    const { id } = useParams()
    return (
        <div>
            {id}
        </div>
    )
}

export default Post

import styles from './NewPost.module.css'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuthValue } from '../../context/AuthContext'
import { useInsertDocument } from '../../hooks/useInsertDocument'

const NewPost = () => {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("")
    const [image, setImage] = useState("")
    const [tags, setTags] = useState([]);
    const [formError, setFormError] = useState("")

    const {user} = useAuthValue()

    const { insertDocument, response } = useInsertDocument("posts")

    const handleSubmit = (e) => {
        e.preventDefault();
        setFormError("");

        // Validar url imagem

        // Criar array de tags

        // Checar todos os valores

        insertDocument({
            title, 
            image, 
            description,
            tags,
            uid: user.uid,
            createdBy: user.displayName
        });

        // Redirecionar para home

    }

    return (
        <div className={styles.create_post}>
            <h1>Novo post</h1>
            <p>Poste o que vier em sua mente:</p>
            <form onSubmit={handleSubmit}>
                <label><input type="text" name="title" value={title} onChange={(e) => setTitle(e.target.value)} placeholder='Título do post' /></label>
                <label><textarea name="description" value={description} onChange={(e) => setDescription(e.target.value)} placeholder='Descrição do post'></textarea></label>
                <label><input type="text" name="image" value={image} onChange={(e) => setImage(e.target.value)} placeholder='Url da Imagem' /></label>
                <label><input type="text" name="tags" value={tags} onChange={(e) => setTags(e.target.value)} placeholder='Insira as tags separadas por vírgula' /></label>
                {!response.loading && <input type="submit" value="Postar" className='btn'/>}
                {response.loading && <input type="submit" value="Postando..." disabled className='btn'/>}
                {response.error && <p className='error'>{response.error}</p>}
            </form>
        </div>
    )
}

export default NewPost

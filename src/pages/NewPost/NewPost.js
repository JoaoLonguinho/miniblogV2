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

    const { user } = useAuthValue()

    const { insertDocument, response } = useInsertDocument("posts")

    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        setFormError("");

        // Validar url imagem

        try {
            new URL(image)
        } catch (error) {
            setFormError("A imagem precisa ser uma URL.");
        }

        // Criar array de tags
        const tagsArray = tags.split(",").map((tag) => tag.trim().toLowerCase())

        // Checar todos os valores
        if (!title || !image || !tags || !description) {
            setFormError("Preencha todos os campos para continuar.")
            return
        }

        if (formError) return;

        insertDocument({
            title,
            image,
            description,
            tagsArray,
            uid: user.uid,
            createdBy: user.displayName
        });

        // Redirecionar para home
        navigate("/")
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
                {!response.loading && <input type="submit" value="Postar" className='btn' />}
                {response.loading && <input type="submit" value="Postando..." disabled className='btn' />}
                {response.error && <p className='error'>{response.error}</p>}
                {formError && <p className='error'>{formError}</p>}
            </form>
        </div>
    )
}

export default NewPost

import styles from './EditPost.module.css'
import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useAuthValue } from '../../context/AuthContext'
import { useFetchDocument } from '../../hooks/useFetchDocument'
import { useUpdateDocument } from '../../hooks/useUpdateDocument'

const EditPost = () => {
    const { id } = useParams()
    const { document: post } = useFetchDocument("posts", id)
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("")
    const [image, setImage] = useState("")
    const [tags, setTags] = useState([]);
    const [formError, setFormError] = useState("")

    useEffect(() => {
        if (post) {
            setTitle(post.title);
            setDescription(post.description);
            setImage(post.image);

            const textTags = post.tagsArray.join(", ");
            setTags(textTags);
        }
    }, [post])

    const { user } = useAuthValue()

    const { updateDocument, response } = useUpdateDocument("posts")

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

        const data = {
            title,
            image,
            description,
            tagsArray,
            uid: user.uid,
            createdBy: user.displayName
        };

        updateDocument(id, data)
        // Redirecionar para home
        navigate("/")
    }

    return (
        <div className={styles.edit_post}>
            {post && (
                <>
                    <h1>Você está editando o post: {post.title}</h1>
                    <p>Para alterar, ajuste o formulário abaixo</p>
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
                </>
            )}
        </div>
    )
}

export default EditPost

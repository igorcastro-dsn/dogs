import React from 'react';
import { COMMENT_POST } from '../../Api';
import { ReactComponent as Enviar } from '../../Assets/enviar.svg';
import useFetch from '../../hooks/useFetch';
import Error from '../Helpers/Error';
import styles from './PhotoCommentsForm.module.css';

const PhotoCommentsForm = ({ id, setComments, single }) => {
    const { request, error } = useFetch();
    const [comment, setComment] = React.useState('');

    async function handleSubmit(e) {
        e.preventDefault();
        const { url, options } = COMMENT_POST(id, { comment });
        const { response, json } = await request(url, options);
        if (response.ok) {
            setComment('');
            setComments((comments) => [...comments, json]);
        }
    }

    return (
        <form
            className={`${styles.form} ${single ? styles.single : ''}`}
            onSubmit={handleSubmit}
        >
            <textarea
                id="comment"
                className={styles.textarea}
                name="comment"
                placeholder="Comente..."
                value={comment}
                onChange={({ target }) => setComment(target.value)}
            ></textarea>
            <button className={styles.button}>
                <Enviar />
            </button>
            {error && <Error message={error} />}
        </form>
    );
};

export default PhotoCommentsForm;

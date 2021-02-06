import React from 'react';
import styles from './FeedModal.module.css';
import useFetch from '../../hooks/useFetch';
import Error from '../Helpers/Error';
import Loading from '../Helpers/Loading';
import PhotoContent from '../Photo/PhotoContent';
import { PHOTO_GET } from '../../Api';

const FeedModal = ({ photo, setModalPhoto }) => {
    const { data, error, loading, request } = useFetch();

    React.useEffect(() => {
        const { url, options } = PHOTO_GET(photo.id);
        request(url, options);
    }, [photo, request]);

    function handleOutsideClick(e) {
        if (e.target === e.currentTarget) {
            setModalPhoto(null);
        }
    }

    return (
        <div className={styles.modal} onClick={handleOutsideClick}>
            {error && <Error message={error} />}
            {loading && <Loading />}
            {data && <PhotoContent data={data} />}
        </div>
    );
};

export default FeedModal;

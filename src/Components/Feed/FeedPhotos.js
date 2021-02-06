import React from 'react';
import { PHOTOS_GET } from '../../Api';
import useFetch from '../../hooks/useFetch';
import Error from '../Helpers/Error';
import Loading from '../Helpers/Loading';
import FeedPhotosItem from './FeedPhotosItem';
import styles from './FeedPhotos.module.css';

const FeedPhotos = ({ setModalPhoto }) => {
    const { data, request, loading, error } = useFetch();

    React.useEffect(() => {
        async function fetchPhotos() {
            const { url, options } = PHOTOS_GET({ page: 1, total: 6, user: 0 });
            const { response, json } = await request(url, options);
        }
        fetchPhotos();
    }, [request]);

    if (error) {
        return <Error message={error} />;
    } else if (loading) {
        return <Loading />;
    } else if (data) {
        return (
            <ul className={`${styles.feed} animeLeft`}>
                {data.map((photo) => (
                    <FeedPhotosItem
                        key={photo.id}
                        photo={photo}
                        setModalPhoto={setModalPhoto}
                    />
                ))}
            </ul>
        );
    } else {
        return null;
    }
};

export default FeedPhotos;

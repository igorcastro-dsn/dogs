import React from 'react';
import { PHOTOS_GET } from '../../Api';
import useFetch from '../../hooks/useFetch';
import Error from '../Helpers/Error';
import Loading from '../Helpers/Loading';
import FeedPhotosItem from './FeedPhotosItem';
import styles from './FeedPhotos.module.css';

const FeedPhotos = ({ page, user, setModalPhoto, setBuscarMaisPaginas }) => {
    const { data, request, loading, error } = useFetch();

    React.useEffect(() => {
        async function fetchPhotos() {
            const totalDeItens = 10;
            const { url, options } = PHOTOS_GET({
                page,
                total: totalDeItens,
                user,
            });
            const { response, json } = await request(url, options);
            if (response && response.ok && json.length < totalDeItens) {
                setBuscarMaisPaginas(false);
            }
        }
        fetchPhotos();
    }, [request, user, page, setBuscarMaisPaginas]);

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

import React from 'react';
import { useParams } from 'react-router-dom';
import { PHOTO_GET } from '../../Api';
import useFetch from '../../hooks/useFetch';
import Error from '../Helpers/Error';
import Head from '../Helpers/Head';
import Loading from '../Helpers/Loading';
import PhotoContent from './PhotoContent';

const Photo = () => {
    const { id } = useParams();
    const { data, loading, error, request } = useFetch();

    React.useEffect(() => {
        const { url, options } = PHOTO_GET(id);
        request(url, options);
    }, [request, id]);

    if (error) {
        return <Error message={error} />;
    }

    if (loading) {
        return <Loading />;
    }

    if (data) {
        return (
            <section className="container mainContainer">
                <Head title={data.photo.title} />
                <PhotoContent single={true} data={data} />
            </section>
        );
    }
    return <div></div>;
};

export default Photo;

import React from 'react';
import Head from '../Helpers/Head';
import useFetch from '../../hooks/useFetch';
import { GET_STATS } from '../../Api';
import Loading from '../Helpers/Loading';
import Error from '../Helpers/Error';
const UserStatsGraphs = React.lazy(() => import('./UserStatsGraphs'));

const UserStats = () => {
    const { data, error, loading, request } = useFetch();

    React.useEffect(() => {
        async function getData() {
            const { url, options } = GET_STATS();
            await request(url, options);
        }
        getData();
    }, [request]);

    if (error) {
        return <Error message={error} />;
    }

    if (loading) {
        return <Loading />;
    }

    if (data) {
        return (
            <React.Suspense fallback={<></>}>
                <Head title="Estatísticas" />
                <UserStatsGraphs data={data} />
            </React.Suspense>
        );
    } else {
        return null;
    }
};

export default UserStats;

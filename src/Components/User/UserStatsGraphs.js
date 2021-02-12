import React from 'react';
import styles from './UserStatsGraphs.module.css';
import { VictoryPie, VictoryChart, VictoryBar } from 'victory';

const UserStatsGraphs = ({ data }) => {
    const [graph, setGraph] = React.useState([]);
    const [totalDeAcessos, setTotalDeAcessos] = React.useState(0);

    React.useEffect(() => {
        const graphData = data.map((item) => {
            return {
                x: item.title,
                y: Number(item.acessos),
            };
        });
        setTotalDeAcessos(
            data
                .map(({ acessos }) => Number(acessos))
                .reduce((previous, next) => previous + next, 0),
        );
        setGraph(graphData);
    }, [data]);

    if (totalDeAcessos === 0) {
        return (
            <section className={`${styles.graph} animeLeft`}>
                <p>Nenhum dado para mostrar.</p>
            </section>
        );
    } else {
        return (
            <section className={`${styles.graph} animeLeft`}>
                <div className={`${styles.totalDeAcessos} ${styles.graphItem}`}>
                    <p>Acessos: {totalDeAcessos}</p>
                </div>
                <div className={styles.graphItem}>
                    <VictoryPie
                        data={graph}
                        innerRadius={50}
                        padding={{ top: 20, bottom: 20, left: 80, right: 80 }}
                        style={{
                            data: {
                                fillOpacity: 0.9,
                                stroke: '#fff',
                                strokeWidth: 2,
                            },
                            labels: {
                                fontSize: 14,
                                fill: '#333',
                            },
                        }}
                    />
                </div>
                <div className={styles.graphItem}>
                    <VictoryChart>
                        <VictoryBar alignment="start" data={graph}></VictoryBar>
                    </VictoryChart>
                </div>
            </section>
        );
    }
};

export default UserStatsGraphs;
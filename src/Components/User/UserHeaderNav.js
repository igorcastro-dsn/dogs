import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { UserContext } from '../../UserContext';
import { ReactComponent as MinhasFotos } from '../../Assets/feed.svg';
import { ReactComponent as Estatisticas } from '../../Assets/estatisticas.svg';
import { ReactComponent as AdicionarFoto } from '../../Assets/adicionar.svg';
import { ReactComponent as Sair } from '../../Assets/sair.svg';
import useMedia from '../../hooks/useMedia';
import styles from './UserHeaderNav.module.css';

const UserHeaderNav = () => {
    const { userLogout } = React.useContext(UserContext);
    const isMobile = useMedia('(max-width: 40rem)');
    const [showMobileMenu, setShowMobileMenu] = React.useState(false);

    const { pathname } = useLocation();
    React.useEffect(() => {
        setShowMobileMenu(false);
    }, [pathname]);

    return (
        <>
            {isMobile && (
                <button
                    aria-label="Menu"
                    className={`${styles.mobileButton} ${
                        showMobileMenu && styles.mobileButtonActive
                    }`}
                    onClick={() => setShowMobileMenu(!showMobileMenu)}
                ></button>
            )}
            <nav
                className={`${isMobile ? styles.navMobile : styles.nav} ${
                    showMobileMenu && styles.navMobileActive
                }`}
            >
                <NavLink to="/conta" end activeClassName={styles.active}>
                    <MinhasFotos /> {isMobile && 'Minhas Fotos'}
                </NavLink>
                <NavLink
                    to="/conta/estatisticas"
                    activeClassName={styles.active}
                >
                    <Estatisticas /> {isMobile && 'Estatísticas'}
                </NavLink>
                <NavLink to="/conta/postagem" activeClassName={styles.active}>
                    <AdicionarFoto />
                    {isMobile && 'Adicionar Foto'}
                </NavLink>
                <button onClick={userLogout}>
                    <Sair />
                    {isMobile && 'Sair'}
                </button>
            </nav>
        </>
    );
};

export default UserHeaderNav;

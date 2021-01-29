import React from 'react';

const useMedia = (media) => {
    const [match, setMatch] = React.useState(null);

    React.useEffect(() => {
        function changeMatch() {
            const { matches } = window.matchMedia(media);
            setMatch(matches);
        }

        changeMatch();

        window.addEventListener('resize', changeMatch);

        // Esse retorno é para limpar o evento o elemento sair da tela
        return () => {
            window.removeEventListener('resize', changeMatch);
        };
    }, [media]);

    return match;
};

export default useMedia;

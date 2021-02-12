import React from 'react';
import Input from '../../Components/Forms/Input';
import Button from '../../Components/Forms/Button';
import useForm from '../../hooks/useForm';
import useFetch from '../../hooks/useFetch';
import { PASSWORD_LOST } from '../../Api';
import Error from '../Helpers/Error';
import Head from '../Helpers/Head';

const LoginPasswordLost = () => {
    const login = useForm();
    const { data, loading, error, request } = useFetch();

    async function handleSubmit(e) {
        e.preventDefault();
        if (login.isValid()) {
            const { url, options } = PASSWORD_LOST({
                login: login.value,
                url: window.location.href.replace('perdeu', 'resetar'),
            });
            request(url, options);
        }
    }

    return (
        <section>
            <Head title="Perdeu a senha?" />
            <h1 className="title">Perdeu a senha?</h1>
            {data ? (
                <p style={{ color: '#4c1' }}>{data}</p>
            ) : (
                <form onSubmit={handleSubmit}>
                    <Input
                        label="E-mail / Usuário"
                        type="text"
                        name="email"
                        {...login}
                    />
                    {loading ? (
                        <Button disabled>Enviando...</Button>
                    ) : (
                        <Button>Enviar e-mail</Button>
                    )}
                    <Error message={error} />
                </form>
            )}
        </section>
    );
};

export default LoginPasswordLost;

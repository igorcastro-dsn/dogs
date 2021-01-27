import React from 'react';
import Input from '../Forms/Input';
import Button from '../Forms/Button';
import Error from '../Helpers/Error';
import useForm from '../../hooks/useForm';
import { USER_POST } from '../../Api';
import { UserContext } from '../../UserContext';
import useFetch from '../../hooks/useFetch';

const LoginCreate = () => {
    const username = useForm();
    const email = useForm('email');
    const password = useForm('password');

    const { userLogin } = React.useContext(UserContext);
    const { loading, error, request } = useFetch();

    async function handleSubmit(event) {
        event.preventDefault();
        const { url, options } = USER_POST({
            username: username.value,
            email: email.value,
            password: password.value,
        });
        const { response } = await request(url, options);
        if (response.ok) {
            userLogin(username.value, password.value);
        }
    }

    return (
        <section className="animeLeft">
            <h1 className="title">Cadastre-se</h1>
            <form onSubmit={handleSubmit}>
                <Input
                    type="text"
                    label="Usuário"
                    name="username"
                    {...username}
                />
                <Input type="email" label="E-mail" name="email" {...email} />
                <Input
                    type="password"
                    label="Senha"
                    name="password"
                    {...password}
                />

                {loading ? (
                    <Button disabled>Cadastrando...</Button>
                ) : (
                    <Button>Cadastrar</Button>
                )}
                <Error message={error}></Error>
            </form>
        </section>
    );
};

export default LoginCreate;

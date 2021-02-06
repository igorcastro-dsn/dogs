import React from 'react';

const types = {
    email: {
        regex: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
        message: 'Preencha um e-mail válido',
    },
    password: {
        regex: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/,
        message:
            'A senha precisa ter ao menos 8 caracteres, sendo 1 dígito, 1 caractere minúsculo e 1 caractere maiúsculo',
    },
    number: {
        regex: /^\d+$/,
        message: 'Utilize apenas números',
    },
};
const useForm = (type) => {
    const [value, setValue] = React.useState('');
    const [error, setError] = React.useState(null);

    function onChange({ target }) {
        if (error) {
            isValid(target.value);
        }
        setValue(target.value);
    }

    function isValid(value) {
        if (type === false) {
            return true; // não valida
        }

        if (value.length === 0) {
            setError('Preencha um valor');
            return false;
        } else if (types[type] && !types[type].regex.test(value)) {
            setError(types[type].message);
            return false;
        } else {
            setError(null);
            return true;
        }
    }

    return {
        value,
        setValue,
        onChange,
        error,
        isValid: () => isValid(value),
        onBlur: () => isValid(value),
    };
};

export default useForm;

import React from 'react';

const Error = ({ message }) => {
    if (!message) {
        return null;
    }
    return <p style={{ color: '#f31', margin: '1rem 0' }}>{message}</p>;
};

export default Error;

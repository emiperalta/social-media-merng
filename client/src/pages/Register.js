import React, { useState } from 'react';
import gql from 'graphql-tag';
import { useMutation } from '@apollo/client';
import { Button, Form } from 'semantic-ui-react';

const initialState = {
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
};

const Register = props => {
    const [inputValues, setInputValues] = useState(initialState);
    const [errors, setErrors] = useState({});

    const [addUser, { loading }] = useMutation(REGISTER_USER, {
        update(proxy, result) {
            console.log(result);
            props.history.push('/login');
        },
        onError(err) {
            setErrors(err.graphQLErrors[0].extensions.exception.errors); //errors variable come from the server
        },
        variables: inputValues, // == variables: { username: inputValues.username, ... etc }
    });

    const submitHandler = e => {
        e.preventDefault();
        addUser();
        if (!errors) {
            setInputValues(initialState); //when submit, clear the form fields
        }
    };

    const inputValuesHandler = e => {
        const { name, value } = e.target;
        setInputValues({
            ...inputValues,
            [name]: value,
        });
    };

    return (
        <div className='form-container'>
            <div className='register-title'>
                <h1>Register</h1>
            </div>
            <Form
                onSubmit={submitHandler}
                noValidate
                className={loading ? 'loading' : ''}
            >
                <Form.Input
                    label='Username'
                    name='username'
                    type='text'
                    placeholder='Example99'
                    value={inputValues.username}
                    error={errors.username ? true : false}
                    onChange={inputValuesHandler}
                />
                <Form.Input
                    label='Email'
                    name='email'
                    type='email'
                    placeholder='example@hotmail.com'
                    value={inputValues.email}
                    error={errors.email ? true : false}
                    onChange={inputValuesHandler}
                />
                <Form.Input
                    label='Password'
                    name='password'
                    type='password'
                    placeholder='••••••'
                    value={inputValues.password}
                    error={errors.password ? true : false}
                    onChange={inputValuesHandler}
                />
                <Form.Input
                    label='Confirm password'
                    name='confirmPassword'
                    type='password'
                    placeholder='••••••'
                    value={inputValues.confirmPassword}
                    error={errors.confirmPassword ? true : false}
                    onChange={inputValuesHandler}
                />
                <div style={{ textAlign: 'center' }}>
                    <Button
                        type='submit'
                        content='Register'
                        primary
                        icon='right arrow'
                        labelPosition='right'
                        style={{ marginTop: 15, fontSize: 17 }}
                    />
                </div>
            </Form>
            {Object.keys(errors).length > 0 && (
                <div className='ui error message'>
                    <ul className='list'>
                        {Object.values(errors).map(error => (
                            <li key={error}>{error}</li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
};

const REGISTER_USER = gql`
    mutation register(
        $username: String!
        $email: String!
        $password: String!
        $confirmPassword: String!
    ) {
        register(
            registerInput: {
                username: $username
                email: $email
                password: $password
                confirmPassword: $confirmPassword
            }
        ) {
            id
            username
            email
            createdAt
            token
        }
    }
`;

export default Register;

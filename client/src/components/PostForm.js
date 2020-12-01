import React from 'react';
import { useMutation } from '@apollo/client';
import { Form, Button } from 'semantic-ui-react';

import { useForm } from '../util/hooks';
import { GET_POSTS_QUERY, CREATE_POST } from '../util/graphql.queries';

const PostForm = () => {
    const { inputValues, inputValuesHandler, submitHandler } = useForm(
        createPostCallback,
        {
            body: '',
        }
    );

    const [createPost, { error, loading }] = useMutation(CREATE_POST, {
        update: (proxy, result) => {
            // working with cached data from the apollo client to update the post list when creating a new one
            const data = proxy.readQuery({
                query: GET_POSTS_QUERY,
            });

            const newData = [...data.getPosts, result.data.createPost]; // new constant containing data value from getPosts query due of immutability of apollo

            proxy.writeQuery({
                query: GET_POSTS_QUERY,
                data: {
                    ...data,
                    getPosts: {
                        newData,
                    },
                },
            });

            inputValues.body = '';
        },
        onError: err => err,
        variables: inputValues,
    });

    function createPostCallback() {
        createPost();
    }

    return (
        <>
            <Form onSubmit={submitHandler} className={loading ? 'loading' : ''}>
                <h2>Create new post: </h2>
                <Form.Field>
                    <Form.Input
                        name='body'
                        placeholder='"Hello world!"'
                        onChange={inputValuesHandler}
                        value={inputValues.body}
                        error={error ? true : false}
                    />
                    <Button content='Submit' type='submit' color='green' />
                </Form.Field>
            </Form>
            {error && (
                <div
                    className='ui error message'
                    style={{ marginBottom: 15, fontSize: 10 }}
                >
                    <ul className='list'>
                        <li>{error.graphQLErrors[0].message.substring(6)}</li>
                    </ul>
                </div>
            )}
        </>
    );
};

export default PostForm;

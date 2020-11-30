import React from 'react';
import gql from 'graphql-tag';
import { useMutation } from '@apollo/client';
import { Form, Button } from 'semantic-ui-react';

import { useForm } from '../util/hooks';
import { GET_POSTS_QUERY } from '../util/graphql.queries';

const PostForm = () => {
    const { inputValues, inputValuesHandler, submitHandler } = useForm(
        createPostCallback,
        {
            body: '',
        }
    );

    const [createPost, { loading }] = useMutation(CREATE_POST, {
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
        variables: inputValues,
    });

    function createPostCallback() {
        createPost();
    }

    return (
        <Form onSubmit={submitHandler} className={loading ? 'loading' : ''}>
            <h3>Create a post:</h3>
            <Form.Field>
                <Form.Input
                    name='body'
                    placeholder='"Hello world!"'
                    onChange={inputValuesHandler}
                    value={inputValues.body}
                />
                <Button content='Submit' type='submit' color='teal' />
            </Form.Field>
        </Form>
    );
};

const CREATE_POST = gql`
    mutation createPost($body: String!) {
        createPost(body: $body) {
            id
            body
            username
            createdAt
            likes {
                id
                username
                createdAt
            }
            likesCount
            comments {
                id
                body
                username
                createdAt
            }
            commentsCount
        }
    }
`;

export default PostForm;

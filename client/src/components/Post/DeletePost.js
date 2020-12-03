import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { Button, Confirm } from 'semantic-ui-react';

import { DELETE_POST, GET_POSTS } from '../../util/graphql.queries';

const DeletePost = props => {
    const [confirmOpen, setConfirmOpen] = useState(false);

    const [deletePost] = useMutation(DELETE_POST, {
        update: (proxy, result) => {
            setConfirmOpen(false);

            const data = proxy.readQuery({
                query: GET_POSTS,
            });

            const newData = [...data.getPosts];

            proxy.writeQuery({
                query: GET_POSTS,
                data: {
                    ...data,
                    getPosts: {
                        newData,
                    },
                },
            });
        },
        variables: { postId: props.postId },
    });

    return (
        <>
            <Button
                size='tiny'
                icon='trash'
                floated='right'
                onClick={() => setConfirmOpen(true)}
            />
            <Confirm
                open={confirmOpen}
                onCancel={() => setConfirmOpen(false)}
                onConfirm={deletePost}
            />
        </>
    );
};

export default DeletePost;

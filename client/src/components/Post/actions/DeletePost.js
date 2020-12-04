import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { Button, Confirm, Popup } from 'semantic-ui-react';

import {
    DELETE_COMMENT,
    DELETE_POST,
    GET_POSTS,
} from '../../../util/graphql.queries';

const DeletePost = props => {
    const [confirmOpen, setConfirmOpen] = useState(false);

    const MUTATION = props.commentId ? DELETE_COMMENT : DELETE_POST;

    const [deletePostOrComment] = useMutation(MUTATION, {
        update: (proxy, result) => {
            setConfirmOpen(false);

            if (!props.commentId) {
                // get posts after delete a post
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
            }

            // after delete, redirect to homepage
            if (props.callback) props.callback();
        },
        variables: { postId: props.postId, commentId: props.commentId },
    });

    return (
        <>
            <Popup
                content={props.commentId ? 'Delete comment' : 'Delete post'}
                size='mini'
                position='left center'
                trigger={
                    <Button
                        size='tiny'
                        icon='trash'
                        floated='right'
                        onClick={() => setConfirmOpen(true)}
                    />
                }
            />
            <Confirm
                open={confirmOpen}
                onCancel={() => setConfirmOpen(false)}
                onConfirm={deletePostOrComment}
            />
        </>
    );
};

export default DeletePost;

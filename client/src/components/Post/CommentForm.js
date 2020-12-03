import React, { useState, useRef } from 'react';
import { useMutation } from '@apollo/client';
import { Card, Form } from 'semantic-ui-react';

import { CREATE_COMMENT } from '../../util/graphql.queries';

const CommentForm = props => {
    const [commentInput, setCommentInput] = useState('');
    const commentInputRef = useRef(null);

    const [createComment] = useMutation(CREATE_COMMENT, {
        update: () => {
            setCommentInput('');
            commentInputRef.current.blur();
        },
        variables: { postId: props.postId, commentBody: commentInput },
    });

    const commentHandler = e => setCommentInput(e.target.value);

    return (
        <Card fluid>
            <Card.Content>
                <p>Post a comment</p>
                <Form onSubmit={createComment}>
                    <div className='ui action input fluid'>
                        <input
                            type='text'
                            name='comment'
                            placeholder='nice post!'
                            value={commentInput}
                            onChange={commentHandler}
                            ref={commentInputRef}
                        />
                        <button
                            type='submit'
                            className='ui button teal'
                            disabled={commentInput.trim() === ''}
                        >
                            Submit
                        </button>
                    </div>
                </Form>
            </Card.Content>
        </Card>
    );
};

export default CommentForm;

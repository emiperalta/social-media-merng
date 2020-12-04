import React from 'react';
import moment from 'moment';
import { Card } from 'semantic-ui-react';

import DeletePost from './actions/DeletePost';

const CommentList = props => {
    return (
        <Card fluid>
            <Card.Content>
                {props.user &&
                    props.user.username === props.comment.username && (
                        <DeletePost
                            postId={props.postId}
                            commentId={props.comment.id}
                        />
                    )}
                <Card.Header>{props.comment.username}</Card.Header>
                <Card.Meta style={{ fontSize: 14 }}>
                    {moment(props.comment.createdAt).fromNow()}
                </Card.Meta>
                <br />
                <Card.Description>{props.comment.body}</Card.Description>
            </Card.Content>
        </Card>
    );
};

export default CommentList;

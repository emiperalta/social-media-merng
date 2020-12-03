import React, { useContext } from 'react';
import { Button, Card, Image } from 'semantic-ui-react';
import moment from 'moment';

import { AuthContext } from '../context/AuthContext';
import LikePost from './LikePost';

const Post = props => {
    const context = useContext(AuthContext);
    const {
        id,
        body,
        createdAt,
        username,
        likes,
        comments,
        likesCount,
        commentsCount,
    } = props.post;

    const deleteHandler = () => console.log('deleted');

    return (
        <Card fluid>
            <Card.Content>
                <Image
                    floated='left'
                    size='mini'
                    src='https://react.semantic-ui.com/images/avatar/large/molly.png'
                />
                {context.user && context.user.username === username && (
                    <Button
                        size='tiny'
                        icon='trash'
                        floated='right'
                        onClick={deleteHandler}
                    />
                )}
                <Card.Header>{username}</Card.Header>
                <Card.Meta style={{ fontSize: 14 }}>
                    {moment(createdAt).fromNow(true)}
                </Card.Meta>
                <Card.Description>{body}</Card.Description>
            </Card.Content>
            <Card.Content extra className='buttons'>
                <LikePost
                    user={context.user}
                    post={{ id, likes, likesCount }}
                />
                <Button
                    size='tiny'
                    icon='comment'
                    color='instagram'
                    label={{
                        basic: true,
                        content: commentsCount,
                    }}
                    labelPosition='left'
                    // as={Link}
                    // to={`/posts/${id}`}
                />
            </Card.Content>
        </Card>
    );
};

export default Post;

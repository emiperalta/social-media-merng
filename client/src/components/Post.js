import React, { useContext } from 'react';
import { Button, Card, Image } from 'semantic-ui-react';
import moment from 'moment';
import { Link } from 'react-router-dom';

import { AuthContext } from '../context/AuthContext';

const Post = props => {
    const context = useContext(AuthContext);
    const {
        id,
        body,
        createdAt,
        username,
        likesCount,
        commentsCount,
    } = props.post;

    const likePost = () => console.log('Liked post!');

    const deleteHandler = () => console.log('deleted');

    return (
        <Card fluid>
            <Card.Content>
                <Image
                    floated='right'
                    size='mini'
                    src='https://react.semantic-ui.com/images/avatar/large/molly.png'
                />
                <Card.Header>{username}</Card.Header>
                <Card.Meta style={{ fontSize: 14 }}>
                    {moment(createdAt).fromNow(true)}
                </Card.Meta>
                <Card.Description>{body}</Card.Description>
            </Card.Content>
            <Card.Content extra>
                <Button
                    size='tiny'
                    icon='heart'
                    color='red'
                    label={{
                        as: 'a',
                        basic: true,
                        pointing: 'left',
                        content: likesCount,
                    }}
                    labelPosition='right'
                    onClick={likePost}
                />
                <Button
                    size='tiny'
                    icon='comment'
                    color='instagram'
                    label={{
                        as: 'a',
                        basic: true,
                        pointing: 'right',
                        content: commentsCount,
                    }}
                    labelPosition='left'
                    as={Link}
                    to={`/posts/${id}`}
                />
                {context.user && context.user.username === username && (
                    <Button
                        size='tiny'
                        icon='trash'
                        floated='right'
                        onClick={deleteHandler}
                    />
                )}
            </Card.Content>
        </Card>
    );
};

export default Post;

import React from 'react';
import { Button, Card, Image } from 'semantic-ui-react';
import moment from 'moment';
import { Link } from 'react-router-dom';

const Post = props => {
    const {
        id,
        body,
        createdAt,
        username,
        likesCount,
        commentsCount,
    } = props.post;

    const likePost = () => console.log('Liked post!');
    const commentPost = () => console.log('Comment post!');

    return (
        <Card fluid>
            <Card.Content>
                <Image
                    floated='right'
                    size='mini'
                    src='https://react.semantic-ui.com/images/avatar/large/molly.png'
                />
                <Card.Header>{username}</Card.Header>
                <Card.Meta as={Link} to={`/posts/${id}`}>
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
                    onClick={commentPost}
                />
            </Card.Content>
        </Card>
    );
};

export default Post;

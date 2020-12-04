import React, { useContext } from 'react';
import moment from 'moment';
import { useQuery } from '@apollo/client';
import { Card, Grid, Image, Button, Popup } from 'semantic-ui-react';

import { GET_POST_BY_ID } from '../../util/graphql.queries';
import { AuthContext } from '../../context/AuthContext';
import LikeButton from './actions/LikePost';
import DeletePost from './actions/DeletePost';
import CommentList from './CommentList';
import CommentForm from './CommentForm';

const PostDetail = props => {
    const context = useContext(AuthContext);
    const postId = props.match.params.id;

    const { data: { getPost } = {} } = useQuery(GET_POST_BY_ID, {
        variables: { postId: postId },
        onError: err => {},
    });

    const deletePostCallback = () => props.history.push('/');

    let postMarkup;
    if (!getPost) postMarkup = <p>Loading post...</p>;
    else {
        const {
            id,
            body,
            createdAt,
            username,
            comments,
            commentsCount,
            likes,
            likesCount,
        } = getPost;

        postMarkup = (
            <>
                <div style={{ textAlign: 'center', margin: 15 }}>
                    <Popup
                        content='Go back to home'
                        size='mini'
                        position='left center'
                        trigger={
                            <Button
                                basic
                                circular
                                size='huge'
                                icon='arrow left'
                                onClick={() => props.history.push('/')}
                            />
                        }
                    />
                </div>
                <Grid>
                    <Grid.Row>
                        <Grid.Column width={3}>
                            <Image
                                src='https://react.semantic-ui.com/images/avatar/large/molly.png'
                                size='large'
                            />
                        </Grid.Column>
                        <Grid.Column width={12}>
                            <Card fluid>
                                <Card.Content>
                                    <Image
                                        floated='left'
                                        size='mini'
                                        className='resp-image'
                                        src='https://react.semantic-ui.com/images/avatar/large/molly.png'
                                    />
                                    {context.user &&
                                        context.user.username === username && (
                                            <DeletePost
                                                postId={id}
                                                callback={deletePostCallback}
                                            />
                                        )}
                                    <Card.Header>{username}</Card.Header>
                                    <Card.Meta style={{ fontSize: 14 }}>
                                        {moment(createdAt).fromNow()}
                                    </Card.Meta>
                                    <br />
                                    <Card.Description>{body}</Card.Description>
                                </Card.Content>
                                <Card.Content extra className='buttons'>
                                    <LikeButton
                                        user={context.user}
                                        post={{ id, likes, likesCount }}
                                    />
                                    <Popup
                                        content='Comment on post'
                                        size='mini'
                                        position='right center'
                                        trigger={
                                            <Button
                                                size='tiny'
                                                icon='comment'
                                                color='instagram'
                                                label={{
                                                    basic: true,
                                                    content: commentsCount,
                                                }}
                                                labelPosition='left'
                                                onClick={() =>
                                                    props.history.push(
                                                        `/posts/${id}`
                                                    )
                                                }
                                            />
                                        }
                                    />
                                </Card.Content>
                            </Card>
                            {context.user && <CommentForm postId={id} />}
                            {comments.map(comment => (
                                <CommentList
                                    key={comment.id}
                                    comment={comment}
                                    user={context.user}
                                    postId={id}
                                />
                            ))}
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
            </>
        );
    }

    return <>{postMarkup}</>;
};

export default PostDetail;

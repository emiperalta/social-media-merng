import React, { useContext } from 'react';
import moment from 'moment';
import { useQuery } from '@apollo/client';
import { Card, Grid, Image, Button } from 'semantic-ui-react';

import { GET_POST_BY_ID } from '../../util/graphql.queries';
import { AuthContext } from '../../context/AuthContext';
import LikeButton from './LikePost';

const PostDetail = props => {
    const context = useContext(AuthContext);
    const postId = props.match.params.id;

    const { data: { getPost } = {} } = useQuery(GET_POST_BY_ID, {
        variables: { postId: postId },
        onError: err => {},
    });

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
                                <Card.Header>{username}</Card.Header>
                                <Card.Meta>
                                    {moment(createdAt).fromNow(true)}
                                </Card.Meta>
                                <Card.Description>{body}</Card.Description>
                            </Card.Content>
                            <Card.Content extra className='buttons'>
                                <LikeButton
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
                                    onClick={() => console.log('Commented')}
                                />
                            </Card.Content>
                        </Card>
                    </Grid.Column>
                </Grid.Row>
            </Grid>
        );
    }

    return <>{postMarkup}</>;
};

export default PostDetail;

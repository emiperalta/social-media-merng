import React, { useState, useEffect } from 'react';
import { Icon, Button, Label, Popup } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import { useMutation } from '@apollo/client';

import { LIKE_POST } from '../../../util/graphql.queries';

const LikePost = ({ user, post: { id, likes, likesCount } }) => {
    const [liked, setLiked] = useState(false);

    useEffect(() => {
        if (user && likes.find(like => like.username === user.username))
            setLiked(true);
        else setLiked(false);
    }, [user, likes]);

    const [likePost] = useMutation(LIKE_POST, {
        variables: { postId: id },
        onError: err => {},
    });

    const likeButton = user ? (
        liked ? (
            <Button icon color='red' size='tiny'>
                <Icon name='heart' />
            </Button>
        ) : (
            <Button icon color='red' size='tiny' basic>
                <Icon name='heart' />
            </Button>
        )
    ) : (
        // if there is no user logged in, when he click on 'like' he will be redirected to login page
        <Button icon color='red' size='tiny' basic as={Link} to='/login'>
            <Icon name='heart' />
        </Button>
    );

    return (
        <Button as='div' labelPosition='right' onClick={likePost}>
            <Popup
                content={liked ? 'Unlike' : 'Like'}
                size='mini'
                trigger={likeButton}
            />
            <Label pointing='left' basic>
                {likesCount}
            </Label>
        </Button>
    );
};

export default LikePost;

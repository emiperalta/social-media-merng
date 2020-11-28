import React from 'react';
import gql from 'graphql-tag';
import { useQuery } from '@apollo/client';
import { Grid } from 'semantic-ui-react';

import Post from '../components/Post';

const Home = () => {
    const { loading, data: { getPosts } = {} } = useQuery(GET_POSTS_QUERY);

    return (
        <Grid columns={3}>
            <Grid.Row>
                <h1>Recent posts...</h1>
            </Grid.Row>
            <Grid.Row>
                {loading ? (
                    <h2>Loading posts</h2>
                ) : (
                    getPosts &&
                    getPosts.map(post => (
                        <Grid.Column key={post.id} style={{ marginBottom: 20 }}>
                            <Post post={post} />
                        </Grid.Column>
                    ))
                )}
            </Grid.Row>
        </Grid>
    );
};

const GET_POSTS_QUERY = gql`
    query {
        getPosts {
            id
            body
            username
            createdAt
            commentsCount
            comments {
                body
                username
            }
            likesCount
            likes {
                username
                createdAt
            }
        }
    }
`;

export default Home;

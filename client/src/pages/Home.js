import React, { useContext } from 'react';
import { useQuery } from '@apollo/client';
import { Grid, GridColumn, Transition } from 'semantic-ui-react';

import { AuthContext } from '../context/AuthContext';

import Post from '../components/Post';
import PostForm from '../components/PostForm';
import { GET_POSTS_QUERY } from '../util/graphql.queries';

const Home = () => {
    const context = useContext(AuthContext);
    const { loading, data: { getPosts } = {} } = useQuery(GET_POSTS_QUERY);

    return (
        <Grid columns={3}>
            <Grid.Row className='page-title'>
                <h1>Recent posts...</h1>
            </Grid.Row>
            <Grid.Row>
                {context.user && (
                    <GridColumn>
                        <PostForm />
                    </GridColumn>
                )}
                {loading ? (
                    <h2>Loading posts</h2>
                ) : (
                    <Transition.Group duration={400}>
                        {getPosts &&
                            getPosts.map(post => (
                                <Grid.Column
                                    key={post.id}
                                    style={{ marginBottom: 20 }}
                                >
                                    <Post post={post} />
                                </Grid.Column>
                            ))}
                    </Transition.Group>
                )}
            </Grid.Row>
        </Grid>
    );
};

export default Home;

import React, { useContext } from 'react';
import { useQuery } from '@apollo/client';
import { Grid, Transition } from 'semantic-ui-react';

import { AuthContext } from '../context/AuthContext';

import Post from '../components/Post/PostItem';
import PostForm from '../components/Post/PostForm';
import { GET_POSTS } from '../util/graphql.queries';

const Home = () => {
    const context = useContext(AuthContext);
    const { loading, data: { getPosts } = {} } = useQuery(GET_POSTS);

    return (
        <>
            <div className='page-title'>
                <h1>HOME</h1>
            </div>
            <Grid stackable columns={2}>
                <Grid.Row>
                    {context.user && (
                        <Grid.Column>
                            <PostForm />
                        </Grid.Column>
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
        </>
    );
};

export default Home;

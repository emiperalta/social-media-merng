import gql from 'graphql-tag';

export const GET_POSTS_QUERY = gql`
    query {
        getPosts {
            id
            body
            username
            createdAt
            comments {
                body
                username
            }
            commentsCount
            likes {
                username
                createdAt
            }
            likesCount
        }
    }
`;

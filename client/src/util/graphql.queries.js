import gql from 'graphql-tag';

export const GET_POSTS = gql`
    query {
        getPosts {
            id
            body
            username
            createdAt
            comments {
                id
                body
                username
                createdAt
            }
            commentsCount
            likes {
                id
                username
                createdAt
            }
            likesCount
        }
    }
`;

export const GET_POST_BY_ID = gql`
    query getPost($postId: ID!) {
        getPost(postId: $postId) {
            id
            body
            username
            createdAt
            comments {
                id
                body
                username
                createdAt
            }
            commentsCount
            likes {
                id
                username
                createdAt
            }
            likesCount
        }
    }
`;

export const LOGIN_USER = gql`
    mutation login($username: String!, $password: String!) {
        login(username: $username, password: $password) {
            id
            username
            email
            createdAt
            token
        }
    }
`;

export const REGISTER_USER = gql`
    mutation register(
        $username: String!
        $email: String!
        $password: String!
        $confirmPassword: String!
    ) {
        register(
            registerInput: {
                username: $username
                email: $email
                password: $password
                confirmPassword: $confirmPassword
            }
        ) {
            id
            username
            email
            createdAt
            token
        }
    }
`;

export const CREATE_POST = gql`
    mutation createPost($body: String!) {
        createPost(body: $body) {
            id
            body
            username
            createdAt
            likes {
                id
                username
                createdAt
            }
            likesCount
            comments {
                id
                body
                username
                createdAt
            }
            commentsCount
        }
    }
`;

export const LIKE_POST = gql`
    mutation likePost($postId: ID!) {
        likePost(postId: $postId) {
            id
            likes {
                id
                username
                createdAt
            }
            likesCount
        }
    }
`;

export const DELETE_POST = gql`
    mutation deletePost($postId: ID!) {
        deletePost(postId: $postId)
    }
`;

export const CREATE_COMMENT = gql`
    mutation createComment($postId: ID!, $commentBody: String!) {
        createComment(postId: $postId, commentBody: $commentBody) {
            id
            comments {
                id
                username
                body
                createdAt
            }
            commentsCount
        }
    }
`;

export const DELETE_COMMENT = gql`
    mutation deleteComment($postId: ID!, $commentId: ID!) {
        deleteComment(postId: $postId, commentId: $commentId) {
            id
            comments {
                id
                username
                body
                createdAt
            }
            commentsCount
        }
    }
`;

import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Container } from 'semantic-ui-react';

import MenuBar from './components/MenuBar';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import PostDetail from './components/Post/PostDetail';

import { AuthProvider } from './context/AuthContext';
import AuthRoute from './util/AuthRoute';

import 'semantic-ui-css/semantic.min.css';
import './App.css';

function App() {
    return (
        <AuthProvider>
            <Container>
                <Router>
                    <MenuBar />
                    <Route exact path='/' component={Home} />
                    <AuthRoute exact path='/login' component={Login} />
                    <AuthRoute exact path='/register' component={Register} />
                    <Route exact path='/posts/:id' component={PostDetail} />
                </Router>
            </Container>
        </AuthProvider>
    );
}

export default App;
